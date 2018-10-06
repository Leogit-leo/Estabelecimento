using Estabelecimento.Helpers;
using Estabelecimento.Modelo;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;


namespace Estabelecimento.Controllers
{
    public class GerenciadorController : Controller
    {
        string cnx = Properties.Settings.Default.str_cnx;

        public ActionResult Index(int categoria)
        {
            List<clsEstabelecimento> estabelecimentos = new List<clsEstabelecimento>();


            using(Contexto c = new Contexto(cnx))
            {
                estabelecimentos = (from e in
                   c.ExecuteQuery<clsEstabelecimento>("select * from [dbo].[Estabelecimento] where id_categoria =" + categoria).AsEnumerable()

                                    select new clsEstabelecimento
                                    {
                                        id_estabelecimento = e.id_estabelecimento,
                                        razao_social = e.razao_social,
                                        nome_fantasia = e.nome_fantasia,
                                        cnpj = e.cnpj,
                                        email = e.email,
                                        endereco = e.endereco,
                                        id_cidade = e.id_cidade,
                                        id_estado = e.id_estado,
                                        id_categoria = e.id_categoria,

                                        telefone = e.telefone,
                                        data_cadastro = e.data_cadastro,

                                        status = e.status,
                                        agencia = e.agencia,
                                        conta = e.conta,

                                        cidade = (
                                                        from cid in (c.ExecuteQuery<clsCidade>("select * from [dbo].[Cidade] where id_cidade =" +"'"+ e.id_cidade + "'" ).ToList())

                                                        select new clsCidade
                                                        {
                                                            id_cidade = cid.id_cidade,
                                                            nome_municipio = cid.nome_municipio
                                                        }

                                            ).FirstOrDefault(),

                                        estado = (
                                                        from est in (c.ExecuteQuery<clsEstado>("select * from [dbo].[Estado] where id_estado =" + "'" + e.id_estado + "'" ).ToList())

                                                        select new clsEstado
                                                        {
                                                            id_estado = est.id_estado,
                                                            nome = est.nome
                                                        }

                                            ).FirstOrDefault(),

                                        categoria = (
                                                        from cat in (c.ExecuteQuery<clsCategoria>("select * from [dbo].[Categoria] where id_categoria =" + "'" + e.id_categoria + "'").ToList())

                                                        select new clsCategoria
                                                        {
                                                            id_categoria = cat.id_categoria,
                                                            categoria = cat.categoria
                                                        }

                                            ).FirstOrDefault()

                                    }

                ).OrderByDescending(x => x.data_cadastro).ToList();

            }
            
            return View(estabelecimentos);
        }


        public PartialViewResult Editar(int id)
        {
            clsEstabelecimento estabelecimento = new clsEstabelecimento();
            List<clsCategoria> categorias = new List<clsCategoria>();
            List<clsEstado> estados = new List<clsEstado>();
            List<clsCidade> cidades = new List<clsCidade>();

            using (Contexto c = new Contexto(cnx))
            {
                estabelecimento = c.ExecuteQuery<clsEstabelecimento>("select * from [dbo].[Estabelecimento] where id_estabelecimento =" + id).FirstOrDefault();
                categorias = c.ExecuteQuery<clsCategoria>("select * from [dbo].[Categoria]").ToList();
                estados = c.ExecuteQuery<clsEstado>("select * from dbo.Estado").ToList();
                cidades = c.ExecuteQuery<clsCidade>("select * from [dbo].[Cidade]").ToList();

                c.Connection.Close();
                c.Connection.Dispose();
            }

            ViewBag.Categorias = categorias;
            ViewBag.Estados = estados;
            ViewBag.Cidades = cidades;


            return PartialView(estabelecimento);
        }


        [HttpPost]
        public JsonResult Editar(clsEstabelecimento estabelecimento)
        {
            retornoJson ret = new retornoJson();
            int retorno;

            //Validações
            if (string.IsNullOrWhiteSpace(estabelecimento.razao_social))
                ret.Mensagem += "Razão Social é um campo obrigatorio <br/>";

            if (string.IsNullOrWhiteSpace(estabelecimento.cnpj))
                ret.Mensagem += "CNPJ é um campo obrigatorio <br/>";

            if (estabelecimento.id_categoria == 0)
                ret.Mensagem += "Selecione a categoria <br/>";

            if (estabelecimento.id_categoria == 1)
            {
                if (string.IsNullOrWhiteSpace(estabelecimento.telefone))
                    ret.Mensagem += "Para a categoria SUPERMERCADO o telefone passa a ser obrigatorio. <br/>";
            }

            if (!string.IsNullOrWhiteSpace(estabelecimento.email))
            {
                if (Funcoes.IsEmail(estabelecimento.email) != true)
                    ret.Mensagem += "Formato de e-mail invalido. Use um e-mail valido. ex: meuEmail@meuServidor.com <br/>";

            }

            if (ret.Mensagem != null && ret.Mensagem != "")
                return Json(ret, JsonRequestBehavior.AllowGet);

            using (Contexto c = new Contexto(cnx))
            {
              retorno =  c.ExecuteCommand("[dbo].[estabelecimento_editar] {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12}",
                                estabelecimento.id_estabelecimento, /*obrigatorio*/
                                estabelecimento.razao_social, /*obrigatorio*/
                                string.IsNullOrWhiteSpace(estabelecimento.nome_fantasia) ? "" : estabelecimento.nome_fantasia,
                                estabelecimento.cnpj, /*obrigatorio*/
                                string.IsNullOrWhiteSpace(estabelecimento.email) ? "" : estabelecimento.email,
                                string.IsNullOrWhiteSpace(estabelecimento.endereco) ? "" : estabelecimento.endereco,
                                estabelecimento.id_cidade ,
                                estabelecimento.id_estado ,
                                string.IsNullOrWhiteSpace(estabelecimento.telefone) ? "" : estabelecimento.telefone,
                                estabelecimento.id_categoria, /*obrigatorio*/
                                estabelecimento.status ,
                                string.IsNullOrWhiteSpace(estabelecimento.agencia) ? "" : estabelecimento.agencia,
                                string.IsNullOrWhiteSpace(estabelecimento.conta) ? "" : estabelecimento.conta
                            );

                c.Connection.Close();
                c.Connection.Dispose();
            }

            if (retorno == -1)
            {
                ret.Mensagem = "Este CNPJ ou este E-mail já esta cadastrado";
                ret.sucesso = false;
            }
            else if (retorno > 0)
            {
                ret.Mensagem = "Cadastrado com sucesso";
                ret.sucesso = true;
            }
            else
            {
                ret.Mensagem = "Não foi possivel realizar o cadastro";
                ret.sucesso = false;
            }

            return Json(ret, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult Excluir(int id_estabelecimento)
        {
            retornoJson ret = new retornoJson();
            int retorno;

            using(Contexto c = new Contexto(cnx))
            {
                retorno = c.ExecuteCommand("delete from [dbo].[Estabelecimento] where id_estabelecimento ="+ id_estabelecimento);
            }

            if(retorno == 1)
            {
                ret.Mensagem = "Estabelecimento excluido";
                ret.sucesso = true;
            }else
            {
                ret.Mensagem = "Ocorreu uma falha";
                ret.sucesso = false;
            }

            return Json(ret, JsonRequestBehavior.AllowGet);
        }


    }
}