window.addEventListener("load", empesar);
window.addEventListener("load", startDB);
window.addEventListener("load",nobackbutton );
 
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

function empesar() {
    var comensar = document.getElementById("iniciar");
    comensar.addEventListener("click", validarLogin);
    //nobackbutton();
}

function nobackbutton(){
    window.location.hash = "no-back-button";
    window.location.hash = "Again-No-back-button"; //chrome
   window.onhashchange=function(){window.location.hash="no-back-button";};	
}

function startDB() {

    dataBase = indexedDB.open("Login", 1);

    dataBase.onupgradeneeded = function (e) {

        active = dataBase.result;

        object = active.createObjectStore("usuario", {keyPath: 'id', autoIncrement: true});
        object.createIndex('usuario', 'usuario', {unique: false});
        object.createIndex('contraseña', 'contraseña', {unique: false});
    };

    dataBase.onsuccess = function (e) {
        // alert('Base de datos cargada correctamente');
        loadAll();
    };

    dataBase.onerror = function (e) {
        alert('Error cargando la base de datos');
    };
}

function loadAll() {

    var active = dataBase.result;
    var data = active.transaction(["usuario"], "readonly");
    var object = data.objectStore("usuario");
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
        var clave='';
        for (var key in elements) {
            usuario += elements[key].usuario +" ";
            clave+= elements[key].contraseña + " ";
        }
        elements = [];
        document.querySelector("#usuarioBase").value = usuario;
        document.querySelector("#claveBase").value = clave;
    }
}

function validarLogin() {
    var usuarioEvento = document.querySelector("#usuario");
    var claveEvento = document.querySelector("#clave");
    var usuario = document.querySelector("#usuario").value;
    var clave = document.querySelector("#clave").value;
    var usuarioL = document.querySelector("#usuarioBase").value;
    var claveL = document.querySelector("#claveBase").value;
    var spanUsuario = document.getElementById("validarUsuario");
    var spanClave = document.getElementById("validarClave");
    usuarioEvento.addEventListener("mouseover", function () {
        spanUsuario.innerText = "";
    });
    claveEvento.addEventListener("mouseover", function () {
        spanClave.innerText = "";
    });


    if (usuario === "") {
        mensajeUsuario = document.querySelector("#validarUsuario");
        mensajeUsuario.innerText = "Es campo del usuario no puede estar vacio";
    } else
    if (clave === "") {
        mensajeClave = document.querySelector("#validarClave");
        mensajeClave.innerText = "Este capo de la contraseña no puede estar vacio";
    } else
    if (clave.length < 8) {
         mensajeClave = document.querySelector("#validarClave");
        mensajeClave.innerHTML = "Debe ingresar una clave de 8 caracteres como minimo";
    } else if (usuarioL !== " ") {
        if (usuarioL.indexOf(usuario) >= 0 && claveL.indexOf(clave) >= 0 ){
            sessionStorage.setItem('usuario', usuario);
            document.location.href = "bienvenida.html";
            setTimeout("redireccionar()", 1000);
        } else {
            mensajeUsuario = document.querySelector("#validarUsuario");
            mensajeUsuario.innerText = "El usurio o la contraseña es incorrecto";
        }
    }
}


  