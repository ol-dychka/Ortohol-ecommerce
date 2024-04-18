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
    public class OrderList
    {
         public class Query : IRequest<Result<List<OrderDto>>>
        {}

        public class Handler : IRequestHandler<Query, Result<List<OrderDto>>>
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

            public async Task<Result<List<OrderDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var userName = _userAccessor.GetUserName();
                if (userName == null) return null;

                var items = await _context.Orders
                    .Include(o => o.Items)
                    .ThenInclude(i => i.Item)
                    .ThenInclude(p => p.Images)
                    .ProjectTo<OrderDto>(_mapper.ConfigurationProvider)
                    .Where(x => x.UserName == userName)
                    .ToListAsync();
                if (items == null) return null;

                return Result<List<OrderDto>>.Success(items);
            }
        }
    }
}