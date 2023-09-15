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
                        Name = "Orthopedic chair",
                        Description = "Incidunt fringilla senectus ad! Leo dictumst, luctus facilis, class eius repellat nisl diamlorem, possimus in, mollis! Sagittis saepe dolor porttitor.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"S", "M", "L", "XL" },
                        Colors = new List<string>{ "black", "white", "red"},
                        Category = "Furniture",
                        Images = new List<Photo>{
                            new() {
                                Id= "nqrwakdcbqxuivqt6aeu",
                                Url= "https://res.cloudinary.com/dhlhcn9vy/image/upload/v1692902142/nqrwakdcbqxuivqt6aeu.png"
                            },
                            new() {
                                Url ="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1692986999/bootmhbmtvwcqnpfotco.png",
                                Id="bootmhbmtvwcqnpfotco",
                            }
                        },
                        Price = 9.99,
                        PriceSale = 7.99,
                        LeftCount = 3,
                    },
                    new() {
                        Name = "Corset",
                        Description = "Incidunt fringilla senectus ad! Leo dictumst, luctus facilis, class eius repellat nisl diamlorem, possimus in, mollis! Sagittis saepe dolor porttitor.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),                        Sizes = new List<string>{"S", "M", "L", "XL" },
                        Colors = new List<string>{ "black", "white", "red"},
                        Category = "Wearing",
                        Images = new List<Photo>{
                            new() {
                                Id="gdgkffmoc30pphzxq4fr",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1692986313/gdgkffmoc30pphzxq4fr.png"
                            }
                        },
                        Price = 10.99,
                        LeftCount = 10,
                    },
                };

                await context.Items.AddRangeAsync(items);
                await context.SaveChangesAsync();
            }
        }
    }
}