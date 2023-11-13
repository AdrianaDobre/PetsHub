using Common;
using System;
using System.Collections.Generic;

namespace DataAccess.Entities
{
    public partial class Listing : IEntity
    {
        public Guid Id { get; set; }
        public Guid CreatorUserId { get; set; }
        public Guid? AcceptedUserId { get; set; }
        public short PetId { get; set; }
        public string Description { get; set; } = null!;
        public bool? Status { get; set; }
        public Guid? PetPhotoId { get; set; }
        public DateTime Date { get; set; }
        public decimal Price { get; set; }
        public int Time { get; set; }
        public bool Type { get; set; } // false = host; true = owner
        public string Title { get; set; } = null!;

        public virtual User? AcceptedUser { get; set; }
        public virtual User CreatorUser { get; set; } = null!;
        public virtual Pet Pet { get; set; } = null!;
        public virtual Photo PetPhoto { get; set; } = null!;
    }
}
