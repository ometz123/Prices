using Prices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prices.BLL.Repository_Interfaces
{
    public interface IReceiptRepository
    {
        IEnumerable<Receipt> GetAllReceipts();
        Receipt GetReceiptById(string id);
        Receipt AddReceipt(Receipt receipt);
        Receipt UpdateReceipt(string id, Item receipt);
        bool DeleteReceipt(Receipt receipt);
    }
}
