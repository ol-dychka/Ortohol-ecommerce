using Application.Core;
using Application.DTOs;
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
        public class Query : IRequest<Result<List<ItemDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ItemDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<ItemDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var items = await _context.Items
                    .Include(p => p.Images)
                    .ProjectTo<ItemDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<ItemDto>>.Success(items);
            }
        }
    }
}