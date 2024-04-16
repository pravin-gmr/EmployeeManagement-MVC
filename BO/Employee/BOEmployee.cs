using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BO.Employee
{
    public class BOEmployee
    {
        public int Row_Id { get; set; }
        public string EmployeeCode { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public string MobileNumber { get; set; }
        public string PanNumber { get; set; }
        public string PassportNumber { get; set; }
        public string ProfileImage { get; set; }
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public int StateId { get; set; }
        public string StateName { get; set; }
        public int CityId { get; set; }
        public string CityName { get; set; }
        public int Gender { get; set; }
        public string GenderName { get; set; }
        public bool IsActive { get; set; }
        public string ActiveStatus { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime DateOfJoinee { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime DeletedDate { get; set; }
    }
}
