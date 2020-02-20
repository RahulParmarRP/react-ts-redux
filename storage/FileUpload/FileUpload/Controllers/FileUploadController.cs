using FileUpload.EDMX;
using FileUpload.Helper;
using FileUpload.Models;
using FileUpload.Views.Helper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace FileUpload.Controllers
{
    public class FileUploadController : Controller
    {
        public ActionResult Index() => View(new FileUploadDBEntities().UploadedFiles.ToList());

        #region SaveFile
        [HttpPost]
        public ActionResult SaveFileData(string fileName, string guId)
        {
            try
            {
                if (!string.IsNullOrEmpty(fileName))
                {
                    string path = Path.Combine(Server.MapPath("~/Uploads/" + guId), fileName);

                    using (FileUploadDBEntities fileUploadDBEntities = new FileUploadDBEntities())
                    {
                        fileUploadDBEntities.UploadedFiles.Add(new UploadedFile
                        {
                            FileName = fileName,
                            FilePath = path,
                            CreatedBy = "spadmin",
                            CreateDate = DateTime.Now,
                            GUID = guId
                        });
                        fileUploadDBEntities.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                ViewBag.Message = "Something went wrong";
            }

            return RedirectToAction(StaticKeyWord.Index);
        }
        #endregion

        #region Download
        public FileResult Download(string vars)
        {
            try
            {
                Models.FileInfo fileInfo = new Models.FileInfo();
                FileData linkData = new FileData();

                fileInfo = new JavaScriptSerializer().Deserialize<Models.FileInfo>(CryptoEngine.Decrypt(vars));

                using (FileUploadDBEntities fileUploadDBEntities = new FileUploadDBEntities())
                {
                    var fileProperties = from f in fileUploadDBEntities.FileLinks
                                         join u in fileUploadDBEntities.UploadedFiles
                                         on f.FileID equals u.ID
                                         where f.FileID == fileInfo.FileID && f.LinkCreatedDate == fileInfo.LinkCreatedDate
                                         select new
                                         {
                                             u.ID,
                                             u.FileName,
                                             u.GUID,
                                             f.LinkCreatedDate,
                                             f.LinkExpDate
                                         };

                    linkData = fileProperties.Select(x => new FileData()
                    {
                        FileName = x.FileName,
                        FileID = x.ID,
                        Guid = x.GUID,
                        LinkCreatedDate = x.LinkCreatedDate,
                        LinkExpDate = x.LinkExpDate
                    }).FirstOrDefault();
                }

                DateTime currentDate = DateTime.ParseExact(DateTime.UtcNow.ToString(StaticKeyWord.dateFormat), StaticKeyWord.dateFormat, new CultureInfo("en-US"), DateTimeStyles.None);
                DateTime expiryDate = DateTime.ParseExact(linkData.LinkExpDate, StaticKeyWord.dateFormat, new CultureInfo("en-US"), DateTimeStyles.None);
                int result = DateTime.Compare(expiryDate, currentDate);

                if (result >= 0)
                {
                    byte[] fileBytes = System.IO.File.ReadAllBytes($"{AppDomain.CurrentDomain.BaseDirectory}/Uploads/{linkData.Guid}/{linkData.FileName}");

                    return new FileContentResult(fileBytes, "application/octet-stream")
                    {
                        FileDownloadName = linkData.FileName
                    };
                }
                else
                {
                    Response.Write(@"<script language='javascript'>alert('The download time for this file is expired.');</script>");
                    return null;
                }
            }
            catch (Exception ex)
            {
                Response.Write(@"<script language='javascript'>alert('" + ex.Message + "');</script>");
                return null;
            }
        }
        #endregion

        #region Generate Link
        public PartialViewResult GenerateLink(int id)
        {
            FileUploadDBEntities fileUploadDBEntities = new FileUploadDBEntities();

            UploadedFile fileData = fileUploadDBEntities.UploadedFiles
                                    .FirstOrDefault(u => u.ID.Equals(id));

            var filelink = new FileLink
            {
                FileID = fileData.ID,
                LinkCreatedDate = DateTime.UtcNow.ToString(StaticKeyWord.dateFormat),
                LinkExpDate = DateTime.UtcNow.AddMinutes(Convert.ToDouble(ConfigurationManager.AppSettings.Get("minutes"))).ToString(StaticKeyWord.dateFormat)
            };

            string path = Request.Url.ToString().Replace(Request.RawUrl, string.Empty);
            string link = link = $"{path}/FileUpload/Download?vars={CryptoEngine.Encrypt(new JavaScriptSerializer().Serialize(filelink))}";
            if (Request.Url.Host.Equals("web1.anasource.com"))
            {
                link = $"{path}/FileUploadUtility/FileUpload/Download?vars={CryptoEngine.Encrypt(new JavaScriptSerializer().Serialize(filelink))}";
            }

            filelink.Link = ViewBag.Link = link;

            fileUploadDBEntities.FileLinks.Add(filelink);
            fileUploadDBEntities.SaveChanges();

            return PartialView("Modal");
        }
        #endregion

        [HttpPost]
        public PartialViewResult GetFileLinks(int id, string fileName)
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

            return PartialView("_Links", linkData);
        }
    }
}