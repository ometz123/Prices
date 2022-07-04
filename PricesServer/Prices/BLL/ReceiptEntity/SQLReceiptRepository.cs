using Prices.BLL.Repository_Interfaces;
using Prices.BLL.UserEntity;
using Prices.DAL.SQLConnection;
using Prices.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;

namespace Prices.BLL.ReceiptEntity
{
    public class SQLReceiptRepository : IReceiptRepository
    {
        DBServices db = new DBServices();
        public Receipt AddReceipt(Receipt receipt)
        {

            if (!(receipt.Store.Store_name == null || receipt.Store.Store_name == ""))
            {
                receipt.Store.Store_id = Guid.NewGuid().ToString("N");
                db.InsertToDB(receipt.Store);//insert new store
            }
            receipt.Receipt_id = Guid.NewGuid().ToString("N");
            receipt.Receipt_image = Image64BaseToURL(receipt.Receipt_image, receipt.Receipt_id);
            User user = new User();
            user.UpdateUserRank(receipt);
            receipt.Receipt_rank = user.User_rank;
            //db.SPUpdate(user);
            db.InsertToDB(receipt);//insert receipt
            HandleReceiptItems(receipt);

            return receipt;
        }

        private void HandleReceiptItems(Receipt receipt)
        {
            for (int i = 0; i < receipt.Items.Count; i++)//insert each item
            {
                receipt.Items[i].Item_id = Guid.NewGuid().ToString("N");
                if (receipt.Items[i].Id_type == "UserUser")//check if the item is from external api (UserUser or src). if external, Item_image is an src and not base64
                {
                    receipt.Items[i].Item_image = Image64BaseToURL(receipt.Items[i].Item_image, receipt.Items[i].Item_id);
                }
                receipt.Items[i].Receipt_id = receipt.Receipt_id;
                receipt.Items[i].User_id = receipt.User_id;
                Category c = ((List<Category>)db.SPGetById(new Category(), "SelectByTitle", receipt.Items[i].Category.Category_title)).FirstOrDefault();
                if (c!=null)
                {

                }
                if (receipt.Items[i].Category.Category_title != null)
                {
                    receipt.Items[i].Category.Category_id = Guid.NewGuid().ToString("N");
                    db.InsertToDB(receipt.Items[i].Category);
                }
                if (receipt.Items[i].Sub_category.Sub_category_title != null)
                {
                    receipt.Items[i].Sub_category.Sub_category_id = Guid.NewGuid().ToString("N");
                    db.InsertToDB(receipt.Items[i].Sub_category);
                }
                db.InsertToDB(receipt.Items[i]);

                for (int j = 0; j < receipt.Items[i].Tags.Count; j++)//insert each tag for each item
                {
                    if (receipt.Items[i].Tags[j].Tag_title != null)//insert new tag to tags_tbl
                    {
                        receipt.Items[i].Tags[j].Tag_id = Guid.NewGuid().ToString("N");
                        db.InsertToDB(receipt.Items[i].Tags[j]);
                        receipt.Items[i].Tags[j--].Tag_title = null;
                    }
                    else// insert to items_tags_tbl
                    {
                        receipt.Items[i].Tags[j].Item_id = receipt.Items[i].Item_id;
                        db.InsertToDB(receipt.Items[i].Tags[j]);
                    }
                }
            }
        }

        private string Image64BaseToURL(string base64, string fileName)
        {
            try
            {
                string serverPath = HttpContext.Current.Server.MapPath("~/UploadedFiles");
                //data:image/jpeg;base64,/9j/4AAQSkZJ
                int pFrom = base64.IndexOf("data:image/") + "data:image/".Length;
                int pTo = base64.IndexOf(";");
                string type = base64.Substring(pFrom, pTo - pFrom);

                base64 = base64.Substring(base64.IndexOf(",") + 1);

                //Image image = Image.FromStream(new MemoryStream(Convert.FromBase64String(base64)));
                string imageServerPath = serverPath + "/" + fileName + "." + type;
                File.WriteAllBytes(imageServerPath, Convert.FromBase64String(base64));
                //image.Save(imageServerPath, ImageFormat.Jpeg);
                string imageURL = "http://proj.ruppin.ac.il/bgroup4/prod/server/UploadedFiles/" + fileName + "." + type;
                return imageURL;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public bool DeleteReceipt(Receipt receipt)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Receipt> GetAllReceipts()
        {
            throw new NotImplementedException();
        }

        public Receipt GetReceiptById(string id)
        {
            throw new NotImplementedException();
        }
        public Receipt UpdateReceipt(string id, Item receipt)
        {
            throw new NotImplementedException();
        }
    }
}