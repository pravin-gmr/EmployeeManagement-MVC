using BO.Employee;
using DAL.Common;
using DAL.Employee;
using System.Text;
using System.Web.Mvc;

namespace Machine_Assignment__v1._1_.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AddUpdateEmployee()
        {
            return View();
        }

        [HttpGet]
        public ActionResult GetCountryList()
        {
            DALCommon dal = new DALCommon();
            var res = dal.GetCountryList();

            return Json(res, "application/json", Encoding.UTF8, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetStateList(int CountryId)
        {
            DALCommon dal = new DALCommon();
            var res = dal.GetStateList(CountryId);

            return Json(res, "application/json", Encoding.UTF8, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetCityList(int StateId)
        {
            DALCommon dal = new DALCommon();
            var res = dal.GetCityList(StateId);

            return Json(res, "application/json", Encoding.UTF8, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetEmployeeById(int EmployeeId)
        {
            DALEmployee dal = new DALEmployee();
            var res = dal.GetEmployeeById(EmployeeId);

            return Json(res, "application/json", Encoding.UTF8, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetAllEmployee()
        {
            DALEmployee dal = new DALEmployee();
            var res = dal.GetAllEmployee();

            return Json(res, "application/json", Encoding.UTF8, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult AddUpdateEmployee(BOEmployee obj)
        {
            DALEmployee dal = new DALEmployee();
            var res = dal.AddUpdateEmployee(obj);

            return Json(res, "application/json", Encoding.UTF8, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult DeleteEmployee(int EmployeeId, bool IsDeleted)
        {
            DALEmployee dal = new DALEmployee();
            var res = dal.DeleteEmployee(EmployeeId, IsDeleted);

            return Json(res, "application/json", Encoding.UTF8, JsonRequestBehavior.AllowGet);
        }
    }
}