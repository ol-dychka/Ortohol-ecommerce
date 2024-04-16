using Domain;

namespace Application.DTOs
{
    public class ItemDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Details { get; set; }
        public List<string> Sizes { get; set; }
        public List<string> Colors { get; set; }
        public List<string> Genders { get; set; }
        public List<string> CompressionClasses { get; set; }
        public string Category { get; set; }
        public List<string> Images { get; set; }
        public double Price { get; set; }
        public double PriceSale { get; set; }
        public bool Liked { get; set; }

        // public ItemDto(Item item) {
        //     Id = item.Id;
        //     Name = item.Name;
        //     Description = item.Description;
        //     Details = item.Details;
        //     Sizes = item.Sizes;
        //     Colors = item.Colors;
        //     Genders = item.Genders;
        //     CompressionClasses = item.CompressionClasses;
        //     Category = item.Category;
        //     Images = item.Images.Select(image => image.Url).ToList();
        //     Price = item.Price;
        //     PriceSale = item.PriceSale;
        // }
    }
}