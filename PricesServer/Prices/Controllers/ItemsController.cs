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
    public class ItemsController : ApiController
    {
        IItemRepository repo;
        public ItemsController(IItemRepository ir) => repo = ir;

        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            //return repo.GetAllItems();
            return new string[] { "value1", "value2" };
        }
        [HttpPost]
        [Route("api/items/GetItemsForSearch")]
        public IEnumerable<Item> GetItemsForSearch([FromBody]Search<Item> search)
        {
            if (search.OverPriceRange)
            {
                search.Max_price = -1;//
            }
            search.User.Lat = 32.659893;
            search.User.Lon = 35.580975;
            
            search.Statement_Type = "select";
            search.Model = new Item();
            return repo.GetResults(search);
            //return repo.GetResults(new Search<Item>()
            //{
            //    User = new User() { Lat = 32.342234, Lon = 34.912419 },
            //    Distance_radius = 72,
            //    Model = new Item(),
            //    Max_price = 200,
            //    Min_price = 6,
            //    Statement_Type = "select"
            //});
            //return new string[] { "value1", "value2" };
        }
        // GET api/<controller>/5
        public string Get1(int id)
        {
            return "value "+id;
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {

        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}