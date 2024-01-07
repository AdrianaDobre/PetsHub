using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Implementation.ListingImp.Models
{
    public class OfferModel
    {
        public Guid Id { get; set; }
        public Guid CreatorUserId { get; set; }
        public string CreatorName { get; set; }
        public short PetId { get; set; }
        public string PetType { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Time { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime Date { get; set; }
    }
}
