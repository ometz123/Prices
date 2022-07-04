using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Prices.Models
{
    public class Category
    {
        string category_title;
        string category_id;

        public string Category_title { get => category_title; set => category_title = value; }
        public string Category_id { get => category_id; set => category_id = value; }
    }
}