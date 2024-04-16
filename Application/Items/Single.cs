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
    public class Single
    {
        public class Query : IRequest<Result<ItemDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ItemDto>>
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

            public async Task<Result<ItemDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var item = await _context.Items.ProjectTo<ItemDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(x => x.Id == request.Id);
                
                var user = await _context.Users
                    .Include(u => u.ItemsLiked)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());
                if (user != null) {
                    item.Liked = user.ItemsLiked.Any(x => x.ItemId == request.Id);
                }

                return Result<ItemDto>.Success(item);
            }
        }
    }
}