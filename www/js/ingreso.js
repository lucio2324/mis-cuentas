window.addEventListener("load", empezar);
window.addEventListener("load", mostrar);

var db;
var f = new Date;

function noAtras(e) {
    e.preventDefault();
    window.location.replace("index.html");
}

function empezar() {
    var boton = document.querySelector("#guardarIngreso");
    boton.addEventListener("click", validarIngreso);
    var editarE = document.querySelector("#guardarIngreso");
    editarE.addEventListener("click", mostrarInput);
     var editarB = document.querySelector("#editar");
    editarB.addEventListener("click", editar);
    var botonAtras = document.querySelector("#login");
    botonAtras.addEventListener("click", noAtras);
    abrirBaseDatos();
}

function abrirBaseDatos() {
    db = window.openDatabase('Login', '1.0', 'Esto es una prueva', 10000000);
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS ingresos (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,importe integer not null,fecha text not null, usuario text not null)');
    });
}

function mostrarInput() {
    var ingreso = document.querySelector("#ingresaSueldo").value;
    document.querySelector("#sueldoTotal").innerHTML="Su ingreso es de $ "+ ingreso;
}

function editar(e){
    var resultado = document.querySelector("#ingreso");
            resultado.style.display = "block";
   var ingresoSalida = document.querySelector("#editarIngreso");
           ingresoSalida.style.display = "none";
     var vaciar=document.querySelector("#ingresaSueldo");
             vaciar.value=" ";
}

function mostrar() {
    db.transaction(function (tx) {
        var usuarioActual=window.sessionStorage.getItem("usuario");
        tx.executeSql('SELECT id,importe,fecha FROM ingresos WHERE usuario="'+usuarioActual+'"', [], function (tx, rs) {
           
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
        tx.executeSql('DELETE FROM ingresos WHERE id=?;', [id]);
        location.reload(true);
    });
}

function validarIngreso() {

    var ingreso = document.querySelector("#ingresaSueldo").value;
    var fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + " " + f.getHours() + ":" + f.getMinutes();
    var usuario = window.sessionStorage.getItem("usuario");
    var ingresoE = document.querySelector("#ingresaSueldo");
    var ingresoEvento = document.querySelector("#ingresaSueldo");
    var espanEvento = document.querySelector("#sueldo");

    ingresoEvento.addEventListener("mouseover", function () {
        espanEvento.innerText = "";
    });

    if (ingreso === "") {
        espanEvento.innerText = "Debe ingresar una algun ingreso";
    } else {
  db.transaction(function (tx) {
            tx.executeSql('INSERT INTO ingresos (importe,fecha,usuario) VALUES (?,?,?)', [ ingreso, fecha, usuario]);
            alert("se guardo correctamente");
            var ingresoSalida = document.querySelector("#ingreso").style.display = "none";
            var resultado = document.querySelector("#editarIngreso").style.display = "block";
            mostrar()
  });
    }
  }

