
    function validaForm() {
        //var RazaoSocial = FormCadastro.razao_social.value;
        //var NomeFantasia = FormCadastro.nome_fantasia.value;
        //var Cnpj = FormCadastro.cnpj.value;
        //var Endereco = FormCadastro.endereco.value;
        //var Cidade = FormCadastro.id_cidade.value;
        //var Estado = FormCadastro.id_estado.value;
        //var Telefone = FormCadastro.telefone.value;
        //var Email = FormCadastro.email.value;
        //var Categoria = FormCadastro.id_categoria.value;
        //var Status = FormCadastro.status.value;
        //var Agencia = FormCadastro.agencia.value;
        //var Conta = FormCadastro.conta.value;

        var objeto ={
            razao_social: FormCadastro.razao_social.value,
            nome_fantasia: FormCadastro.nome_fantasia.value,
            Cnpj : FormCadastro.cnpj.value,
            Endereco : FormCadastro.endereco.value,
            id_cidade: FormCadastro.id_cidade.value,
            id_estado: FormCadastro.id_estado.value,
            Telefone : FormCadastro.telefone.value,
            Email : FormCadastro.email.value,
            id_categoria: FormCadastro.id_categoria.value,
            Status : FormCadastro.status.value,
            Agencia : FormCadastro.agencia.value,
            Conta : FormCadastro.conta.value
        }


        $.ajax({
            type: 'post',
            url: "http://" +window.location.host +"/Home/Cadastrar",
            data:{'estabelecimento':objeto},
        success: function (data) {
            if (data.sucesso == true) {
                limpaForm();
                alert(data.Mensagem);
            }
            else {
                alert(data.Mensagem);
            }
        },
        error: function () {
            alert("Erro ao tentar cadastrar");
        }
    });

}
    

function limpaForm() {
    //limpa o formulário

    FormCadastro.razao_social.value = "";
    FormCadastro.nome_fantasia.value = "";
    FormCadastro.cnpj.value = "";
    FormCadastro.endereco.value = "";
    FormCadastro.id_cidade.value = 0;
    FormCadastro.id_estado.value = 0;
    FormCadastro.telefone.value = "";
    FormCadastro.email.value = "";
    FormCadastro.id_categoria.value = 0;
    FormCadastro.status.value = "";
    FormCadastro.agencia.value = "";
    FormCadastro.conta.value = "";
}


















