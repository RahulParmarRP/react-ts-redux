using FileUpload.Helper;
using System.Web.Mvc;
using System.Web.Routing;

namespace FileUpload
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = StaticKeyWord.FileUpload, action = StaticKeyWord.Index, id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Dashboard",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = StaticKeyWord.Dashboard, action = StaticKeyWord.GetFileLinks, id = UrlParameter.Optional }
            );
            
        }
    }
}
