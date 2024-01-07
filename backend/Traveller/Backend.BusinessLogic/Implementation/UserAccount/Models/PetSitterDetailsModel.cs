using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Implementation.UserAccount.Models
{
    public class PetSitterDetailsModel
    {
        public Guid Id { get; set; }
        public Guid ListingId { get; set; }
        public string Name { get; set; }
        public string LocationName { get; set; }
        public decimal LocationLatitude { get; set; }
        public decimal LocationLongitude { get; set; }
        public string PetType { get; set; }
        public string  Title { get; set; }
        public int Time { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string PhoneNumber { get; set; }
    }
}
