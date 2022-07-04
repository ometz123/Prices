using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Prices.Models
{
    public class SubCategory
    {
        string sub_category_title;
        string sub_category_id;
        public string Sub_category_title { get => sub_category_title; set => sub_category_title = value; }
        public string Sub_category_id { get => sub_category_id; set => sub_category_id = value; }
    }
}