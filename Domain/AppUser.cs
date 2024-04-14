using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public ICollection<Like> ItemsLiked { get; set; } = new List<Like>();
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}