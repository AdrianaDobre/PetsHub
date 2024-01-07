using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Implementation.ListingImp.Models
{
    public class AddListingModel
    {
        public int PetId { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        //public DateTime Date { get; set; }
        public decimal Price { get; set; }
        public int Time { get; set; }
    }
}
