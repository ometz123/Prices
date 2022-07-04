using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Prices.Models
{
    public class Search<T>
    {
        private User user;
        private T model;
        private string title_Words;
        private Tag[] tags;
        private int distance_radius;
        private double max_price;
        private double min_price;
        private string statement_Type;
        private bool overPriceRange;
        public User User { get => user; set => user = value; }
        public string Title_Words { get => title_Words; set => title_Words = value; }
        public Tag[] Tags { get => tags; set => tags = value; }
        public int Distance_radius { get => distance_radius; set => distance_radius = value; }
        public double Max_price { get => max_price; set => max_price = value; }
        public double Min_price { get => min_price; set => min_price = value; }
        public T Model { get => model; set => model = value; }
        public string Statement_Type { get => statement_Type; set => statement_Type = value; }
        public bool OverPriceRange { get => overPriceRange; set => overPriceRange = value; }
    }
}