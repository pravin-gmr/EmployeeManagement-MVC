using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace DAL
{
    class DBConnection
    {
        private readonly string ConString = ConfigurationManager.ConnectionStrings["ConString"].ToString();
        public SqlConnection con;
        public SqlCommand cmd;
        public SqlDataAdapter sdp;

        public DBConnection()
        {
            con = new SqlConnection(ConString);
            cmd = new SqlCommand("", con);
            sdp = new SqlDataAdapter("", con);
            sdp.SelectCommand = new SqlCommand("", con);
            sdp.InsertCommand = new SqlCommand("", con);
            sdp.UpdateCommand = new SqlCommand("", con);
            sdp.DeleteCommand = new SqlCommand("", con);
        }

        public void Open()
        {
            if (con.State == ConnectionState.Closed)
                con.Open();
        }

        public void Close()
        {
            if (con.State == ConnectionState.Open)
                con.Close();
        }

        public DataSet ExecuteStoredProcedure(string spName, SqlParameter[] oParam)
        {
            string result = string.Empty;
            DataSet ds = new DataSet();
            SqlCommand Com = new SqlCommand
            {
                CommandTimeout = 440
            };
            try
            {
                Com.Connection = con;
                Com.CommandText = spName;
                Com.CommandType = CommandType.StoredProcedure;
                CollectInputParams(ref Com, oParam);
                Com.Connection.Open();

                SqlDataAdapter sda = new SqlDataAdapter(Com);
                sda.Fill(ds);
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                con.Close();
            }
            return ds;
        }

        public DataTable ExecuteStoredProcedureDataTable(string spName, SqlParameter[] oParam)
        {
            string result = string.Empty;
            DataTable dt = new DataTable();
            SqlCommand Com = new SqlCommand
            {
                CommandTimeout = 440
            };
            try
            {
                Com.Connection = con;
                Com.CommandText = spName;
                Com.CommandType = CommandType.StoredProcedure;
                CollectInputParams(ref Com, oParam);
                Com.Connection.Open();

                SqlDataAdapter sda = new SqlDataAdapter(Com);
                sda.Fill(dt);
            }
            catch (Exception ex)
            {
                HttpContext.Current.Response.Write(ex.Message);
                throw ex;
            }
            finally
            {
                con.Close();
            }
            return dt;
        }

        public int ExecuteNonQuery(string sql)
        {
            con.Open();
            try
            {
                cmd = new SqlCommand(sql, con)
                {
                    CommandTimeout = 440
                };
                int retval = cmd.ExecuteNonQuery();
                con.Close();
                return retval;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
            }
        }

        public DataSet ExecuteDataSet(string sql)
        {
            DataSet ds = new DataSet();
            sdp = new SqlDataAdapter(sql, con);
            sdp.Fill(ds);
            return ds;
        }

        public DataSet ExecuteDataSet(string sql, SqlParameter[] @params)
        {
            DataSet ds = new DataSet();
            sdp = new SqlDataAdapter(sql, con);
            for (int i = 0; i <= @params.Length - 1; i++)
                sdp.SelectCommand.Parameters.Add(@params[i]);
            sdp.Fill(ds);
            return ds;
        }

        public DataTable ExecuteDataTable(string sql)
        {
            DataTable dt = new DataTable();
            sdp = new SqlDataAdapter(sql, con);
            sdp.Fill(dt);

            return dt;
        }

        public DataTable ExecuteDataTable(string sql, string TableName)
        {
            DataTable dt = new DataTable();
            sdp = new SqlDataAdapter(sql, con);
            dt.TableName = TableName;
            sdp.Fill(dt);

            return dt;
        }

        public int CheckRecord(string str)
        {
            int check;
            SqlDataReader dr;
            con.Open();

            cmd = new SqlCommand(str, con)
            {
                CommandTimeout = 440
            };
            dr = cmd.ExecuteReader();
            if (dr.HasRows == false)
                check = 0;
            else
                check = 1;

            dr.Close();
            con.Close();
            return check;
        }

        public string ExecuteSingleResult(string query)
        {
            SqlCommand cmd = new SqlCommand(query, con);
            cmd.CommandTimeout = 440;

            string result = "";
            SqlDataReader dr;
            con.Open();
            dr = cmd.ExecuteReader();
            try
            {
                if (dr.HasRows)
                {
                    dr.Read();
                    if (!dr.IsDBNull(0))
                        result = Convert.ToString(dr[0]);
                }
                else
                {
                    result = "";
                }
                dr.Close();
                con.Close();
            }
            catch (Exception ex)
            {
                HttpContext.Current.Response.Write(ex.Message);
            }
            finally
            {
                if (con.State == ConnectionState.Open)
                    con.Close();
            }
            return result;
        }

        public DataSet UpdateDataSet(DataSet dst, string SelectQuery)
        {
            DataSet ds = new DataSet();
            SqlDataAdapter da = new SqlDataAdapter();
            SqlCommand ComSelect = new SqlCommand(SelectQuery, con);
            SqlCommandBuilder myDataRowsCommandBuilder = new SqlCommandBuilder(da);
            try
            {
                con.Open();
                da.SelectCommand = ComSelect;
                da.SelectCommand.Connection = con;
                ds.AcceptChanges();
                da.Update(dst);
                con.Close();

            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                if (con.State == ConnectionState.Open)
                    con.Close();
            }
            return dst;
        }

        public SqlDataReader ExecuteReader(string query)
        {
            SqlCommand cmd = new SqlCommand(query, con);
            SqlDataReader dr;
            cmd.CommandTimeout = 440;
            con.Open();
            dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            return dr;
        }

        public void BindDropDownList(string query, string ValueField, string TextField, DropDownList DDL)
        {
            DBConnection db = new DBConnection();
            DDL.DataValueField = ValueField;
            DDL.DataTextField = TextField;
            DDL.DataSource = db.ExecuteDataSet(query);
            DDL.DataBind();
            ListItem itemList = new ListItem
            {
                Text = "---Select---",
                Value = "0"
            };
            DDL.Items.Insert(0, itemList);
        }

        public string ExecuteSingleResultScalar(string query)
        {
            object result;
            con.Open();
            SqlCommand cmd = new SqlCommand(query, con)
            {
                CommandTimeout = 440
            };
            try
            {
                result = cmd.ExecuteScalar();
                con.Close();
                if (result == null)
                    return "";
                else
                    return Convert.ToString(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
            }
        }

        public void BindDDPlusListItem(string query, string ValueField, string TextField, Control ctl, string text = "---Select---", string value = "")
        {
            SqlDataReader dtr;
            if (ctl is DropDownList list)
            {
                DropDownList dd;
                dd = list;
                dd.DataValueField = ValueField;
                dd.DataTextField = TextField;
                dtr = ExecuteReader(query);
                if (dtr.HasRows)
                {
                    dd.DataSource = dtr;
                    dd.DataBind();
                    ListItem Litem = new ListItem
                    {
                        Text = text,
                        Value = value
                    };
                    dd.Items.Insert(0, Litem);
                }
            }
            else if (ctl is ListBox box)
            {
                ListBox dd;
                dd = box;
                dd.DataValueField = ValueField;
                dd.DataTextField = TextField;
                dtr = ExecuteReader(query);
                if (dtr.HasRows)
                {
                    dd.DataSource = dtr;
                    dd.DataBind();
                    ListItem Litem = new ListItem
                    {
                        Text = text,
                        Value = value
                    };
                    dd.Items.Insert(0, Litem);
                }
            }
        }

        public void ExecuteSp(string spName, SqlParameter[] oParam)
        {
            SqlCommand Com = new SqlCommand
            {
                CommandTimeout = 440
            };
            try
            {
                Com.Connection = con;
                Com.CommandText = spName;
                Com.CommandType = CommandType.StoredProcedure;
                CollectInputParams(ref Com, oParam);
                Com.Connection.Open();
                Com.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
            }
        }

        public int ExecuteSpwithtran(string spName, SqlParameter[] oParam)
        {
            SqlCommand Com = new SqlCommand();
            int result;
            try
            {
                Com.Connection = con;
                Com.CommandText = spName;
                Com.CommandType = CommandType.StoredProcedure;
                CollectInputParams(ref Com, oParam);
                Com.Connection.Open();
                result = Com.ExecuteNonQuery();
            }
            catch (SqlException ex)
            {
                result = 0;
                HttpContext.Current.Response.Write(ex.ErrorCode);
            }
            finally
            {
                con.Close();
            }
            return result;
        }

        public SqlDataReader RunSpReturnDR(string spName, SqlParameter[] oParam)
        {
            SqlDataReader dtr;
            SqlCommand com = new SqlCommand();

            try
            {
                con.Open();
                com.Connection = con;

                com.CommandText = spName;
                com.CommandType = CommandType.StoredProcedure;

                CollectInputParams(ref com, oParam);
                dtr = com.ExecuteReader();
            }
            catch (Exception ex)
            {
                HttpContext.Current.Trace.Warn(ex.ToString());
                throw ex;
            }
            finally
            {
            }
            return dtr;
        }

        public void ExecuteSpwithTransaction(string spName, SqlParameter[] oParam)
        {
            SqlCommand Com = new SqlCommand();
            con.Open();
            Com.Connection = con;
            SqlTransaction tran;
            tran = con.BeginTransaction();
            try
            {
                Com.CommandText = spName;
                Com.CommandType = CommandType.StoredProcedure;
                CollectInputParams(ref Com, oParam);
                Com.Connection.Open();
                Com.ExecuteNonQuery();
                tran.Commit();
            }
            catch (Exception ex)
            {
                tran.Rollback();
                throw ex;
            }
            finally
            {
                con.Close();
            }
        }

        public int ExecuteArrayOfSql(ArrayList sqlQueryArr)
        {
            int intResult = 0;
            try
            {
                int i;
                con.Open();

                SqlCommand mDataCom = new SqlCommand
                {
                    Connection = con
                };

                SqlTransaction tran;
                tran = con.BeginTransaction();
                try
                {
                    for (i = 0; i <= sqlQueryArr.Count - 1; i++)
                    {
                        mDataCom.Transaction = tran;
                        mDataCom.CommandType = CommandType.Text;
                        mDataCom.CommandText = (string)sqlQueryArr[i];
                        intResult += mDataCom.ExecuteNonQuery();
                    }
                    tran.Commit();
                }
                catch (SqlException ex)
                {
                    HttpContext.Current.Response.Write(ex.Message);
                    intResult = 0;
                    tran.Rollback();
                }
                con.Close();
                con.Dispose();
            }
            catch (Exception ex)
            {
                intResult = 0;
                HttpContext.Current.Response.Write("xcvcxv" + ex.ToString());
            }
            return intResult;
        }

        public int ExecuteArrayOfSqlwithoutCommit(ArrayList sqlQueryArr)
        {
            int intResult = 0;
            try
            {
                int i;
                con.Open();

                SqlCommand mDataCom = new SqlCommand
                {
                    Connection = con
                };
                try
                {
                    for (i = 0; i <= sqlQueryArr.Count - 1; i++)
                    {
                        mDataCom.CommandType = CommandType.Text;
                        mDataCom.CommandText = (string)sqlQueryArr[i];
                        intResult = intResult + mDataCom.ExecuteNonQuery();
                    }
                }
                catch (SqlException ex)
                {
                    HttpContext.Current.Response.Write(ex.ErrorCode);
                    intResult = 0;
                }
                con.Close();
                con.Dispose();
            }
            catch (Exception ex)
            {
                intResult = 0;
                HttpContext.Current.Response.Write("Exception " + ex.ToString());
            }
            return intResult;
        }

        private void CollectInputParams(ref SqlCommand oCommand, SqlParameter[] oParam)
        {
            int ic;
            for (ic = 0; ic <= oParam.Length - 1; ic++)
            {
                if (oParam[ic] == null)
                {
                }
                else
                {
                    oCommand.Parameters.Add(oParam[ic]);
                }
            }
        }
    }
}
