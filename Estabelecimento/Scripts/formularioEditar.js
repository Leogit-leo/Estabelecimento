

    function ValidaFormEditar(){
        var objeto = {
            id_estabelecimento: FormEditar.id_estabelecimento.value,
            razao_social: FormEditar.razao_social.value,
            nome_fantasia: FormEditar.nome_fantasia.value,
            Cnpj: FormEditar.cnpj.value,
            Endereco: FormEditar.endereco.value,
            id_cidade: FormEditar.id_cidade.value,
            id_estado: FormEditar.id_estado.value,
            Telefone: FormEditar.telefone.value,
            Email: FormEditar.email.value,
            id_categoria: FormEditar.id_categoria.value,
            Status: FormEditar.status.value,
            Agencia: FormEditar.agencia.value,
            Conta: FormEditar.conta.value
        }


        $.ajax({
            type: 'post',
            url: "http://" + window.location.host + "/Gerenciador/Editar",
            data: { 'estabelecimento': objeto },
            success: function (data) {
                if (data.sucesso == true) {
                    alert(data.Mensagem);
                    $('#exampleModal').modal('hide');
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


