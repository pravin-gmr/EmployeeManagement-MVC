using System.Web;
using System.Web.Optimization;

namespace Machine_Assignment__v1._1_
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Content/plugins/jquery/jquery-{version}.js",
                        "~/Content/plugins/jquery-ui/jquery-ui.min.js",
                        "~/Content/plugins/select2/js/select2.min.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Content/plugins/jquery-validation/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/dataTables").Include(
                        "~/Content/plugins/dataTables/jquery.dataTables.min.js",
                        "~/Content/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js",
                        "~/Content/plugins/datatables-responsive/js/dataTables.responsive.min.js",
                        "~/Content/plugins/datatables-responsive/js/responsive.bootstrap4.min.js",
                        "~/Content/plugins/datatables-buttons/js/dataTables.buttons.min.js",
                        "~/Content/plugins/datatables-buttons/js/buttons.bootstrap4.min.js",
                        "~/Content/plugins/datatables-buttons/js/buttons.html5.min.js",
                        "~/Content/plugins/datatables-buttons/js/buttons.print.min.js",
                        "~/Content/plugins/datatables-buttons/js/buttons.colVis.min.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/sweetalert2").Include(
                        "~/Content/plugins/sweetalert2/sweetalert2.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/addon").Include(
                        "~/Content/js/addon/validation.js",
                        "~/Content/js/addon/session.js",
                        "~/Content/js/addon/common.js"
                        ));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Content/js/modernizr-*"));

            bundles.Add(new Bundle("~/bundles/bootstrap").Include(
                      "~/Content/plugins/bootstrap/js/bootstrap.bundle.min.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/plugins/bootstrap/css/bootstrap.css",
                      "~/Content/plugins/jquery-ui/jquery-ui.min.css",
                      "~/Content/plugins/select2/css/select2.min.css",
                      "~/Content/plugins/fontawesome-free/css/all.min.css",
                      "~/Content/css/site.css"));
        }
    }
}
