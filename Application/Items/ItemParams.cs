using Application.Core;

namespace Application.Items
{
    public class ItemParams : PagingParams
    {
        public string Category { get; set; }
        public string PriceMin { get; set; }
        public string PriceMax { get; set; }
        public string SearchWord { get; set; }
        // add more params here and more filters in query handler...
    }
}