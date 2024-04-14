using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Items
{
    public class Like
    {
        public class Command : IRequest<Result<Unit>>{
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>{
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;
            public Handler (IUserAccessor userAccessor, DataContext context){
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken){
                var item = await _context.Items
                    .FirstOrDefaultAsync(x => x.Id == request.Id);
                if (item == null) return null;

                var user = await _context.Users
                    .Include(u => u.ItemsLiked)
                    .ThenInclude(l => l.Item)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());
                if (user == null) return null;

                var like = user.ItemsLiked.FirstOrDefault(x => x.ItemId == item.Id);

                if (like == null){
                    user.ItemsLiked.Add(new Domain.Like{
                        AppUser = user,
                        Item = item,
                    });
                } else {
                    user.ItemsLiked.Remove(like);
                }

                var result = await _context.SaveChangesAsync() > 0;
                if (result) return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Could not change like count");
            }
        }
    }
}