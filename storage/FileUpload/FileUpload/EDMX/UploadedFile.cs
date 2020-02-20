
namespace FileUpload.EDMX
{
    using System;
    using System.Collections.Generic;
    
    public partial class UploadedFile
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public UploadedFile()
        {
            this.FileLinks = new HashSet<FileLink>();
        }
    
        public int ID { get; set; }

        public string FileName { get; set; }

        public string FilePath { get; set; }

        public string CreatedBy { get; set; }

        public DateTime? CreateDate { get; set; }

        public string GUID { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<FileLink> FileLinks { get; set; }
    }
}
