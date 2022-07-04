using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;

namespace Prices.Models
{
    public class Item
    {
        #region Private fields
        private string item_id;
        private string receipt_id;
        private string receipt_image;
        private string receipt_description;
        private double receipt_discount_dollar;
        private double receipt_discount_percent;
        private string item_title;
        private double price;
        private double discount_dollar;
        private double discount_percent;
        private string item_description;
        private string user_id;
        private string user_rank;
        private string barcode;
        private string id_type;
        private string store_name;
        private string store_lat;
        private string store_lon;
        private double distance;
        private List<Tag> tags;
        private string item_image;
        private Category category;
        private SubCategory sub_category;

        #endregion

        #region Properties
        public string Item_id { get => item_id; set => item_id = value; }
        public string Receipt_id { get => receipt_id; set => receipt_id = value; }
        public string Receipt_image { get => receipt_image; set => receipt_image = value; }
        public string Receipt_description { get => receipt_description; set => receipt_description = value; }
        public double Receipt_discount_dollar { get => receipt_discount_dollar; set => receipt_discount_dollar = value; }
        public double Receipt_discount_percent { get => receipt_discount_percent; set => receipt_discount_percent = value; }
        public string Item_title { get => item_title; set => item_title = value; }
        public double Price { get => price; set => price = value; }
        public double Discount_dollar { get => discount_dollar; set => discount_dollar = value; }
        public double Discount_percent { get => discount_percent; set => discount_percent = value; }
        public string Item_Description { get => item_description; set => item_description = value; }
        public string User_id { get => user_id; set => user_id = value; }
        public string Id_type { get => id_type; set => id_type = value; }
        public List<Tag> Tags { get => tags; set => tags = value; }
        public string Item_image { get => item_image; set => item_image = value; }
        public string Store_name { get => store_name; set => store_name = value; }
        public string Store_lat { get => store_lat; set => store_lat = value; }
        public string Store_lon { get => store_lon; set => store_lon = value; }
        public string User_rank { get => user_rank; set => user_rank = value; }
        public double Distance { get => distance; set => distance = value; }
        public string Barcode { get => barcode; set => barcode = value; }
        public Category Category { get => category; set => category = value; }
        public SubCategory Sub_category { get => sub_category; set => sub_category = value; }

        #endregion
        public bool ContainWords(List<string> words)
        {
            bool itemContainsAllWords = false;
            var props = GetType().GetProperties().ToList();
            foreach (var prop in props)
            {
                object propValue = prop.GetValue(this);
                switch (propValue)
                {
                    case List<Tag> tag:
                        for (int i = 0; i < tag.Count; i++)
                        {
                            if (CheckWords(words, tag[i].Tag_title))
                            {
                                return true;
                            }
                        }
                        break;
                    case Category category:
                        break;
                    case SubCategory subCategory:
                        break;
                    default:
                        itemContainsAllWords = CheckWords(words, propValue);
                        break;
                }
                if (itemContainsAllWords)
                {
                    return true;
                }
            }


            return false;
        }
        private bool CheckWords(List<string> words, object value)
        {
            if (value != null)
            {
                for (int i = 0; i < words.Count; i++)
                {
                    if (value.ToString().ToLower().Contains(words[i].ToLower()))
                    {
                        return true;
                    }
                }
            }
            return false;
        }
    }
}