using Common;
using System;
using System.Collections.Generic;

namespace DataAccess.Entities
{
    public partial class Photo : IEntity
    { 
        public Photo()
        {
            Listings = new HashSet<Listing>();
            Users = new HashSet<User>();
        }

        public Guid Id { get; set; }
        public string Path { get; set; } = null!;

        public virtual ICollection<Listing> Listings { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
