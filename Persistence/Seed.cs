using System.Text.Json;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (!context.Items.Any())
            {
                var items = new List<Item>{
                    new() {
                        Name = "Ортопедическая Подушка",
                        Description = "Incidunt fringilla senectus ad! Leo dictumst, luctus facilis, class eius repellat nisl diamlorem, possimus in, mollis! Sagittis saepe dolor porttitor.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Универсальный"},
                        Colors = new List<string>{ "черный"},
                        Genders = new List<string>{ "универсальный"},
                        CompressionClasses = new List<string>{ "без"},
                        Category = "Furniture",
                        Images = new List<Photo>{
                            new() {
                                Id= "nae4jvgjog6uswrmfuf0",
                                Url= "https://res.cloudinary.com/dhlhcn9vy/image/upload/v1695778366/nae4jvgjog6uswrmfuf0.jpg"
                            },
                            new() {
                                Id="itmzvk8ysblxwt0spupc",
                                Url ="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1695778367/itmzvk8ysblxwt0spupc.jpg",
                            }
                        },
                        Price = 9.99,
                        PriceSale = 7.99,
                    },
                    new() {
                        Name = "Corset",
                        Description = "Incidunt fringilla senectus ad! Leo dictumst, luctus facilis, class eius repellat nisl diamlorem, possimus in, mollis! Sagittis saepe dolor porttitor.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"XS","S", "M", "L", "XL", "2XL" },
                        Colors = new List<string>{ "бежевый", "темно-синий"},
                        Genders = new List<string>{ "муж", "жен", "дет" },
                        CompressionClasses = new List<string>{ "легкая", "антиэмболическая", "1й", "2й", "3й"},
                        Category = "Wearing",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t4",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1695778366/bf3azbrsdrpdcl2fd4t4.jpg"
                            }
                        },
                        Price = 10.99,
                    },
                };
                await context.Items.AddRangeAsync(items);
                await context.SaveChangesAsync();
            }
        }
    }
}