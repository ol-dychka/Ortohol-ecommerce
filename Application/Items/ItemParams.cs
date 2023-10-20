using Application.Core;

namespace Application.Items
{
    public class ItemParams : PagingParams
    {
        public string Category { get; set; }
        // add more params here and more filters in query handler...
    }
}