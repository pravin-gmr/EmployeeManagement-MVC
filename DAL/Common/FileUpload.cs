using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Web;

namespace DAL.Common
{
    public class FileUpload
    {
        public string SavePostImage(string obj, string imageName)
        {
            try
            {
                if (obj != null)
                {
                    if (!string.IsNullOrEmpty(obj))
                    {
                        if (File.Exists(HttpContext.Current.Server.MapPath(imageName)))
                            File.Delete(HttpContext.Current.Server.MapPath(imageName));
                    }

                    string base64 = obj.Substring(obj.IndexOf(',') + 1);
                    base64 = base64.Trim('\0');
                    byte[] bytes = Convert.FromBase64String(base64);

                    using (MemoryStream ms = new MemoryStream(bytes))
                    {
                        SaveImage(ms, imageName);
                    }
                }
            }
            catch (Exception)
            {
                imageName = "NA";
            }
            return imageName;
        }

        // Change Image Format and Save Image in Associated Path
        public static bool SaveImage(MemoryStream image, string imageName)
        {
            bool Result = false;

            var ImageFile = Image.FromStream(image);

            using (var newImage = ScaleImage(ImageFile, ImageFile.Width, ImageFile.Height))
            {
                newImage.Save(HttpContext.Current.Server.MapPath(imageName), ImageFormat.Jpeg);

                Result = true;
            }
            return Result;
        }

        //Compress Image Width and Height
        public static Image ScaleImage(Image image, int maxWidth, int maxHeight)
        {

            var ratioX = (double)maxWidth / image.Width;
            var ratioY = (double)maxHeight / image.Height;
            var ratio = Math.Min(ratioX, ratioY);

            var newWidth = (int)(image.Width * ratio);
            var newHeight = (int)(image.Height * ratio);

            var newImage = new Bitmap(newWidth, newHeight);

            using (var graphics = Graphics.FromImage(newImage))
                graphics.DrawImage(image, 0, 0, newWidth, newHeight);

            return newImage;
        }
    }
}
