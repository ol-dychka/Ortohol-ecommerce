namespace Domain
{
    public class Item
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public string Details { get; set; }
        public List<string> Sizes { get; set; }
        public List<string> Colors { get; set; }
        public List<string> Genders { get; set; }
        public List<string> CompressionClasses { get; set; }
        public List<Photo> Images { get; set; }
        public double Price { get; set; }
        public double PriceSale { get; set; }
        public ICollection<Like> UserLikes { get; set; } = new List<Like>();
    }
}