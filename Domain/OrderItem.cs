namespace Domain
{
    public class OrderItem
    {
        public Guid Id { get; set; }
        public Item Item { get; set; }
        public Guid ItemId { get; set; }
        public int Quantity { get; set; }
        public string Size { get; set; }
        public string Color { get; set; }
        public string Gender { get; set; }
        public string CompressionClass { get; set; }
    }
}