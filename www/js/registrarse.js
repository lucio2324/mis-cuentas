window.addEventListener("load",empesar);
window.addEventListener("load",startDB);


var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
   var dataBase = null;
function empesar(){
    registro=document.getElementById("Registrarse");
    registro.addEventListener("click",validarRegistro);
    // db=window.openDatabase('Gastos','1.0','Esto es una prueva',1000000000);
}

function startDB() {
            
    dataBase = indexedDB.open("Login", 1);
                
    dataBase.onupgradeneeded = function (e) {

    active = dataBase.result;
                    
    object = active.createObjectStore("usuario", { keyPath : 'id', autoIncrement : true });
    object.createIndex('usuario', 'usuario', { unique : false });
    object.createIndex('clave', 'clave', { unique : false });
   };

    dataBase.onsuccess = function (e) {
      // alert('Base de datos cargada correctamente');
        loadAll();
   };
        
    dataBase.onerror = function (e)  {
       alert('Error cargando la base de datos');
   };
   
}

function add() {
               var active = dataBase.result;
                var data = active.transaction(["usuario"], "readwrite");
                var object = data.objectStore("usuario");
                var usuario = document.querySelector("#usuario").value;
                var clave = document.querySelector("#clave").value;

                var request = object.put({
                    usuario:usuario,
                    contraseña: clave
                });
                
                request.onerror = function (e) {
                    alert(request.error.name + '\n\n' + request.error.message);
                };

                data.oncomplete = function (e) {
                    document.querySelector("#usuario").value = '';
                    document.querySelector("#usuarioRepetido").value = '';
                    document.querySelector("#clave").value = '';
                    document.querySelector("#claveRepetida").value = '';
                    mostrar= document.getElementById("seguardo");
                    mostrar.style.display="block";
                    document.getElementById("registro").style.display="none";
                    loadAll();
                };
            }
 

function validarRegistro(){
    usuarioEvento=document.getElementById("usuario");
    usuarioRepetidoEvento=document.getElementById("usuarioRepetido");
    claveEvento=document.getElementById("clave");
    claveRepetidaEvento=document.getElementById("claveRepetida");
    
    usuario=document.getElementById("usuario").value;
    usuarioRepetido=document.getElementById("usuarioRepetido").value;
    usuarioBase=document.getElementById("usuarioBase").value;
    clave=document.getElementById("clave").value;
    claveRepetida=document.getElementById("claveRepetida").value;
     
    spanUsuario=document.getElementById("validarUsuario");
    spanUsuariRepetidoo=document.getElementById("validarUsuarioRepetido");
    spanClave=document.getElementById("validarClave");
    spanClaveRepetida=document.getElementById("validarClaveRepetida");
    
    usuarioEvento.addEventListener("mouseover",function (){
        spanUsuario.innerText="";
    });
    
    usuarioRepetidoEvento.addEventListener("mouseover",function (){
        spanUsuario.innerText="";
    });
    
    claveEvento.addEventListener("mouseover",function (){
        spanClave.innerText="";
    });
    
    claveRepetidaEvento.addEventListener("mouseover",function (){
        spanClaveRepetida.innerText="";
    });
    
     usuarioE ="";
  /*   db.transaction(function (tx){
       tx.executeSql('SELECT usuario,clave FROM Usuario',[], function(tx, rs){  
  for(var i=0; i<rs.rows.length; i++) {
        var row = rs.rows.item(i); 
          usuarioE+= row.usuario+" ";
           }
           });*/
    
    if (usuario==""){
       mensajeUsuario = document.querySelector("#validarUsuario");
       mensajeUsuario.innerText="Es campo del usuario no puede estar vacio";
    }else if (usuarioRepetido == ""){
       mensajeUsuarioRepetido = document.querySelector("#validarUsuarioRepetido");
       mensajeUsuarioRepetido.innerText="Es campo del usuario no puede estar vacio";
    }else if (usuarioRepetido != usuario){
       mensajeUsuarioRepetido = document.querySelector("#validarUsuarioRepetido");
       mensajeUsuarioRepetido.innerText="El usuario debe ser igual al de arriba";
    }else if(clave == ""){
       mensajeClave = document.querySelector("#validarClave");
       mensajeClave.innerText="Es campo de la contraseña no puede estar vacio";
    }else if (clave.length < 8){
       mensajeClave = document.querySelector("#validarClave");
       mensajeClave.innerText="La contraseña debe tener como minimo 8 caracteres";
    }else if(claveRepetida == ""){
       mensajeClaveRepetida= document.querySelector("#validarClaveRepetida");
       mensajeClaveRepetida.innerText="Es campo de la contraseña no puede estar vacio";
    }else if(claveRepetida != clave){
       mensajeClaveRepetida = document.querySelector("#validarClaveRepetida");
       mensajeClaveRepetida.innerText="La contraseña debe ser igual al de arriba";
    }else if (usuarioBase!=" "){
    if (usuarioBase.indexOf(usuario) >= 1){
       mensajeUsuario = document.querySelector("#validarUsuario");
       mensajeUsuario.innerText="Este usuario ya existe";    
    }else {
        add(); 
        }  
   }
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
 
                  var outerHTML='';
                    for (var key in elements) {
                   
                       /*outerHTML += '\n\
                        <span id="usuarios>' + elements[key].usuario +" "+'</span>\n\
                            <span id="claves>' + elements[key].contraseña+" "+'</span>' 
                     */   outerHTML += elements[key].usuario+" ";   
                    }
                    
                   elements = [];
                    document.querySelector("#usuarioBase").value = outerHTML;
                    }
                  
                }
    
    
    






