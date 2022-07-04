using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Prices.Models
{
    public class Store
    {
        #region Private fields
        private string store_id;
        private string store_name;
        private double lat;
        private double lon;
        #endregion

        #region Properties
        public string Store_id { get => store_id; set => store_id = value; }
        public string Store_name { get => store_name; set => store_name = value; }
        public double Lat { get => lat; set => lat = value; }
        public double Lon { get => lon; set => lon = value; }
        #endregion

    }
}