using Prices.Models;
using System;
using System.Collections.Generic;
//using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Prices.DAL.SQLConnection
{
    public class DBCommandBuilder
    {

        #region Create the SqlCommand
        //public SqlCommand CreateCommand(String CommandSTR, SqlConnection con)
        //{

        //    SqlCommand cmd = new SqlCommand(); // create the command object

        //    cmd.Connection = con;              // assign the connection to the command object

        //    cmd.CommandText = CommandSTR;      // can be Select, Insert, Update, Delete 

        //    cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        //    cmd.CommandType = System.Data.CommandType.Text; // the type of the command, can also be stored procedure

        //    return cmd;
        //}

        public SqlCommand SPCreateCommand(string CommandSTR, SqlConnection con, Dictionary<string, string> parameters)
        {
            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = CommandSTR;    // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

            foreach (var parameter in parameters)
            {
                cmd.Parameters.Add(new SqlParameter(parameter.Key, parameter.Value));
            }
            return cmd;
        }
        #endregion

        #region Build the Insert command

        public string SPBuildInsertCommand<T>(T type, out Dictionary<string, string> parameters)
        {
            string spName;

            //parameters = new Dictionary<string, string>();
            parameters = new Dictionary<string, string>() { { "@StatementType", "Insert" } };
            if (type is Receipt)
            {
                spName = "SPReceipts";
                Receipt rec = type as Receipt;
                //parameters.Add("@StatementType", "Insert");
                parameters.Add("@receipt_id", rec.Receipt_id);
                parameters.Add("@user_id", rec.User_id);
                parameters.Add("@receipt_rank", rec.Receipt_rank.ToString());
                parameters.Add("@date", SQLDateFormat(rec.Date.ToString()));
                parameters.Add("@discount_dollar", rec.Discount_dollar.ToString());
                parameters.Add("@discount_percent", rec.Discount_percent.ToString());
                parameters.Add("@receipt_image", rec.Receipt_image);
                parameters.Add("@store_id", rec.Store.Store_id);
                parameters.Add("@receipt_description", rec.Receipt_Description);
            }
            else if (type is Item)
            {
                spName = "SPItems";
                Item item = type as Item;
                //parameters.Add("@StatementType", "Insert");
                parameters.Add("@item_id", item.Item_id);
                parameters.Add("@receipt_id", item.Receipt_id);
                parameters.Add("@item_title", item.Item_title);
                parameters.Add("@price", item.Price.ToString());
                parameters.Add("@barcode", item.Barcode.ToString());
                parameters.Add("@discount_dollar", item.Discount_dollar.ToString());
                parameters.Add("@discount_percent", item.Discount_percent.ToString());
                parameters.Add("@item_description", item.Item_Description.ToString());
                parameters.Add("@user_id", item.User_id);
                parameters.Add("@item_image", item.Item_image);
                parameters.Add("@id_type", item.Id_type);
                parameters.Add("@category_id", item.Category.Category_id);
                parameters.Add("@sub_category_id", item.Sub_category.Sub_category_id);
            }
            else if (type is Tag)
            {
                Tag tag = type as Tag;
                if (tag.Tag_title != null)
                {
                    spName = "SPTags";
                    //parameters.Add("@StatementType", "Insert");
                    parameters.Add("@tag_id", tag.Tag_id.ToString());
                    parameters.Add("@tag_title", tag.Tag_title);
                }
                else
                {
                    spName = "SPItemsTags";
                    //parameters.Add("@StatementType", "Insert");
                    parameters.Add("@item_id", tag.Item_id);
                    parameters.Add("@tag_id", tag.Tag_id);

                }
            }
            else if (type is Store)
            {
                spName = "SPStores";
                Store store = type as Store;
                parameters.Add("@store_id", store.Store_id);
                parameters.Add("@store_name", store.Store_name);
                parameters.Add("@lat", store.Lat.ToString());
                parameters.Add("@lon", store.Lon.ToString());
            }
            else if (type is User)
            {
                spName = "SPUsers";
                User user = type as User;
                parameters.Add("@user_id", user.User_id);
                parameters.Add("@first_name", user.First_name);
                parameters.Add("@last_name", user.Last_name);
                parameters.Add("@password", user.Password);
                parameters.Add("@birthdate", SQLDateFormat(user.Birthdate.ToString()));
                parameters.Add("@gender", user.Gender.ToString());
                parameters.Add("@state", user.State);
                parameters.Add("@city", user.City);
                parameters.Add("@user_rank", user.User_rank.ToString());
            }
            else if (type is Category)
            {
                Category category = type as Category;
                spName = "SPCategory";
                parameters.Add("@id", category.Category_id);
                parameters.Add("@title", category.Category_title);
            }
            else if (type is SubCategory)
            {
                SubCategory subCategory = type as SubCategory;
                spName = "SPSubCategory";
                parameters.Add("@id", subCategory.Sub_category_id);
                parameters.Add("@title", subCategory.Sub_category_title);
            }
            else
            {
                spName = "NUN";
            }

            return spName;
        }

        #endregion
        private string SQLDateFormat(string date)
        {
            date = date.Split(' ')[0];
            string[] newDate = date.Split('/');
            string yyyy = newDate[2];
            string dd = newDate[0];
            string mm = newDate[1];
            return $"{yyyy}-{mm}-{dd}";
        }
    }
}