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
                        Category = "Furniture",
                        Images = new List<string>(),
                        Price = 9.99,
                        PriceSale = 7.99,
                    },
                    new() {
                        Name = "Corset",
                        Description = "Incidunt fringilla senectus ad! Leo dictumst, luctus facilis, class eius repellat nisl diamlorem, possimus in, mollis! Sagittis saepe dolor porttitor.",
                        Category = "Wearing",
                        Images = new List<string>(),
                        Price = 10.99,
                    },
                    new() {
                        Name = "Orthopedic shoes",
                        Description = "Incidunt fringilla senectus ad! Leo dictumst, luctus facilis, class eius repellat nisl diamlorem, possimus in, mollis! Sagittis saepe dolor porttitor.",
                        Category = "Footwear",
                        Images = new List<string>(),
                        Price = 9.99,
                    },
                    new() {
                        Name = "Massager",
                        Description = "Incidunt fringilla senectus ad! Leo dictumst, luctus facilis, class eius repellat nisl diamlorem, possimus in, mollis! Sagittis saepe dolor porttitor.",
                        Category = "Furniture",
                        Images = new List<string>(),
                        Price = 5.99,
                        PriceSale = 4.99,
                    },
                    new() {
                        Name = "Orthopedic table",
                        Description = "Incidunt fringilla senectus ad! Leo dictumst, luctus facilis, class eius repellat nisl diamlorem, possimus in, mollis! Sagittis saepe dolor porttitor.",
                        Category = "Furniture",
                        Images = new List<string>(),
                        Price = 20.99,
                    },
                    new() {
                        Name = "Orthopedic chair v2",
                        Description = "Incidunt fringilla senectus ad! Leo dictumst, luctus facilis, class eius repellat nisl diamlorem, possimus in, mollis! Sagittis saepe dolor porttitor.",
                        Category = "Furniture",
                        Images = new List<string>(),
                        Price = 10.99,
                        PriceSale = 7.49,
                    },
                };

                await context.Items.AddRangeAsync(items);
                await context.SaveChangesAsync();
            }
        }
    }
}