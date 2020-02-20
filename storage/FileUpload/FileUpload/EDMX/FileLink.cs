
namespace FileUpload.EDMX
{
    public partial class FileLink
    {
        public int ID { get; set; }

        public int FileID { get; set; }

        public string LinkCreatedDate { get; set; }

        public string LinkExpDate { get; set; }

        public string Link { get; set; }
    
        public virtual UploadedFile UploadedFile { get; set; }
    }
}
