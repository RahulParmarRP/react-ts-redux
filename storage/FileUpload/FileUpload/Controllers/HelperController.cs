using System;
using System.Configuration;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace FileUpload.Controllers
{
    public class HelperController : ApiController
    {
        public async Task<HttpResponseMessage> ProcessChunk(string fileName, string directoryName, int chunkNumber, int numberofChunks)
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            // Check that we are not trying to upload a file greater than 50MB
            if (Convert.ToInt32(HttpContext.Current.Request.InputStream.Length) > (51 * 1024 * 1024))
            {
                return Request.CreateErrorResponse(HttpStatusCode.RequestEntityTooLarge, "Maximum upload chunk size exceeded");
            }

            try
            {
                byte[] fileData = null;

                // If we have the custom header then we are processing hand made multipart-form-data
                if (HttpContext.Current.Request.Headers["FileUpload-Encoded"] != null)
                {
                    // Read in the request
                    HttpPostedFileBase base64File = new HttpPostedFileWrapper(HttpContext.Current.Request.Files["Slice"]);

                    if (base64File.Equals(null))
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "No file chunk uploaded");
                    }

                    byte[] base64FileData = new byte[base64File.InputStream.Length];
                    // fileData = Convert.FromBase64String(System.Text.Encoding.UTF8.GetString(base64FileData));

                    await base64File.InputStream.ReadAsync(base64FileData, 0, Convert.ToInt32(HttpContext.Current.Request.InputStream.Length));
                }
                else
                {
                    HttpPostedFileBase file = new HttpPostedFileWrapper(HttpContext.Current.Request.Files["Slice"]);

                    if (file.Equals(null)) return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "No file chunk uploaded");

                    fileData = new byte[file.InputStream.Length];
                    await file.InputStream.ReadAsync(fileData, 0, Convert.ToInt32(HttpContext.Current.Request.InputStream.Length));
                }

                if (fileData.Equals(null)) return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "No file chunk uploaded");

                // Write the byte array to a file
                string tempdirectoryname = Path.GetFileNameWithoutExtension(fileName);
                string localFilePath = $"{GetFileFolder($"{directoryName}\\{tempdirectoryname}")}\\{Path.GetFileNameWithoutExtension(fileName)}." +
                    $"{chunkNumber.ToString().PadLeft(16, Convert.ToChar("0"))}.{Path.GetExtension(fileName)}.tmp";


                MemoryStream memoryStream = new MemoryStream(fileData);
                FileStream outputFile = File.Open(localFilePath, FileMode.OpenOrCreate, FileAccess.Write, FileShare.Read);

                await memoryStream.CopyToAsync(outputFile);
                memoryStream.Close();
                outputFile.Close();

                return new HttpResponseMessage()
                {
                    Content = new StringContent(localFilePath),
                    StatusCode = HttpStatusCode.OK
                };
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        private string GetFileFolder(string directoryName)
        {
            //string folder = $"{ConfigurationManager.AppSettings["uploadpath"]}\\{directoryName}";
            string folder = $"{System.Web.Hosting.HostingEnvironment.MapPath(ConfigurationManager.AppSettings["folderPath"])}\\{directoryName}";
            if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);
            return folder;
        }

        private static string GetHashFromFile(string fileName, HashAlgorithm algorithm)
        {
            using (var stream = new BufferedStream(File.OpenRead(fileName), (1024 * 1024)))
            {
                return BitConverter.ToString(algorithm.ComputeHash(stream)).Replace("-", string.Empty);
            }
        }

        [HttpPost]
        public async Task<HttpResponseMessage> UploadChunk(string fileName, string directoryName, int chunkNumber, int numberofChunks)
        {
            return await ProcessChunk(fileName, directoryName, chunkNumber, numberofChunks);
        }

        [HttpGet]
        public HttpResponseMessage MergeAll(string fileName, string directoryName, int numberofChunks)
        {
            string localFilePath = $"{GetFileFolder($"{directoryName}\\{Path.GetFileNameWithoutExtension(fileName)}")}\\";
            DirectoryInfo diSource = new DirectoryInfo(localFilePath);

            if (diSource.GetFiles("*.tmp").Length != numberofChunks)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Number of file chunks less than total count");
            }

            string baseFilename = Path.GetFileNameWithoutExtension(fileName);
            string extension = Path.GetExtension(fileName);
            FileStream outputFile = new FileStream($"{localFilePath}{baseFilename}{extension}", FileMode.OpenOrCreate, FileAccess.Write);

            try
            {
                foreach (FileInfo fiPart in diSource.GetFiles("*.tmp"))
                {
                    byte[] filedata = File.ReadAllBytes(fiPart.FullName);
                    outputFile.Write(filedata, 0, filedata.Length);
                    File.Delete(fiPart.FullName);
                }

                outputFile.Flush();
                outputFile.Close();

                string oldFileLocation = $"{localFilePath}{baseFilename}{extension}";
                string newFileLocation = $"{GetFileFolder(directoryName + "\\")}{baseFilename}{extension}";

                // Check if the file exists. If it does delete it then move the file
                if (File.Exists(newFileLocation)) File.Delete(newFileLocation);

                File.Move(oldFileLocation, newFileLocation);

                // Delete the temporary directory
                Directory.Delete(localFilePath);

                // Get the MD5 hash for the file and send it back to the client
                return new HttpResponseMessage()
                {
                    Content = new StringContent($"Successfully merged file {fileName},{ GetHashFromFile(newFileLocation, new MD5CryptoServiceProvider())}"),
                    StatusCode = HttpStatusCode.OK
                };
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        [HttpGet]
        public string GetWebConfigData() => ConfigurationManager.AppSettings["bytesperchunk"];

    }
}