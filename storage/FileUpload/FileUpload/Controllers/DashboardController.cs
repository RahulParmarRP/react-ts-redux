using FileUpload.EDMX;
using FileUpload.Helper;
using FileUpload.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace FileUpload.Controllers
{
    public class DashboardController : Controller
    {
        public ActionResult Index() => View();

        public ActionResult GetFileLinks(int id, string fileName)
        {
            List<FileData> linkData = new List<FileData>();

            if (!id.Equals(0))
            {
                using (FileUploadDBEntities fileUploadDBEntities = new FileUploadDBEntities())
                {
                    var fileData = from u in fileUploadDBEntities.UploadedFiles
                                   join f in fileUploadDBEntities.FileLinks
                                   on u.ID equals f.FileID
                                   where u.ID == id
                                   orderby f.ID descending
                                   select new
                                   {
                                       f.Link,
                                       f.LinkCreatedDate,
                                       f.LinkExpDate,
                                       u.FileName
                                   };

                    linkData = fileData.Select(x => new FileData()
                    {
                        FileName = x.FileName,
                        LinkCreatedDate = x.LinkCreatedDate,
                        LinkExpDate = x.LinkExpDate,
                        FileLink = x.Link
                    }).ToList();
                }
                ViewBag.selectedFileName = fileName;
            }

            return View(StaticKeyWord.Dashboard, linkData);
        }
    }
}