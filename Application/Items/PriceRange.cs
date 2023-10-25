using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Items
{
    public class PriceRange
    {
        public class Query : IRequest<Result<ItemPriceRange>>
        {
            public string Category { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ItemPriceRange>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<ItemPriceRange>> Handle(Query request, CancellationToken cancellationToken)
            {
                var max = await _context.Items.Where(c => c.Category == request.Category).OrderByDescending(x => x.Price).FirstAsync();
                var min = await _context.Items.Where(c => c.Category == request.Category).OrderBy(x => x.Price).FirstAsync();
                // double max = await _context.Items.MaxAsync(x => x.Price, cancellationToken: cancellationToken);
                // double min = await _context.Items.MinAsync(x => x.Price, cancellationToken: cancellationToken);

                return Result<ItemPriceRange>.Success(new ItemPriceRange { Min = min.Price, Max = max.Price });
            }
        }
    }
}