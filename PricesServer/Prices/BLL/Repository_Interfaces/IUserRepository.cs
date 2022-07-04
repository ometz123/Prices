using Prices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prices.BLL.Repository_Interfaces
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAllUsers();
        User GetUserById(string id);
        User AddUser(User user);
        User UpdateUser(User user2Update);
        bool DeleteUser(User user);
        User Login(string id, string password);
        User SignUp(User newUser);
        void UpdateFavorites(User user);
        IEnumerable<Item> GetReceipts2verify(User user);
        bool SetReceiptStatus(Receipt receipt);
        bool ForgotPassword(string userId);
    }
}
