using BO.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DAL.Common
{
    public class DALCommon
    {
        private static readonly Random random = new Random();

        public string GetIPAddress()
        {
            HttpContext context = HttpContext.Current;
            string ipAddress = context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            if (!string.IsNullOrEmpty(ipAddress))
            {
                string[] addresses = ipAddress.Split(',');
                if (addresses.Length != 0)
                {
                    return addresses[0];
                }
            }
            return context.Request.ServerVariables["REMOTE_ADDR"];
        }

        public string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        #region Get All Lists
        public List<BOListVM> GetCountryList()
        {
            List<BOListVM> oListVM = new List<BOListVM>();
            DBConnection con = new DBConnection();
            try
            {
                string query = "SELECT Row_Id AS ID, CountryName AS Value FROM dbo.Country ORDER BY CountryName";
                string tableName = "data";
                DataTable dt = con.ExecuteDataTable(query, tableName);
                if (dt != null && dt.Rows.Count > 0)
                {
                    foreach (DataRow dr in dt.Rows)
                    {
                        var oList = new BOListVM
                        {
                            ID = Convert.ToInt32(dr["ID"]),
                            Value = Convert.ToString(dr["Value"])
                        };

                        oListVM.Add(oList);
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
            return oListVM;
        }

        public List<BOListVM> GetStateList(int CountryId)
        {
            List<BOListVM> oListVM = new List<BOListVM>();
            DBConnection con = new DBConnection();
            try
            {
                string query = "SELECT Row_Id AS ID, StateName AS Value FROM dbo.State WHERE CountryId = " + CountryId;
                string tableName = "data_value";
                DataTable dt = con.ExecuteDataTable(query, tableName);
                if (dt != null && dt.Rows.Count > 0)
                {
                    foreach (DataRow dr in dt.Rows)
                    {
                        var oList = new BOListVM
                        {
                            ID = Convert.ToInt32(dr["ID"]),
                            Value = Convert.ToString(dr["Value"])
                        };

                        oListVM.Add(oList);
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
            return oListVM;
        }

        public List<BOListVM> GetCityList(int StateId)
        {
            List<BOListVM> oListVM = new List<BOListVM>();
            DBConnection con = new DBConnection();
            try
            {
                string query = "SELECT Row_Id AS ID, CityName AS Value FROM dbo.City WHERE StateId = " + StateId;
                string tableName = "data_value";
                DataTable dt = con.ExecuteDataTable(query, tableName);
                if (dt != null && dt.Rows.Count > 0)
                {
                    foreach (DataRow dr in dt.Rows)
                    {
                        var oList = new BOListVM
                        {
                            ID = Convert.ToInt32(dr["ID"]),
                            Value = Convert.ToString(dr["Value"])
                        };

                        oListVM.Add(oList);
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
            return oListVM;
        }
        #endregion
    }
}
