using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Implementation.ListingImp.Models
{
    public class PetWithOwnerModel
    {
        public Guid OwnerId { get; set; }
        public string OwnerName { get; set; }
        public string PetType { get; set; }
        public string PetPhotoPath { get; set; } = null!;
        public DateTime Date { get; set; }
        public decimal Price { get; set; }
        public int Time { get; set; }
    }
}
