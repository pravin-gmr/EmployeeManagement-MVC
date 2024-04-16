using BO.Common;
using BO.Employee;
using DAL.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace DAL.Employee
{
    public class DALEmployee
    {
        public BOResponse AddUpdateEmployee(BOEmployee obj)
        {
            var oResponse = new BOResponse();
            FileUpload file = new FileUpload();
            DBConnection con = new DBConnection();

            if (!string.IsNullOrEmpty(obj.ProfileImage))
            {
                var imgName = Guid.NewGuid().ToString();
                var filePath = "/Uploads/Employee/" + imgName + ".png";

                obj.ProfileImage = file.SavePostImage(obj.ProfileImage, filePath);
            }
            else
            {
                obj.ProfileImage = "NA";
            }

            try
            {
                obj.LastName = obj.LastName ?? " ";

                string spName = "stp_Emp_AddUpdateEmployee";
                SqlParameter[] param = {
                    new SqlParameter("@Row_Id", obj.Row_Id),
                    new SqlParameter("@FirstName", obj.FirstName),
                    new SqlParameter("@LastName", obj.LastName),
                    new SqlParameter("@EmailAddress", obj.EmailAddress),
                    new SqlParameter("@MobileNumber", obj.MobileNumber),
                    new SqlParameter("@PanNumber", obj.PanNumber),
                    new SqlParameter("@PassportNumber", obj.PassportNumber),
                    new SqlParameter("@ProfileImage", obj.ProfileImage),
                    new SqlParameter("@CountryId", obj.CountryId),
                    new SqlParameter("@StateId", obj.StateId),
                    new SqlParameter("@CityId", obj.CityId),
                    new SqlParameter("@Gender", obj.Gender),
                    new SqlParameter("@IsActive", obj.IsActive),
                    new SqlParameter("@DateOfBirth", obj.DateOfBirth),
                    new SqlParameter("@DateOfJoinee", obj.DateOfJoinee),
                    //new SqlParameter("@IpAddress", common.GetIPAddress())
                };

                DataTable dataTable = con.ExecuteStoredProcedureDataTable(spName, param);
                if (dataTable.Rows.Count > 0)
                {
                    oResponse.Response_Status = Convert.ToInt32(dataTable.Rows[0]["result_status"]);
                    oResponse.Message = Convert.ToString(dataTable.Rows[0]["msg"]);
                    oResponse.Error_Message = Convert.ToString(dataTable.Rows[0]["error_message"]);
                }
            }
            catch (Exception ex)
            {
                oResponse.Response_Status = 0;
                oResponse.Message = "Something went wrong, please try again later";
                oResponse.Error_Message = ex.Message;
            }
            finally
            {
                con.Close();
            }
            return oResponse;
        }
        public BOResponse DeleteEmployee(int Row_Id, bool IsDeleted)
        {
            var oResponse = new BOResponse();
            DBConnection con = new DBConnection();
            try
            {
                string spName = "stp_Emp_DeleteEmployee";
                SqlParameter[] param = {
                    new SqlParameter("@Row_Id", Row_Id),
                    new SqlParameter("@IsDeleted", IsDeleted),
                    //new SqlParameter("@IpAddress", common.GetIPAddress())
                };

                DataTable dataTable = con.ExecuteStoredProcedureDataTable(spName, param);
                if (dataTable.Rows.Count > 0)
                {
                    oResponse.Response_Status = Convert.ToInt32(dataTable.Rows[0]["result_status"]);
                    oResponse.Message = Convert.ToString(dataTable.Rows[0]["msg"]);
                    oResponse.Error_Message = Convert.ToString(dataTable.Rows[0]["error_message"]);
                }
            }
            catch (Exception ex)
            {
                oResponse.Response_Status = 0;
                oResponse.Message = "Something went wrong, please try again later";
                oResponse.Error_Message = ex.Message;
            }
            finally
            {
                con.Close();
            }
            return oResponse;
        }
        public BOEmployee GetEmployeeById(int Row_Id)
        {
            BOEmployee oEmployee = new BOEmployee();
            DBConnection con = new DBConnection();
            try
            {
                string spName = "stp_Emp_GetEmployeeById";
                SqlParameter[] param = {
                    new SqlParameter("@Row_Id", Row_Id)
                };

                DataSet dataSet = con.ExecuteStoredProcedure(spName, param);
                if (dataSet.Tables[0].Rows.Count > 0)
                {
                    DataRow dr = dataSet.Tables[0].Rows[0];
                    oEmployee = new BOEmployee
                    {
                        Row_Id = Convert.ToInt32(dr["Row_Id"]),
                        EmployeeCode = Convert.ToString(dr["EmployeeCode"]),
                        FirstName = Convert.ToString(dr["FirstName"]),
                        LastName = Convert.ToString(dr["LastName"]),
                        EmailAddress = Convert.ToString(dr["EmailAddress"]),
                        MobileNumber = Convert.ToString(dr["MobileNumber"]),
                        PanNumber = Convert.ToString(dr["PanNumber"]),
                        PassportNumber = Convert.ToString(dr["PassportNumber"]),
                        ProfileImage = Convert.ToString(dr["ProfileImage"]),
                        DateOfBirth = Convert.ToDateTime(dr["DateOfBirth"]),
                        DateOfJoinee = Convert.ToDateTime(dr["DateOfJoinee"]),
                        CountryId = Convert.ToInt32(dr["CountryId"]),
                        CountryName = Convert.ToString(dr["CountryName"]),
                        StateId = Convert.ToInt32(dr["StateId"]),
                        StateName = Convert.ToString(dr["StateName"]),
                        CityId = Convert.ToInt32(dr["CityId"]),
                        CityName = Convert.ToString(dr["CityName"]),
                        Gender = Convert.ToInt32(dr["Gender"]),
                        GenderName = Convert.ToString(dr["GenderName"]),
                        IsActive = Convert.ToBoolean(dr["IsActive"]),
                        ActiveStatus = Convert.ToString(dr["ActiveStatus"]),
                    };
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
            finally
            {
                con.Close();
            }
            return oEmployee;
        }
        public List<BOEmployee> GetAllEmployee()
        {
            List<BOEmployee> oList = new List<BOEmployee>();
            DBConnection con = new DBConnection();
            try
            {
                string spName = "stp_Emp_GetAllEmployee";
                SqlParameter[] param = { };

                DataSet dataSet = con.ExecuteStoredProcedure(spName, param);
                if (dataSet.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in dataSet.Tables[0].Rows)
                    {
                        var obj = new BOEmployee
                        {
                            Row_Id = Convert.ToInt32(dr["Row_Id"]),
                            EmployeeCode = Convert.ToString(dr["EmployeeCode"]),
                            FirstName = Convert.ToString(dr["FirstName"]),
                            LastName = Convert.ToString(dr["LastName"]),
                            EmailAddress = Convert.ToString(dr["EmailAddress"]),
                            MobileNumber = Convert.ToString(dr["MobileNumber"]),
                            PanNumber = Convert.ToString(dr["PanNumber"]),
                            PassportNumber = Convert.ToString(dr["PassportNumber"]),
                            ProfileImage = Convert.ToString(dr["ProfileImage"]),
                            DateOfBirth = Convert.ToDateTime(dr["DateOfBirth"]),
                            DateOfJoinee = Convert.ToDateTime(dr["DateOfJoinee"]),
                            CountryId = Convert.ToInt32(dr["CountryId"]),
                            CountryName = Convert.ToString(dr["CountryName"]),
                            StateId = Convert.ToInt32(dr["StateId"]),
                            StateName = Convert.ToString(dr["StateName"]),
                            CityId = Convert.ToInt32(dr["CityId"]),
                            CityName = Convert.ToString(dr["CityName"]),
                            Gender = Convert.ToInt32(dr["Gender"]),
                            GenderName = Convert.ToString(dr["GenderName"]),
                            IsActive = Convert.ToBoolean(dr["IsActive"]),
                            ActiveStatus = Convert.ToString(dr["ActiveStatus"]),
                        };

                        oList.Add(obj);
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
            finally
            {
                con.Close();
            }
            return oList;
        }
    }
}
