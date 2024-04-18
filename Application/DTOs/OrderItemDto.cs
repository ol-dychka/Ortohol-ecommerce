namespace Application.DTOs
{
    public class OrderItemDto
    {
        public Guid Id { get; set; }
        public ItemDto Item { get; set; }
        public int Quantity { get; set; }
        public string Size { get; set; }
        public string Color { get; set; }
        public string Gender { get; set; }
        public string CompressionClass { get; set; }
    }
}