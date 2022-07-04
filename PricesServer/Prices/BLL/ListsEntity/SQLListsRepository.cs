using Prices.BLL.Repository_Interfaces;
using Prices.DAL.SQLConnection;
using Prices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Prices.BLL.ListsEntity
{
    public class SQLListsRepository : IListsRepository
    {
        DBServices db = new DBServices();

        public IEnumerable<Category> GetAllCategories()
        {
            return (List<Category>)db.SPGetAll(new Category());
        }

        public IEnumerable<Store> GetAllStores()
        {
            return (List<Store>)db.SPGetAll(new Store());
        }

        public IEnumerable<SubCategory> GetAllSubCategories()
        {
            return (List<SubCategory>)db.SPGetAll(new SubCategory());
        }

        public IEnumerable<Tag> GetAllTags()
        {
            return (List<Tag>)db.SPGetAll(new Tag());
        }

        public IEnumerable<string> GetAllUsersEmails()
        {
            return (List<string>)db.SPGetAll("UsersEmails");
        }

        public IEnumerable<Item> GetUserFavoriteItems(User user)
        {
            List<Item> favorites = new List<Item>();
            user.Favorites = (List<string>)db.SPGetById("favorites", "selectUserFavorites", user.User_id);

            foreach (string item_id in user.Favorites)
            {
                Item item = ((List<Item>)db.SPGetById(new Item(), "SelectByItemId", item_id)).FirstOrDefault();
                if (item != null)
                {
                    item.Tags = (List<Tag>)db.SPGetById(new Tag(), "SelectByItemId", item.Item_id);//Add tags for each item
                    favorites.Add(item);
                }
            }
            return favorites;
        }
    }
}