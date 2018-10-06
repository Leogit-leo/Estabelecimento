function abrirVisualizar(val) {
    $.get('@Url.Action("Index", "Gerenciador")', function (data) {
        $('#exampleModal').find('.modal-body').html(data);
        $('#exampleModal').modal('show');

    });
}



function abrirEditar(val) {
    $.get('@Url.Action("Editar", "Gerenciador")', 'id=' + val, function (data) {
        $('#exampleModal').find('.modal-body').html(data);
        $('#exampleModal').modal('show');

    });
}
