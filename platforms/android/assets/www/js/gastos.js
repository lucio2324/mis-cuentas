window.addEventListener("load", empezar);
window.addEventListener("load", mostrar);
window.addEventListener("mouseover", mostrar);
var f = new Date();

var db;

function empezar() {
    var boton = document.querySelector("#elegirCategoria");
    boton.addEventListener("click", validarCategoria);
    var elegir = document.querySelector("#elegir");
    elegir.addEventListener("click", validarElegir);
    var guardar = document.querySelector("#guardarGasto");
    guardar.addEventListener("click", validarGastos);

    abrirBaseDatos();
}

function abrirBaseDatos() {
    db = window.openDatabase('Login', '1.0', 'Esto es una prueva', 10000000);
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS gasto (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, categoria text not null, nombre text not null,importe integer not null,fecha text not null, usuario text not null)');
    });
}

function mostrar() {
    db.transaction(function (tx) {
        var usuarioActual=window.sessionStorage.getItem("usuario");
        tx.executeSql('SELECT id,categoria,nombre,importe,fecha FROM gasto WHERE usuario="'+usuarioActual+'"', [], function (tx, rs) {
           
            var gasto = 0;
            var output = '<table class="table table-condensed" id="respuesta">\n\
                         <tr>\n\
                         <td><strong>Fecha</strong></td>\n\
                         <td><strong>Importe</strong></td>\n\
                        </tr>';

            for (var i = 0; i < rs.rows.length; i++) {
                var row = rs.rows.item(i);

                output += '<tr>\n\
          <td>' + row.fecha + " " + '</td>\n\
          <td>' + "$ " + row.importe + " " + '</td>\n\
          <td><button class=" btn-danger btn-ms" id="eliminar" value="'+row.id+'">X</button></td>\n\
          </tr>';
                gasto += parseInt(row.importe);
            }
            output += '</table>';
            document.querySelector("#mostrar").innerHTML = output;
            document.querySelector("#total").innerHTML = "$ " + gasto;
        });
    });
}

$("body").on("click","#eliminar",eliminarRegistro);

function eliminarRegistro(e) {
    var id =parseInt(e.target.attributes.value.nodeValue);
    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM gasto WHERE id=?;', [id]);
    });
}

function validarCategoria() {
    var elegir = document.querySelector("#categoriaElegir");
    var seleccionar = document.querySelector("#seleccionaCategoria");
    var categoria = document.querySelector("#resultadoCategoria").value;

    elegir.style.display = "none";
    seleccionar.style.display = "inline";
}

function validarElegir() {
    var evento = document.querySelector("#resultadoCategoria");
    var elegir = document.querySelector("#categoriaElegir");
    var seleccionar = document.querySelector("#seleccionaCategoria");
    var seleccion = document.querySelector("#categoriaSeleccionada").value;

    var botonCategoria = document.querySelector("#categoriaSeleccionada");
    botonCategoria.addEventListener("mouseover", function () {
        var mensajeUno = document.querySelector("#mensajeCategoria");
        mensajeUno.innerText = "";
    });

    if (seleccion === "Selecciones categoria") {
        var mensaje = document.querySelector("#mensajeCategoria");
        mensaje.innerText = "Debe elegir una categoria";
    } else {
        evento.value = seleccion;

        seleccionar.style.display = "none";
        elegir.style.display = "inline";
    }
}

function validarGastos() {
    var categoria = document.querySelector("#resultadoCategoria").value;
    var nombre = document.querySelector("#nombre").value;
    var importe = document.querySelector("#importe").value;
    var fecha = document.querySelector("#fecha").value;
    var usuario = window.sessionStorage.getItem("usuario");

    ddhoy = f.getDate();
    mmhoy = f.getMonth();
    aahoy = f.getFullYear();
    var fechaActual = aahoy + mmhoy + ddhoy;
    aa = fecha.substring(0, 4);
    mm = fecha.substring(5, 7);
    dd = fecha.substring(8, 10);
    var fechaComparacion = aa + mm + dd;
    var fechaCorregida = dd + "/" + mm + "/" + aa;

    var botonCategoria = document.querySelector("#elegirCategoria");
    botonCategoria.addEventListener("mouseover", function () {
        var mensajeUno = document.querySelector("#mensajeCategoria");
        mensajeUno.innerText = "";
    });

    var nombreEvento = document.querySelector("#nombre");
    nombreEvento.addEventListener("mouseover", function () {
        var mensaje = document.querySelector("#mensajeNombre");
        mensaje.innerText = "";
    });

    var importeEvento = document.querySelector("#importe");
    importeEvento.addEventListener("mouseover", function () {
        var mensaje = document.querySelector("#mensajeImporte");
        mensaje.innerText = "";
    });

    var fecha = document.querySelector("#fecha");
    fecha.addEventListener("mouseover", function () {
        var mensaje = document.querySelector("#mensajeImporte");
        mensaje.innerText = "";
    });


    if (categoria === "") {
        var mensaje = document.querySelector("#mensajeCategoria");
        mensaje.innerText = "Debe elegir una categoria";
    } else if (nombre === "") {
        var mensaje = document.querySelector("#mensajeNombre");
        mensaje.innerText = "Debe ingresar el nombre gasto";
    } else if (importe === "") {
        var mensaje = document.querySelector("#mensajeImporte");
        mensaje.innerText = "Debe ingresar el nombre gasto";
    } else if (fecha === "") {
        var mensaje = document.querySelector("#mensajeFecha");
        mensaje.innerText = "Debe ingresar una fecha";
    } else if (fechaComparacion <= fechaActual) {
        var mensaje = document.querySelector("#mensajeFecha");
        mensaje.innerText = "Debe ingresar una fecha correcta";
    } else {
        db.transaction(function (tx) {
            tx.executeSql('INSERT INTO gasto(categoria,nombre,importe,fecha,usuario) VALUES (?,?,?,?,?)', [categoria, nombre, importe, fechaCorregida, usuario]);
            alert("se guardo correctamente");
            categoria = document.querySelector("#resultadoCategoria").value = "";
            nombre = document.querySelector("#nombre").value = "";
            importe = document.querySelector("#importe").value = "";
            fecha = document.querySelector("#fecha").value = "";
        });
    }
}


