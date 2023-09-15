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
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<ItemDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var item = await _context.Items.ProjectTo<ItemDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(x => x.Id == request.Id);
                return Result<ItemDto>.Success(item);
            }
        }
    }
}