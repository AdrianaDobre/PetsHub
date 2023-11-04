using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTOs
{
    public class CurrentUserDTO
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Name { get; set; }
        public bool IsAuthenticated { get; set; }

        public string? Photo { get; set; }
        //public string PhotoId { get; set; }
        //public string PhotoPath { get; set; }

        public static implicit operator Guid(CurrentUserDTO v)
        {
            throw new NotImplementedException();
        }
    }
}
