using Estabelecimento.Modelo;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Estabelecimento.Helpers;

namespace Estabelecimento.Controllers
{
    public class HomeController : Controller
    {
        string cnx = Properties.Settings.Default.str_cnx;

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Cadastrar()
        {
            //Popular DropDown Categorias,Estados
            List<clsCategoria> categorias = new List<clsCategoria>();
            List<clsEstado> estados = new List<clsEstado>();
            List<clsCidade> cidades = new List<clsCidade>();

            using (Contexto c = new Contexto(cnx))
            {
                categorias = c.ExecuteQuery<clsCategoria>("select * from [dbo].[Categoria]").ToList();
                estados = c.ExecuteQuery<clsEstado>("select * from dbo.Estado").ToList();
                cidades = c.ExecuteQuery<clsCidade>("select * from [dbo].[Cidade]").ToList();

                c.Connection.Close();
                c.Connection.Dispose();
            }

            ViewBag.Categorias = categorias;
            ViewBag.Estados = estados;
            ViewBag.Cidades = cidades;

            return View();
        }

        [HttpPost]
        public JsonResult Cadastrar(clsEstabelecimento estabelecimento)
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
                        
            if(estabelecimento.id_categoria == 1)
            {
                if (string.IsNullOrWhiteSpace(estabelecimento.telefone))
                    ret.Mensagem += "Para a categoria SUPERMERCADO o telefone passa a ser obrigatorio. <br/>";
            }

            if (!string.IsNullOrWhiteSpace(estabelecimento.email))
            {
                if(Funcoes.IsEmail(estabelecimento.email) != true)
                    ret.Mensagem += "Formato de e-mail invalido. Use um e-mail valido. ex: meuEmail@meuServidor.com <br/>";

            }
                            

            if (ret.Mensagem != null && ret.Mensagem != "")
                return Json(ret, JsonRequestBehavior.AllowGet);


            using (Contexto c = new Contexto(cnx))
            {
               retorno = c.ExecuteCommand("[dbo].[estabelecimento_set] {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11}",
                                                                        estabelecimento.razao_social, /*obrigatorio*/
                                                                        string.IsNullOrWhiteSpace(estabelecimento.nome_fantasia)? "": estabelecimento.nome_fantasia,
                                                                        estabelecimento.cnpj,  /*obrigatorio*/
                                                                        string.IsNullOrWhiteSpace(estabelecimento.email)? "": estabelecimento.email,
                                                                        string.IsNullOrWhiteSpace(estabelecimento.endereco)? "": estabelecimento.endereco,
                                                                        estabelecimento.id_cidade, /*vem 0 por default*/
                                                                        estabelecimento.id_estado, /*vem 0 por default*/
                                                                        string.IsNullOrWhiteSpace(estabelecimento.telefone)?"": estabelecimento.telefone,
                                                                        estabelecimento.id_categoria, /*obrigatorio*/
                                                                        estabelecimento.status, /*vem ativo por default*/
                                                                        string.IsNullOrWhiteSpace(estabelecimento.agencia)?"": estabelecimento.agencia,
                                                                        string.IsNullOrWhiteSpace(estabelecimento.conta)?"": estabelecimento.conta
                                                                    );

                c.Connection.Close();
                c.Connection.Dispose();
            }

            if(retorno == -1)
            {
                ret.Mensagem ="Este CNPJ ou este E-mail já esta cadastrado";
                ret.sucesso = false;
            }
            else if (retorno > 0)
            {
                ret.Mensagem ="Cadastrado com sucesso";
                ret.sucesso = true;
            }else
            {
                ret.Mensagem ="Não foi possivel realizar o cadastro";
                ret.sucesso = false;
            }

            return Json(ret, JsonRequestBehavior.AllowGet);
            
        }


        

    }
}