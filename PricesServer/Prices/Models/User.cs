using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Prices.Models
{
    public class User
    {
        private string user_id;
        private string first_name;
        private string last_name;
        private string password;
        private DateTime birthdate;
        private bool gender;
        private string state;
        private string city;
        private int user_rankΔ;
        private double lon;
        private double lat;
        private string field2update;
        private List<string> favorites;

        public string User_id { get => user_id; set => user_id = value; }
        public string First_name { get => first_name; set => first_name = value; }
        public string Last_name { get => last_name; set => last_name = value; }
        public string Password { get => password; set => password = value; }
        public DateTime Birthdate { get => birthdate; set => birthdate = value; }
        public bool Gender { get => gender; set => gender = value; }
        public string State { get => state; set => state = value; }
        public string City { get => city; set => city = value; }
        public int User_rank { get => user_rankΔ; set => user_rankΔ = value; }
        public double Lon { get => lon; set => lon = value; }
        public double Lat { get => lat; set => lat = value; }
        public Exception Ex { get; set; }
        public string Field2update { get => field2update; set => field2update = value; }
        public List<string> Favorites { get => favorites; set => favorites = value; }

        public void UpdateUserRank(Receipt receipt)
        {
            double rank=0;
            int x1 = receipt.Items.Count;//items number
            int[] x2 = new int[x1];
            int[] x3 = new int[x1];
            for (int i = 0; i < x1; i++)
            {
                x2[i] = receipt.Items[i].Tags.Count;// items tags number
                x3[i] = receipt.Items[i].Item_Description.Length;
            }
            int x4 = receipt.Receipt_Description.Length;//description length
            rank += Math.Sqrt(x1);
            for (int i = 0; i < x2.Length; i++)
            {
                rank += 0.015 * (20 *Math.Sqrt(5*x2[i]));
                rank += 0.015 * Math.Sqrt(2000*x3[i]/51);
            }
            rank += 0.015*Math.Sqrt(2000 * x4 / 51);
            User_rank= (int)rank;
        }
    }
}