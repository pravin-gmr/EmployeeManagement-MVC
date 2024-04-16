using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BO.Common
{
    public class BOResponse
    {
        public int Response_Status { get; set; }
        public string Message { get; set; }
        public string Error_Message { get; set; }
    }
}
