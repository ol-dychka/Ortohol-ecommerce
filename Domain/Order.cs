namespace Domain
{
    public class Order
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string StripeSessionId { get; set; }
        public List<OrderItem> Items { get; set; }
    }
}