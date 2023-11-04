using Common.DTOs;
using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace BusinessLogic.Base
{
    public class BaseService
    {
        //protected readonly IMapper Mapper;
        protected readonly UnitOfWork UnitOfWork;
        protected readonly CurrentUserDTO CurrentUser;
        public string AvatarFilePath = @"C:\Users\strat\source\repos\MontaniersBachelor\Frontend\public\PozeProiect";

        public BaseService(ServiceDependencies serviceDependencies)
        {
            //Mapper = serviceDependencies.Mapper;
            UnitOfWork = serviceDependencies.UnitOfWork;
            CurrentUser = serviceDependencies.CurrentUser;
        }

        protected TResult ExecuteInTransaction<TResult>(Func<UnitOfWork, TResult> func)
        {
            if (func == null)
            {
                throw new ArgumentNullException(nameof(func));
            }

            using (var transactionScope = new TransactionScope())
            {
                var result = func(UnitOfWork);

                transactionScope.Complete();

                return result;
            }
        }

        protected void ExecuteInTransaction(Action<UnitOfWork> action)
        {
            if (action == null)
            {
                throw new ArgumentNullException(nameof(action));
            }

            using (var transactionScope = new TransactionScope())
            {
                action(UnitOfWork);

                transactionScope.Complete();
            }
        }
        protected async Task ExecuteInTransactionAsync(Func<UnitOfWork, Task> action)
        {
            if (action == null)
            {
                throw new ArgumentNullException(nameof(action));
            }
            var opts = new TransactionOptions
            {
                IsolationLevel = IsolationLevel.ReadCommitted,
                Timeout = TimeSpan.FromMinutes(15)
            };
            using (var transactionScope = new TransactionScope(TransactionScopeOption.RequiresNew, opts, TransactionScopeAsyncFlowOption.Enabled))
            {
                await action(UnitOfWork);
                transactionScope.Complete();
            }
        }
        protected async Task<TResult> ExecuteInTransactionAsync<TResult>(Func<UnitOfWork, Task<TResult>> func)
        {
            if (func == null)
            {
                throw new ArgumentNullException(nameof(func));
            }
            var opts = new TransactionOptions
            {
                IsolationLevel = IsolationLevel.ReadCommitted,
                Timeout = TimeSpan.FromMinutes(15)
            };
            TResult result = default;
            using (var transactionScope = new TransactionScope(TransactionScopeOption.RequiresNew, opts, TransactionScopeAsyncFlowOption.Enabled))
            {
                result = await func(UnitOfWork).ConfigureAwait(false);
                transactionScope.Complete();
            }
            return result;
        }
    }
}
