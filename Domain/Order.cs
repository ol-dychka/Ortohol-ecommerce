namespace Domain
{
    public class Order
    {
        public Guid Id { get; set; }
        public AppUser User { get; set; }
        public string StripeSessionId { get; set; }
        public List<OrderItem> Items { get; set; }
    }
}