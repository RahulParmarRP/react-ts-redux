namespace FileUpload.Models
{
    public class FileInfo
    {
        public int FileID { get; set; }

        public string LinkCreatedDate { get; set; }

        public string LinkExpDate { get; set; }

    }

    public class FileData
    {
        public string FileLink { get; set; }

        public int FileID { get; set; }

        public string FileName { get; set; }

        public string LinkCreatedDate { get; set; }

        public string LinkExpDate { get; set; }

        public string Guid { get; set; }
    }

}