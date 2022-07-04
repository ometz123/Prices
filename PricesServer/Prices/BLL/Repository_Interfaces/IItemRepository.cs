using Prices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prices.BLL.Repository_Interfaces
{
    public interface IItemRepository
    {
        IEnumerable<Item> GetAllItems();
        IEnumerable<Item> GetResults(Search<Item> search);
        Item GetItemById(int id);
        Item AddItem(Item item);
        Item UpdateItem(int id, Item item);
        bool DeleteItem(Item item);
    }
}
