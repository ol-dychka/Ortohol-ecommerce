using Application.Core;
using Application.DTOs;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Items
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<ItemDto>>>
        {
            public ItemParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<ItemDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<ItemDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Items
                    .Include(p => p.Images)
                    .ProjectTo<ItemDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                if (request.Params.Category != null)
                {
                    query = query.Where(x => x.Category == request.Params.Category);
                }

                if (request.Params.PriceMin != null && request.Params.PriceMax != null)
                {
                    var min = Math.Floor(Convert.ToDouble(request.Params.PriceMin));
                    var max = Math.Ceiling(Convert.ToDouble(request.Params.PriceMax));
                    query = query.Where(x => x.Price >= min && x.Price <= max);
                }

                var user = await _context.Users
                    .Include(u => u.ItemsLiked)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());
                if (user != null) {
                    query = query.Select(i => SetLike(user.ItemsLiked, i));
                }

                return Result<PagedList<ItemDto>>.Success(await PagedList<ItemDto>
                    .CreateAsync(query, request.Params.PageNumber, request.Params.PageSize));
            }

            public static ItemDto SetLike (ICollection<Domain.Like> likes, ItemDto item) {
                if (likes.Any(l => l.ItemId == item.Id)){
                    item.Liked = true;
                }
                return item;
            }
        }
    }
}