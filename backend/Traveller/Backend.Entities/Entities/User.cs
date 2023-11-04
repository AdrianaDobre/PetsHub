using Common;
using System;
using System.Collections.Generic;

namespace DataAccess.Entities
{
    public partial class User : IEntity
    {
        public User()
        {
            ListingAcceptedUsers = new HashSet<Listing>();
            ListingCreatorUsers = new HashSet<Listing>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string? LocationName { get; set; }
        public decimal? LocationLatitude { get; set; }
        public decimal? LocationLongitude { get; set; }
        public Guid? PhotoId { get; set; }
        public bool IsGoogle { get; set; }
        public bool IsDeleted { get; set; }
        public string? GoogleId { get; set; }
        public string HashedPassword { get; set; } = null!;

        public virtual Photo? Photo { get; set; }
        public virtual ICollection<Listing> ListingAcceptedUsers { get; set; }
        public virtual ICollection<Listing> ListingCreatorUsers { get; set; }
    }
}
