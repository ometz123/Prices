using Prices.BLL.Repository_Interfaces;
using Prices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;



namespace Prices.Controllers
{
    //https://localhost:44377/api/Receipts
    public class ReceiptsController : ApiController
    {
        IReceiptRepository repo;
        public ReceiptsController(IReceiptRepository ir) => repo = ir;


        // GET api/<controller>
        //[HttpGet]
        //[Route("api/receipts/getall")]
        public IEnumerable<string> Get()
        {
            repo.GetAllReceipts();
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        //[HttpPost]
        //[Route("api/receipts/post")]

        public Receipt Post(Receipt receipt)
        {


            #region Items

            //List<Item> items = new List<Item>()
            //{
            //    new Item(){
            //        Item_id="0001",
            //        Receipt_id="0001",
            //        Item_title="Bamba",
            //        Price=5,
            //        Discount_dollar=2,
            //        Discount_percent=0,
            //        Item_Description="הבמבה הכי כתומה שאכלתי אבר",
            //        User_id="Admin",
            //        Item_image="https://osemcat.signature-it.com//images/Fittings/osem-hq/Upload_Pictures/Prod_Pic/6919901/Custom/6919901_7290000066318_L.png",
            //        Id_type="AdminAdmin",
            //        //Tag_id=new List<int>{ },// insert into items_tags
            //        //New_tag=new Dictionary<int, string>{ {1,"orange" },{2,"sour" } }// insert into items_tags
            //        Tags= new List<Tag>()
            //        {
            //            new Tag{Tag_id="1",Tag_title="Orange" },
            //            new Tag{Tag_id="2",Tag_title="sour" }
            //        }
            //    },
            //    new Item(){
            //        Item_id="0002",
            //        Receipt_id="0001",
            //        Item_title="Doritos",
            //        Price=7.52,
            //        Discount_dollar=0.5,
            //        Discount_percent=30,
            //        Item_Description="הדוריטוס הכי ירוק שאכלתי אבר",
            //        User_id="Admin",
            //        Item_image="https://www.strauss-group.co.il/wp-content/blogs.dir/1/files/Sweet_Sour3-1.jpg",
            //        Id_type="AdminAdmin",
            //        Tags= new List<Tag>()
            //        {
            //            new Tag{Tag_id="2" },
            //            new Tag{Tag_id="3",Tag_title="green" },
            //            new Tag{Tag_id="4",Tag_title="Food" }
            //        }// insert into items_tags
            //        //New_tag=new Dictionary<int, string>{{3,"green"},{4, "Food"}}// insert into items_tags
            //    },
            //    new Item(){
            //        Item_id="0003",
            //        Receipt_id="0001",
            //        Item_title="Magnum",
            //        Price=14.3,
            //        Discount_dollar=0,
            //        Discount_percent=0,
            //        Item_Description="הטילון הכי לבן שאכלתי אבר",
            //        User_id="Admin",
            //        Item_image="https://glidatstrauss.co.il/wp-content/uploads/2019/06/7290107649858-1.png",
            //        Id_type="AdminAdmin",
            //        Tags= new List<Tag>
            //        {
            //            new Tag {Tag_id="4"},
            //            new Tag{Tag_id="5",Tag_title="white" },
            //            new Tag{Tag_id="6",Tag_title="Sweet" },
            //        }
            //        //Tag_id=new List<int>{4, },// insert into items_tags
            //        //New_tag=new Dictionary<int, string>{{5,"White"},{6,"sweet"}}// insert into items_tags
            //    }
            //};
            #endregion
            #region Receipt
            //Receipt receipt1 = new Receipt()
            //{
            //    Receipt_id = "0001",
            //    User_id = "admin@admin.com",
            //    Date = new DateTime(2020, 01, 01),
            //    Receipt_Description = "הקניה הכי טעימה שעשיתי אבר",
            //    Discount_dollar = 3,
            //    Discount_percent = 10,
            //    Items = items,
            //    Store = new Store() { Store_id = "0001", Store_name = "כלבו אשדות", Lat = 32.658456, Lon = 35.580300 }
            //};
            #endregion

            return repo.AddReceipt(receipt);

        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
        public string FixBase64ForImage(string Image)
        {
            System.Text.StringBuilder sbText = new System.Text.StringBuilder(Image, Image.Length);
            sbText.Replace("\r\n", String.Empty); sbText.Replace(" ", String.Empty);
            return sbText.ToString();
        }
    }
}