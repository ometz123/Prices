using Prices.BLL.ItemEntity;
using Prices.BLL.ListsEntity;
using Prices.BLL.ReceiptEntity;
using Prices.BLL.Repository_Interfaces;
using Prices.BLL.UserEntity;
using System.Web.Http;
using Unity;
using Unity.WebApi;

namespace Prices
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();

            //MY
            container.RegisterType<IItemRepository, SQLItemRepository>();
            container.RegisterType<IReceiptRepository, SQLReceiptRepository>();
            container.RegisterType<IUserRepository, SQLUserRepository>();
            container.RegisterType<IListsRepository, SQLListsRepository>();
            //MY

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}