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
    public class ListsController : ApiController
    {
        IListsRepository repo;
        public ListsController(IListsRepository ir) => repo = ir;

        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        //GET UsersEmail
        [Route("api/lists/GetAllUsersEmails")]
        public IEnumerable<string> GetAllUsersEmails()
        {
            return repo.GetAllUsersEmails();
        }
        //GET TAGS
        [Route("api/lists/GetTags")]
        public IEnumerable<Tag> GetTags()
        {
            return repo.GetAllTags();
        }
        //GET CATEGORIES
        [Route("api/lists/GetCategories")]
        public IEnumerable<Category> GetCategories()
        {
            return repo.GetAllCategories();
        }
        //GET SUB CATEGORIES
        [Route("api/lists/GetSubCategories")]
        public IEnumerable<SubCategory> GetSubCategories()
        {
            return repo.GetAllSubCategories();
        }
        //GET User Favorite Items
        [HttpPost]
        [Route("api/lists/GetUserFavoriteItems")]
        public IEnumerable<Item> GetUserFavoriteItems([FromBody] User user)
        {
            return repo.GetUserFavoriteItems(user);
        }
        //GET STORES
        [HttpGet]
        [Route("api/lists/GetStores")]
        public IEnumerable<Store> GetStores()
        {
            return repo.GetAllStores();
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
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