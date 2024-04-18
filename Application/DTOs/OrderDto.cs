namespace Application.DTOs
{
    public class OrderDto
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public List<OrderItemDto> Items { get; set; }
    }
}