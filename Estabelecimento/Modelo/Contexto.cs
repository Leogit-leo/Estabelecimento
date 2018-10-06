using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Web;

namespace Estabelecimento.Modelo
{
    public class Contexto : DataContext
    {
        public Contexto(string cnx):base(cnx)
        {

        }
    }
}