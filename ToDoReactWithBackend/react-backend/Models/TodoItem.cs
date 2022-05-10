namespace react_backend.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        public int ColumnIndex { get; set; }
        public int CustomOrder { get; set; }
        public int Priority { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Date { get; set; }

    }
}
