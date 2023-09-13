using Application.Items;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ItemsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Item>>> GetPosts()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
    }
}