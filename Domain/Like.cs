namespace Domain
{
    public class Like
    {
        public AppUser AppUser { get; set; }
        public string AppUserId { get; set; }
        public Item Item { get; set; }
        public Guid ItemId { get; set; }
    }
}