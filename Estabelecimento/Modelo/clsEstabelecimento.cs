using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Estabelecimento.Modelo
{
    public class clsEstabelecimento
    {
        public int id_estabelecimento { get; set; }
        public string razao_social { get; set; }
        public string nome_fantasia { get; set; }
        public string cnpj { get; set; }
        public string email { get; set; }
        public string endereco { get; set; }

        public int? id_cidade { get; set; }
        public int? id_estado { get; set; }
        public int id_categoria { get; set; }

        public string telefone { get; set; }
        public DateTime? data_cadastro { get; set; }
       
        public int status { get; set; }
        public string agencia { get; set; }
        public string conta { get; set; }

        public clsCidade cidade { get; set; }
        public clsEstado estado { get; set; }
        public clsCategoria categoria { get; set; }

        public clsEstabelecimento()
        {
            cidade = new clsCidade();
            estado = new clsEstado();
            categoria = new clsCategoria();
        }

    }

    public class clsCategoria
    {
        public int? id_categoria { get; set; }
        public string categoria { get; set; }
    }

    public class clsEstado
    {
        public int? id_estado { get; set; }
        public string nome { get; set; }
    }

    public class clsCidade
    {
        public int? id_cidade { get; set; }
        public string nome_municipio { get; set; }
    }

    public class retornoJson
    {
        public bool sucesso { get; set; }
        public string Mensagem { get; set; }

    }
}