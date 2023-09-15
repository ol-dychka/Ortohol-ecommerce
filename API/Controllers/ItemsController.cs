using Application.DTOs;
using Application.Items;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ItemsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<ItemDto>>> GetPosts()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ItemDto>> GetPost(Guid id)
        {
            return HandleResult(await Mediator.Send(new Application.Items.Single.Query { Id = id }));
        }
    }
}