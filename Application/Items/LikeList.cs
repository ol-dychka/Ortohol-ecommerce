using Application.Core;
using Application.DTOs;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Items
{
    public class LikeList
    {
        public class Query : IRequest<Result<List<ItemDto>>>
        {}

        public class Handler : IRequestHandler<Query, Result<List<ItemDto>>>
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

            public async Task<Result<List<ItemDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .Include(u => u.ItemsLiked)
                    .ThenInclude(l => l.Item)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());
                if (user == null) return null;

                var items = user.ItemsLiked.Select(item => _mapper.Map<ItemDto>(item.Item)).ToList();
                return Result<List<ItemDto>>.Success(items);
            }
        }
    }
}