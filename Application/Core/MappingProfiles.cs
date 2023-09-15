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
            CreateMap<Photo, String>()
                .ConvertUsing(r => r.Url);
        }
    }
}