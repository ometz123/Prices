using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;

namespace Prices.Models
{
    public class Receipt
    {
        #region Private fields
        private string receipt_id;
        private string user_id;
        private DateTime date;
        private string receipt_description;
        private double discount_dollar;
        private double discount_percent;
        private string receipt_image;
        private Store store;
        private List<Item> items;
        private bool status;
        private int receipt_rank;
        #endregion

        #region Properties
        public string Receipt_id { get => receipt_id; set => receipt_id = value; }
        public string User_id { get => user_id; set => user_id = value; }
        public DateTime Date { get => date; set => date = value; }
        public string Receipt_Description { get => receipt_description; set => receipt_description = value; }
        public double Discount_dollar { get => discount_dollar; set => discount_dollar = value; }
        public double Discount_percent { get => discount_percent; set => discount_percent = value; }
        public List<Item> Items { get => items; set => items = value; }
        public string Receipt_image { get => receipt_image; set => receipt_image = value; }
        public Store Store { get => store; set => store = value; }
        public bool Status { get => status; set => status = value; }
        public int Receipt_rank { get => receipt_rank; set => receipt_rank = value; }
        #endregion

    }
}