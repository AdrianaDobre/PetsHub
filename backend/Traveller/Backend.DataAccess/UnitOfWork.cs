using Common;
using DataAccess.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Entities;

namespace DataAccess
{
    public class UnitOfWork
    {
        private readonly PetsHubContext Context;

        public UnitOfWork(PetsHubContext context)
        {
            Context = context;
        }

        private IRepository<User> users;
        public IRepository<User> Users => users ?? (users = new BaseRepository<User>(Context));

        public async Task SaveChangesAsync()
        {
            await Context.SaveChangesAsync();
        }
    }
}
