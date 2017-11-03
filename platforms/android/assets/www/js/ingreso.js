window.addEventListener("load", empezar);
window.addEventListener("load", startDB);
window.addEventListener("mouseover", loadAll);

var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

var f = new Date;

function noAtras(e) {
    e.preventDefault();
    window.location.replace("index.html");
}

function balance(e) {
    e.preventDefault();
    window.location.assign("balance.html");
}

function empezar() {
    var boton = document.querySelector("#guardarIngreso");
    boton.addEventListener("click", validarGasto);
    var editar = document.querySelector("#editar");
    editar.addEventListener("click", mostrarInput);
    var botonAtras = document.querySelector("#login");
    botonAtras.addEventListener("click", noAtras);
    var botonBalance = document.querySelector("#balance");
    botonBalance.addEventListener("click", balance);
}

function mostrarInput() {
    var ingresoSalida = document.querySelector("#ingreso").style.display = "block";
    var resultado = document.querySelector("#editarIngreso").style.display = "none";

}

function startDB() {

    dataBase = indexedDB.open("ingreso", 1);

    dataBase.onupgradeneeded = function (e) {

        active = dataBase.result;

        object = active.createObjectStore("sueldo", {keyPath: 'id', autoIncrement: true});
        object.createIndex('sueldo', 'sueldo', {unique: false});
        object.createIndex('fecha', 'fecha', {unique: false});
        object.createIndex('usuario', 'usuario', {unique: false});
    };

    dataBase.onsuccess = function (e) {
        //alert('Base de datos cargada correctamente');
        loadAll();
    };

    dataBase.onerror = function (e) {
        alert('Error cargando la base de datos');
    };

}

function add() {
    var active = dataBase.result;
    var data = active.transaction(["sueldo"], "readwrite");
    var object = data.objectStore("sueldo");
    var sueldo = document.querySelector("#ingresaSueldo").value;
    var sueldoE = document.querySelector("#ingresaSueldo");
    var fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + " " + f.getHours() + ":" + f.getMinutes();
    var usuario = window.sessionStorage.getItem("usuario");
    var request = object.put({
        sueldo: sueldo,
        fecha: fecha,
        usuario: usuario
    });


    request.onerror = function (e) {
        alert(request.error.name + '\n\n' + request.error.message);
    };

    data.oncomplete = function (e) {
        alert('Objeto agregado correctamente');
        sueldoE.value = " ";
        //loadAll();
    };
}

function loadAll() {

    var active = dataBase.result;
    var data = active.transaction(["sueldo"], "readonly");
    var object = data.objectStore("sueldo");
    var actualUsuario = window.sessionStorage.getItem("usuario");
    var elements = [];

    object.openCursor().onsuccess = function (e) {

        var result = e.target.result;

        if (result === null) {
            return;
        }

        elements.push(result.value);
        result.continue();

    };

    data.oncomplete = function () {
        var usuario = '';
        var sueldo = 0;
        var outerHTML = '<table class="table table-condensed" id="respuesta">\n\
                         <tr>\n\
                         <td><strong>Fecha</strong></td>\n\
                         <td><strong>Sueldo</strong></td>\n\
                        </tr>';

        for (var key in elements) {
            sueldo += parseInt(elements[key].sueldo);
            usuario += elements[key].usuario + " " + elements[key].sueldo + " "+elements[key].fecha+" "+elements[key].id+" ";
        }

        elements = [];
        var arrayUsuario = usuario.split(" ");

        var totalIngreso = 0;

        for (var i = 0; i < arrayUsuario.length; i++) {
            if (arrayUsuario[i] === actualUsuario) {
                gasto = parseFloat(arrayUsuario[i + 1]);
                totalIngreso += gasto;
            outerHTML += '<tr>\n\
                           <td>' + arrayUsuario[i+2] + " " + '</td>\n\
                           <td>' + "$ " + arrayUsuario[i+1] + " " + '</td>\n\
                            <td><botton class="btn btn-danger" id="eliminar" value="'+arrayUsuario[i+4]+'">X</button>\n\
                             </td>\n\
                            </tr>';
            }
        }
        outerHTML +='</table>';
        document.querySelector("#total").innerText = "$ " + totalIngreso;
        document.querySelector("#sueldoTotal").innerText = "Su ingreso es de $ " + totalIngreso;
document.querySelector("#respuesta").innerHTML = outerHTML;
    };
}
$("body").on("click","#eliminar",eliminarRegistro);

function eliminarRegistro(e) {
    var id =parseInt(e.target.attributes.value.nodeValue);
    var db = dataBase.result;
    var transaction = db.transaction(['sueldo'], 'readwrite');
    var objStore = transaction.objectStore('sueldo');

    var request = objStore.delete(id);

    request.onsuccess = function () {
        alert("Se elimino el registro");
    };

    request.onerror = function (e) {
        console.log(e);
    };
}

function validarGasto() {

    var ingreso = document.querySelector("#ingresaSueldo").value;
    var ingresoE = document.querySelector("#ingresaSueldo");
    var ingresoEvento = document.querySelector("#ingresaSueldo");
    var espanEvento = document.querySelector("#sueldo");

    ingresoEvento.addEventListener("mouseover", function () {
        espanEvento.innerText = "";
    });

    if (ingreso === "") {
        espanEvento.innerText = "Debe ingresar una algun ingreso";
    } else {
        var ingresoSalida = document.querySelector("#ingreso").style.display = "none";
        var resultado = document.querySelector("#editarIngreso").style.display = "block";
        //ingresoE.value= "";
        add();

    }
}

