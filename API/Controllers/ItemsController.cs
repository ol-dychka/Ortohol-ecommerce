using Application.Core;
using Application.DTOs;
using Application.Items;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ItemsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<ItemDto>>> GetPosts([FromQuery] ItemParams pagingParams)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query { Params = pagingParams }));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ItemDto>> GetPost(Guid id) 
        {
            return HandleResult(await Mediator.Send(new Application.Items.Single.Query { Id = id }));
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<StripeCheckoutSessionResult>> Order(OrderItems orderItems)
        {
            return HandleResult(await Mediator.Send(new Application.Items.Order.Command {
                Items = orderItems.Items,
                SuccessUrl = orderItems.SuccessUrl,
                FailureUrl = orderItems.FailureUrl }));
        }

        [HttpGet("{category}/range")]
        public async Task<ActionResult<ItemPriceRange>> GetPriceRange(string category)
        {
            return HandleResult(await Mediator.Send(new PriceRange.Query { Category = category }));
        }

        [Authorize]
        [HttpGet("orders")]
        public async Task<ActionResult<ItemPriceRange>> GetOrders()
        {
            return HandleResult(await Mediator.Send(new OrderList.Query {}));
        }

        [Authorize]
        [HttpPost("{id}/like")]
        public async Task<IActionResult> Like(Guid id){
            return HandleResult(await Mediator.Send(new Application.Items.Like.Command { Id = id }));
        }

        [Authorize]
        [HttpGet("likes")]
        public async Task<ActionResult<List<ItemDto>>> LikeList() {
            return HandleResult(await Mediator.Send(new LikeList.Query {}));
        }
    }
}