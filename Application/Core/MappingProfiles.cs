using Application.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Item, ItemDto>()
                .ForMember(d => d.Images, o => o.MapFrom(s => s.Images));
            CreateMap<Photo, string>()
                .ConvertUsing(r => r.Url);
            CreateMap<Order, OrderDto>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.User.UserName));
            CreateMap<OrderItem, OrderItemDto>();
        }
    }
}