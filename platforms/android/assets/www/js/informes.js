window.addEventListener("load", empesar);
window.addEventListener("change", empesar);

function empesar() {
    abrirBaseDatos();
    mostrar();
}

function abrirBaseDatos() {
    db = window.openDatabase('Login', '1.0', 'Esto es una prueva', 10000000);
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS gasto (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, categoria text not null, nombre text not null,importe integer not null,fecha text not null, usuario text not null)');
    });
}

var botonAtrasBlock=document.querySelector("#login");
botonAtrasBlock.addEventListener("click",noAtras());

function noAtras (e){
    e.preventDefault();
   window.location.replace("index.html");
}

function mostrar() {
    var usuarioActual = window.sessionStorage.getItem("usuario");
    db.transaction(function (tx) {
        tx.executeSql('SELECT id,nombre,importe,fecha FROM gasto WHERE categoria="Transporte" AND usuario="' + usuarioActual + '"', [], function (tx, rs) {
            var output='';
            for (var i = 0; i < rs.rows.length; i++) {
                var row = rs.rows.item(i);
                 output +='<table class="table table-condensed">\n\
                    <tr class="info">\n\
                        <td>Numero:</td>\n\
                        <td>'+i+'</td>\n\
                    </tr>\n\
                    <tr class="info">\n\
                        <td>Nonbre:</td>\n\
                        <td>'+row.nombre+'</td>\n\
                    </tr>\n\
                    <tr class="info">\n\
                        <td>Fecha:</td>\n\
                        <td>'+row.fecha+'</td>\n\
                    </tr>\n\
                    <tr class="info">\n\
                        <td>Importe:</td>\n\
                        <td>$ '+row.importe+'</td>\n\
                    </tr>\n\
                </table>';
            }
            document.querySelector("#transporte").innerHTML = output;
            
        });
        tx.executeSql('SELECT id,nombre,importe,fecha FROM gasto WHERE categoria="Alimentos" AND usuario="' + usuarioActual + '"', [], function (tx, rs) {
            var output='';
            for (var i = 0; i < rs.rows.length; i++) {
                var row = rs.rows.item(i);
                output +='<table class="table table-condensed">\n\
                    <tr class="info">\n\
                        <td>Numero:</td>\n\
                        <td>'+i+'</td>\n\
                    </tr>\n\
                    <tr class="info">\n\
                        <td>Nonbre:</td>\n\
                        <td>'+row.nombre+'</td>\n\
                    </tr>\n\
                    <tr class="info">\n\
                        <td>Fecha:</td>\n\
                        <td>'+row.fecha+'</td>\n\
                    </tr>\n\
                    <tr class="info">\n\
                        <td>Importe:</td>\n\
                        <td>$ '+row.importe+'</td>\n\
                    </tr>\n\
                </table>';
            }
            document.querySelector("#alimentos").innerHTML = output;
            
        });
        tx.executeSql('SELECT id,nombre,importe,fecha FROM gasto WHERE categoria="Servicio" AND usuario="' + usuarioActual + '"', [], function (tx, rs) {
            var output='';
            for (var i = 0; i < rs.rows.length; i++) {
                var row = rs.rows.item(i);
                 output +='<table class="table table-condensed">\n\
                    <tr class="info">\n\
                        <td>Numero:</td>\n\
                        <td>'+i+'</td>\n\
                    </tr>\n\
                    <tr class="info">\n\
                        <td>Nonbre:</td>\n\
                        <td>'+row.nombre+'</td>\n\
                    </tr>\n\
                    <tr class="info">\n\
                        <td>Fecha:</td>\n\
                        <td>'+row.fecha+'</td>\n\
                    </tr>\n\
                    <tr class="info">\n\
                        <td>Importe:</td>\n\
                        <td>$ '+row.importe+'</td>\n\
                    </tr>\n\
                </table>';
            }
            document.querySelector("#servicios").innerHTML = output;
            
        });
        tx.executeSql('SELECT id,nombre,importe,fecha FROM gasto WHERE categoria="Medicos" AND usuario="' + usuarioActual + '"', [], function (tx, rs) {
            var output='';
            for (var i = 0; i < rs.rows.length; i++) {
                var row = rs.rows.item(i);
                 output +='<table class="table table-condensed">\n\
                    <tr class="info">\n\
                        <td>Numero:</td>\n\
                        <td>'+i+'</td>\n\
                    </tr>\n\
                    <tr class="info">\n\
                        <td>Nonbre:</td>\n\
                        <td>'+row.nombre+'</td>\n\
                    </tr>\n\
                    <tr class="info">\n\
                        <td>Fecha:</td>\n\
                        <td>'+row.fecha+'</td>\n\
                    </tr>\n\
                    <tr class="info">\n\
                        <td>Importe:</td>\n\
                        <td>$ '+row.importe+'</td>\n\
                    </tr>\n\
                </table>';
            }
            document.querySelector("#medicos").innerHTML = output;
            
        });
        tx.executeSql('SELECT id,nombre,importe,fecha FROM gasto WHERE categoria="Entretenimiento" AND usuario="' + usuarioActual + '"', [], function (tx, rs) {
            var output='';
            for (var i = 0; i < rs.rows.length; i++) {
                var row = rs.rows.item(i);
                 output +='<table class="table table-condensed">\n\
                    <tr class="info">\n\
                        <td>Numero:</td>\n\
                        <td>'+i+'</td>\n\
                    </tr>\n\
                    <tr class="info">\n\
                        <td>Nonbre:</td>\n\
                        <td>'+row.nombre+'</td>\n\
                    </tr>\n\
                    <tr class="info">\n\
                        <td>Fecha:</td>\n\
                        <td>'+row.fecha+'</td>\n\
                    </tr>\n\
                    <tr class="info">\n\
                        <td>Importe:</td>\n\
                        <td>$ '+row.importe+'</td>\n\
                    </tr>\n\
                </table>';
            }
            document.querySelector("#entretenimiento").innerHTML = output;
            
        });
        tx.executeSql('SELECT id,nombre,importe,fecha FROM gasto WHERE categoria="Otros" AND usuario="' + usuarioActual + '"', [], function (tx, rs) {
            var output ='';
            for (var i = 0; i < rs.rows.length; i++) {
                var row = rs.rows.item(i);
                output +='<table class="table table-condensed">\n\
                    <tr class="info">\n\
                        <td>Numero:</td>\n\
                        <td>'+i+'</td>\n\
                    </tr>\n\
                    <tr class="info">\n\
                        <td>Nonbre:</td>\n\
                        <td>'+row.nombre+'</td>\n\
                    </tr>\n\
                    <tr class="info">\n\
                        <td>Fecha:</td>\n\
                        <td>'+row.fecha+'</td>\n\
                    </tr>\n\
                    <tr class="info">\n\
                        <td>Importe:</td>\n\
                        <td>$ '+row.importe+'</td>\n\
                    </tr>\n\
                </table>';
            }
            document.querySelector("#otros").innerHTML = output;
            
        });
    });
}



