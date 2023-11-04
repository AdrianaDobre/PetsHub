using Common;
using System;
using System.Collections.Generic;

namespace DataAccess.Entities
{
    public partial class Pet : IEntity
    {
        public Pet()
        {
            Listings = new HashSet<Listing>();
        }

        public short Id { get; set; }
        public string Pet1 { get; set; } = null!;

        public virtual ICollection<Listing> Listings { get; set; }
    }
}
