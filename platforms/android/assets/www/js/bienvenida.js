window.addEventListener("load",bienvenida);

function bienvenida(){
    usuario= sessionStorage.getItem("usuario");
    document.getElementById("bienvenido").innerHTML="Bienvenido/a "+usuario;
}


