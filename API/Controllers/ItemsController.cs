using Application.Core;
using Application.DTOs;
using Application.Items;
using Domain;
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

        [HttpPost]
        public async Task<ActionResult<StripeCheckoutSessionResult>> Order(Domain.Order order)
        {
            return HandleResult(await Mediator.Send(new Application.Items.Order.Command { UserName = order.Username, Email = order.Email, Items = order.Items }));
        }
    }
}