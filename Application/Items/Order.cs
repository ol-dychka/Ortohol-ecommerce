using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Stripe;
using Stripe.Checkout;

namespace Application.Items
{
    public class Order
    {
        // return stripe session key or whatever
        public class Command : IRequest<Result<StripeCheckoutSessionResult>>
        {
            public string UserName { get; set; }
            public string Email { get; set; }
            public List<OrderItem> Items { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<StripeCheckoutSessionResult>>
        {

            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<StripeCheckoutSessionResult>> Handle(Command request, CancellationToken cancellationToken)
            {
                //strapi
                var lineItems = new List<SessionLineItemOptions>();
                foreach (OrderItem orderItem in request.Items)
                {
                    var item = await _context.Items.FirstOrDefaultAsync(x => x.Id.ToString() == orderItem.ItemId);
                    var lineItem = new SessionLineItemOptions
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            Currency = "usd",
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = item.Name
                            },
                            UnitAmount = (long)((item.PriceSale == 0 ? item.Price : item.PriceSale) * 100)
                        },
                        Quantity = orderItem.Quantity
                    };
                    lineItems.Add(lineItem);
                }

                var options = new SessionCreateOptions
                {
                    SuccessUrl = "https://localhost:5173/success",
                    CancelUrl = "https://localhost:5173/failure",
                    PaymentMethodTypes = new List<string>{
                    "card",
                },
                    Mode = "payment",
                    LineItems = lineItems,
                };

                var service = new SessionService();
                var session = await service.CreateAsync(options);

                // db
                _context.Orders.Add(new Domain.Order
                {
                    Username = request.UserName,
                    Email = request.Email,
                    StripeSessionId = session.Id,
                    Items = request.Items
                });

                var result = await _context.SaveChangesAsync() > 0;
                return result ? Result<StripeCheckoutSessionResult>.Success(new StripeCheckoutSessionResult { SessionId = session.Id }) : Result<StripeCheckoutSessionResult>.Failure("Colud not make an order");
            }
        }
    }
}