using Prices.BLL.Repository_Interfaces;
using Prices.DAL.SQLConnection;
using Prices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Configuration;

namespace Prices.BLL.UserEntity
{
    public class SQLUserRepository : IUserRepository
    {
        DBServices db = new DBServices();
        readonly string logoURL = "http://proj.ruppin.ac.il/bgroup4/prod/server/UploadedFiles/PricesLogo.png";

        public User AddUser(User user)
        {
            //user.User_rank = 1000;
            throw new NotImplementedException();
        }

        public bool DeleteUser(User user)
        {
            throw new NotImplementedException();
        }

        public bool ForgotPassword(string userId)
        {
            User user = ((List<User>)db.SPGetById(new User(), "SelectByUserId", userId)).FirstOrDefault();
            if (user != null)
            {
                user.Password = Guid.NewGuid().ToString("N").Substring(0, 8);
                user.Field2update = "password";
                db.SPUpdateUserProfile(user);
                //string s = user.Gender ? "Mr." : "Mrs.";
                string title = "\"Prices\" Reset Password";
                //string image = $"<img src='{logoURL}' alt='logo' height='150' block;='' margin-left:='' auto;='' margin-right:= '' style=''/>";
                string s = $@"
                <div style='text-align: center; background-color: #282c34;'>
                    <h2 style='color: #fcaf17;'> 
                        Dear {(user.Gender ? "Mr." : "Mrs.")} {user.First_name}
                    </h2>
                        <p style='color: #fcaf17;'>
                            We received a request to reset your Prices password.
                        </p>
                    <p style='color: #fcaf17;'>
                        Here is your new password:     
                    </p>
                    <p style ='color: red;'> 
                        {user.Password}
                    </p>   
                    <a href='http://proj.ruppin.ac.il/bgroup4/prod/client/'>
                        Prices
                    </a>
                </div>";
                SendMail(userId, title, s);
                return true;
            }
            else
            {

                return false;
            }
        }
        private void SendMail(string toAddress, string mailTitle, string mailBody)
        {
            string password = WebConfigurationManager.AppSettings["EmailPassword"];
            var smtp = new SmtpClient
            {
                Host = "Smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential("rupbgroup4@gmail.com", password)
            };

            using (var mailMessage = new MailMessage("rupbgroup4@gmail.com", toAddress)
            {
                IsBodyHtml = true,
                Subject = mailTitle,
                Body = mailBody,
            })
                try
                {
                    smtp.Send(mailMessage);
                }
                catch (Exception exp)
                {
                    throw new Exception($"something went wrong in sendMail method: \n {exp.Message}");
                }
        }
        public IEnumerable<User> GetAllUsers()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Item> GetReceipts2verify(User user)
        {
            List<Item> results = (List<Item>)db.SPGetResults(new Search<Item>()
            {
                Model = new Item(),
                Statement_Type = "verifyReceipts",
                User = user,
            });
            for (int i = 0; i < results.Count; i++)
            {
                results[i].Tags = (List<Tag>)db.SPGetById(new Tag(), "SelectByItemId", results[i].Item_id);//Add tags for each item
            }

            return results;
        }

        public User GetUserById(string id)
        {
            throw new NotImplementedException();
        }

        public User Login(string id, string password)
        {
            //User u = (User)db.SPGetById(new User(), "SelectByUserId", id) as User;
            List<User> u = db.SPGetById(new User(), "SelectByUserId", id) as List<User>;
            if (u.Count == 1)
            {
                u[0].Favorites = (List<string>)db.SPGetById("favorites", "selectUserFavorites", u[0].User_id);
                User user = u[0];
                return user.Password == password ? user : new User();
            }
            return new User();
        }

        public bool SetReceiptStatus(Receipt receipt)
        {
            db.SPUpdate(receipt);
            Receipt r = ((List<Receipt>)db.SPGetById(new Receipt(), "SelectByReceiptId", receipt.Receipt_id)).FirstOrDefault();
            if (r != null)
            {
                receipt.Receipt_rank = r.Receipt_rank;
                if (receipt.Status)
                {
                    db.SPUpdate(new User() { User_id = receipt.User_id, User_rank = receipt.Receipt_rank });
                }
            }
            return receipt.Status;
        }

        public User SignUp(User newUser)
        {
            db.InsertToDB<User>(newUser);
            return newUser;
            //throw new NotImplementedException();
        }

        public void UpdateFavorites(User user)
        {
            db.SPUpdateUserProfile(user);
        }

        public User UpdateUser(User user2Update)
        {//here
            db.SPUpdateUserProfile(user2Update);
            return user2Update;
        }
    }
}