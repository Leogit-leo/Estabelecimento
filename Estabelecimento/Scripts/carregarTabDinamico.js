
function CarregarDinamico(id,idCategoria) {
    //verificar se este id ja existe
    var existe = false;
    var ulTabDinamico = document.querySelector("#lista-tab-dinamico");
    //acessa todas as li de tab existentes
    var todasLi = ulTabDinamico.querySelectorAll("li");
    //entrar dentro de cada li, de todas as li criadas
    todasLi.forEach(
          function (currentValue, currentIndex, listObj) {
              //selecionar o href do a onde esta o link que é formado por um ID
              var tagA = currentValue.querySelector("a").getAttribute("href");
              //verifica se o ID passado é um que já existe
              if (tagA == "#" + id) {
                  //seta a variavel existe como true, ou seja já existe uma aba com este nome e id.
                  existe = true;
                  //se ja existir a aba ele apenas exibe o conteudo ativando a aba e o conteudo da aba.
                  var liClicada = currentValue;
                  //no caso da LI ter sido fechada pelo usuario para abrir novamente e removido a classe disp-none
                  //lembrando que currentValue representa a LI inteira
                  liClicada.classList.remove("disp-none");
                  // esta função recebe lista de li como parametro e retira a classe active de cada li.  
                  DesativaActiveAba(todasLi);
                  //ativa a aba que foi clicada
                  liClicada.classList.add("active");

                  var divTabContentPrincipal = document.querySelector("#conteudo-tab-content-dinamico");
                  //remove classe active da div tab content
                  removerClasseActiveDivTabContent(divTabContentPrincipal);

                  //ativa conteudo da aba clicada
                  var divContent = divTabContentPrincipal.querySelector("#" + id);
                  divContent.classList.add("in");
                  divContent.classList.add("active");
                  divContent.classList.remove("disp-none");
              }
          });

    //se o id da aba não existir ele cria a nova aba
    if (existe != true) {
        CriarNovaAbaSolicitadaNoTabs(id);
        CriarNovaDivTabContentNovoConteudo(id,idCategoria);
    } 
}

function CriarNovaDivTabContentNovoConteudo(idAba,idCategoria) {
    //seleciona a div do tab content onde contem as informacoes de cada aba
    var divTabContentPrincipal = document.querySelector("#conteudo-tab-content-dinamico");
    //remove a classe ativo da home e de todas as div ativa antes criar nova aba content
    removerClasseActiveDivTabContent(divTabContentPrincipal);
    //cria a div especifica para aba que esta sendo clicada no menu e seta as classes para funcionar dinamicamente
    var novaDiv = document.createElement("div");
    novaDiv.setAttribute('id', idAba);
    novaDiv.classList.add("tab-pane");
    novaDiv.classList.add("fade");
    novaDiv.classList.add("active");
    novaDiv.classList.add("in");


    //carregar conteudo referente a aba
    
    $.ajax({
        type:'get',
        //url: "http://localhost:50188/"+idAba+"/Index",
        url: "http://" + window.location.host + "/Gerenciador/Index?categoria=" + idCategoria, //passar o data referente a categoria
        beforeSend: function () {
            $("#imgLoad").removeClass("disp-none");
        },
        success: function (data) {
            $("#imgLoad").addClass("disp-none");
            novaDiv.innerHTML = data;
        },
        error: function () {
            novaDiv.innerHTML = "<h1>Conteudo indisponível</h1>";
        }
    });

    divTabContentPrincipal.appendChild(novaDiv);
}

function CriarNovaAbaSolicitadaNoTabs(idAba) {

    //esta variavel seleciona a tabs principal que contem apenas a aba home
    var ulTabsPrincipal = document.querySelector("#lista-tab-dinamico");

    //selecionar todos outras aba e deixar inativa
    var todasAbas = ulTabsPrincipal.querySelectorAll("li");

    // esta função recebe lista de li como parametro e retira a classe active de cada li. 
    DesativaActiveAba(todasAbas);

    //novo elemnto li criado
    var li = document.createElement("li");
    //deixando nova aba ativa
    li.classList.add("active");

    //criar span X para fechar a aba
    var span = document.createElement("span");
    span.setAttribute('id', "fecha" + idAba);
    span.setAttribute('onclick', "FecharAbaX('fecha" + idAba + "')");
    span.setAttribute('class', "fechar-aba-dinamica-x");
    span.textContent = "x";
   
    //novo elemento li recebe a tag span
    li.appendChild(span);

    //elemento a com os atributos iguais ao home
    var a = document.createElement("a");
    a.setAttribute('data-toggle', "tab");
    a.setAttribute('href', "#" + idAba);

    //atributo para onclick para linkar com mesmo atributo content
    a.setAttribute('onclick', "VincularChamadaAbaAoConteudoPertenceAba('" + idAba + "')");

    //texto aparece na aba
    a.textContent = idAba;

    //novo elemento li recebe a tag a
    li.appendChild(a);

    //ulTabsPrincipal adiciona a nova li no tabs
    ulTabsPrincipal.appendChild(li);
}

function removerClasseActiveDivTabContent(ContentPrincipal) {
    //selecionar todas as div que possuem uma classe active
    var divAtivas = ContentPrincipal.querySelectorAll("div > .active");

    divAtivas.forEach(
          function (currentValue, currentIndex, listObj) {
              currentValue.classList.remove("active");
          });
}


//este método deixa o conteudo com a classe ativa que seja o mesmo da aba ativa.
//ou seja na aba que for clicada o conteudo sera a respeito dela
function VincularChamadaAbaAoConteudoPertenceAba(val) {

    var divTabContentPrincipal = document.querySelector("#conteudo-tab-content-dinamico");

    var divTemIdAba = divTabContentPrincipal.querySelector("#" + val);

    //apagar classe active de todas abas conteudo
    removerClasseActiveDivTabContent(divTabContentPrincipal);

    //coloca classe active no conteudo referente a aba ativa
    divTemIdAba.classList.add("in");
    divTemIdAba.classList.add("active");
}

function DesativaActiveAba(listaDeLi) {
    //este foreach simplesmente passa por todas as abas existente deixando elas inativas...........................
    listaDeLi.forEach(
            function (currentValue, currentIndex, listObj) {
                currentValue.classList.remove("active")
            });
    //...................................................................
}

function FecharAbaX(idSpan) {
    //selecionar a LI que contem o span com o id recebido ou seja que foi clicado
    var SpanXClicado = document.querySelector("#"+idSpan);
    // LI referente ao X clicado ou seja a aba que foi clicada no X
    var li = SpanXClicado.parentNode;

    //oculta ou fechar tambem o conteudo da aba clicada no X
    var divTabContentPrincipal = document.querySelector("#conteudo-tab-content-dinamico");

    var palavra = idSpan.split('');
    var idAbaContedudo = '';
    //este for pega somente a palavra que é o ID da aba do conteudo
    for (var i = 0 ; i < palavra.length; i++) {
        if (i > 4)
            idAbaContedudo += palavra[i];
    }
    // seleciona o conteudi da aba clicada no X
    var divConteudoAbaClicada = divTabContentPrincipal.querySelector("#" + idAbaContedudo);

    //incluir classe para esconder elemtno clicado
    li.classList.add("disp-none");
    divConteudoAbaClicada.classList.add("disp-none");


    //Ao fechar qualquer aba ativar a aba e o conteudo da HOME, volta para home.
    CarregarDinamico('home','0');
}
  

   
    


  








