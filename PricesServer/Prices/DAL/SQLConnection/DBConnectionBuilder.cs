using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace Prices.DAL.SQLConnection
{
    public class DBConnectionBuilder
    {
        #region This method creates a connection to the database according to the connectionString name in the web.config 
        public SqlConnection Connect(String conString)
        {
            // read the connection string from the configuration file
            string cStr = WebConfigurationManager.ConnectionStrings[conString].ConnectionString;
            SqlConnection con = new SqlConnection(cStr);
            con.Open();
            return con;
        }
        #endregion
    }
}