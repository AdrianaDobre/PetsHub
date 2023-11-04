using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Implementation.UserAccount.Models
{
    public class LogInModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public bool AreCredentialsInvalid { get; set; } = false;
    }
}
