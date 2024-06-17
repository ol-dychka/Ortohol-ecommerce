namespace Domain
{
    public class OrderItems
    {
        public List<OrderItem> Items { get; set; }
        public string SuccessUrl { get; set; }
        public string FailureUrl { get; set; }
    }
}