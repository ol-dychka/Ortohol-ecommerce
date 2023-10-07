namespace Domain
{
    public class OrderItem
    {
        public Guid Id { get; set; }
        public string ItemId { get; set; }
        public int Quantity { get; set; }
        public string Size { get; set; }
        public string Color { get; set; }
        public string Gender { get; set; }
        public string CompressionClass { get; set; }
    }
}