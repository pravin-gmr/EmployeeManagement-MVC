using System.Web;
using System.Web.Mvc;

namespace Machine_Assignment__v1._1_
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
