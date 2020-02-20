
namespace FileUpload.EDMX
{
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;

    public partial class FileUploadDBEntities : DbContext
    {
        public FileUploadDBEntities() : base("name=FileUploadUtility_Test") { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }

        public virtual DbSet<FileLink> FileLinks { get; set; }
        public virtual DbSet<UploadedFile> UploadedFiles { get; set; }
    }
}
