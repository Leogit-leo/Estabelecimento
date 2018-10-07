

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

        //ao editar é passado o nome da categoria para carregar dinamicamente os dados editados
        //nomeCategora = document.querySelector('#campo_categoria').textContent.toLowerCase();
       
        var nomeCategora = "";
        var id_cat = FormEditar.id_categoria.value;

        console.log(id_cat);

        switch (id_cat) {

            case '1':
                nomeCategora = 'supermercado'
                break;
            case '2':
                nomeCategora = 'restaurante'
                break;
            case '3':
                nomeCategora = 'borracharia'
                break;
            case '4':
                nomeCategora = 'posto'
                break;
            case '5':
                nomeCategora = 'oficina'
                break;

            default:
                break;
        }

        
        console.log(nomeCategora);
        
        $.ajax({
            type: 'post',
            url: "http://" + window.location.host + "/Gerenciador/Editar",
            data: { 'estabelecimento': objeto },
            success: function (data) {
                if (data.sucesso == true) {
                    alert(data.Mensagem);
                    $('#exampleModal').modal('hide');

                    CarregarDinamico(nomeCategora, FormEditar.id_categoria.value);
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


