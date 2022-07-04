using Prices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prices.BLL.Repository_Interfaces
{
    public interface IListsRepository
    {
        IEnumerable<Tag> GetAllTags();
        IEnumerable<Category> GetAllCategories();
        IEnumerable<SubCategory> GetAllSubCategories();
        IEnumerable<Item> GetUserFavoriteItems(User user);
        IEnumerable<Store> GetAllStores();
        IEnumerable<string> GetAllUsersEmails();
    }
}
