window.addEventListener("load", empesar);
window.addEventListener("change",empesar);

var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var dataBase;

function empesar() {
    startDB();
    //loadAll();
    abrirBaseDatos();
    //mostrar();
}

function abrirBaseDatos() {
    db = window.openDatabase('Login', '1.0', 'Esto es una prueva', 10000000);
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS gasto (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, categoria text not null, nombre text not null,importe integer not null,fecha text not null, usuario text not null)');
    });
   // mostrar();
}

function loadAll() {
    var active = dataBase.result;
    var data = active.transaction(["sueldo"], "readwrite");
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
    data.oncomplete = function total() {
        var usuario = '';
        var sueldo = 0;
        for (var key in elements) {
            //sueldo += parseInt(elements[key].sueldo);
            usuario += elements[key].usuario + " " + elements[key].sueldo + " ";
        }
        elements = [];
        var arrayUsuario = usuario.split(" ");
        var totalIngreso = 0;
        for (var i = 0; i < arrayUsuario.length; i++) {
            if (arrayUsuario[i] === actualUsuario) {
                gasto = parseFloat(arrayUsuario[i + 1]);
                totalIngreso += gasto;
            }
        }

        document.querySelector("#totalBalance").innerHTML = "$ " + totalIngreso;
        document.querySelector("#disponible").innerHTML = totalIngreso;   
        mostrar();
    };
    
}


function mostrar() {
    var usuarioActual = window.sessionStorage.getItem("usuario");
    db.transaction(function (tx) {
       var hola= document.querySelector("#disponible").innerHTML;
       var total=hola;
            tx.executeSql('SELECT importe FROM gasto WHERE categoria="Transporte" AND usuario="'+usuarioActual+'"', [], function (tx, rs) {
                var Tgasto = 0;
                for (var i = 0; i < rs.rows.length; i++) {
                    var row = rs.rows.item(i);
                    Tgasto += parseInt(row.importe);
                }
                document.querySelector("#transporte").innerHTML = "$ " + Tgasto;


                tx.executeSql('SELECT importe FROM gasto WHERE categoria="Alimentos" AND usuario="'+usuarioActual+'"', [], function (tx, rs) {
                    var Agasto = 0;
                    for (var i = 0; i < rs.rows.length; i++) {
                        var row = rs.rows.item(i);
                        Agasto += parseInt(row.importe);
                    }
                    document.querySelector("#alimentos").innerHTML = "$ " + Agasto;


                    tx.executeSql('SELECT importe FROM gasto WHERE categoria="Servicio" AND usuario="'+usuarioActual+'"', [], function (tx, rs) {
                        var Sgasto = 0;
                        for (var i = 0; i < rs.rows.length; i++) {
                            var row = rs.rows.item(i);
                            Sgasto += parseInt(row.importe);
                        }
                        document.querySelector("#servicios").innerHTML = "$ " + Sgasto;


                        tx.executeSql('SELECT importe FROM gasto WHERE categoria="Medicos" AND usuario="'+usuarioActual+'"', [], function (tx, rs) {
                            var Mgasto = 0;
                            for (var i = 0; i < rs.rows.length; i++) {
                                var row = rs.rows.item(i);
                                Mgasto += parseInt(row.importe);
                            }
                            document.querySelector("#medicos").innerHTML = "$ " + Mgasto;


                            tx.executeSql('SELECT importe FROM gasto WHERE categoria="Entretenimiento" AND usuario="'+usuarioActual+'"', [], function (tx, rs) {
                                var Egasto = 0;
                                for (var i = 0; i < rs.rows.length; i++) {
                                    var row = rs.rows.item(i);
                                    Egasto += parseInt(row.importe);
                                }
                                document.querySelector("#entretenimiento").innerHTML = "$ " + Egasto;


                                tx.executeSql('SELECT importe FROM gasto WHERE categoria="Otros" AND usuario="'+usuarioActual+'"', [], function (tx, rs) {
                                    var Ogasto = 0;
                                    for (var i = 0; i < rs.rows.length; i++) {
                                        var row = rs.rows.item(i);
                                        Ogasto += parseInt(row.importe);
                                    }
                                    document.querySelector("#otros").innerHTML = "$ " + Ogasto;


                                    tx.executeSql('SELECT importe FROM gasto WHERE usuario="'+usuarioActual+'"', [], function (tx, rs) {
                                        var Disgasto = 0;
                                        for (var i = 0; i < rs.rows.length; i++) {
                                            var row = rs.rows.item(i);
                                            Disgasto += parseInt(row.importe);
                                        }
                                        document.querySelector("#disponible").innerHTML = total - Disgasto;
                                        var Disponible = total - Disgasto;
                                        var pieData = [
                                            {
                                                value: Tgasto,
                                                color: "#0b82e7",
                                                highlight: "#BFFF00",
                                                label: "Transporte"
                                            },
                                            {
                                                value: Agasto,
                                                color: "#e3e860",
                                                highlight: "#a9ad47",
                                                label: "Alimentos"
                                            },
                                            {
                                                value: Sgasto,
                                                color: "#DBA901",
                                                highlight: "#b74865",
                                                label: "Servicios"
                                            },
                                            {
                                                value: Mgasto,
                                                color: "#5ae85a",
                                                highlight: "#42a642",
                                                label: "Medicos"
                                            },
                                            {
                                                value: Egasto,
                                                color: "#e965db",
                                                highlight: "#a6429b",
                                                label: "Entretenimiento"
                                            },
                                            {
                                                value: Ogasto,
                                                color: "#642EFE",
                                                highlight: "#42a642",
                                                label: "Otros"
                                            },
                                            {
                                                value: Disponible,
                                                color: "#DF3A01",
                                                highlight: "#a6429b",
                                                label: "Disponible"
                                            }
                                        ];
                                        var ctx = document.getElementById("chart-area").getContext("2d");
                                        window.myPie = new Chart(ctx).Pie(pieData);

                                    });
                                });
                            });
                        });
                    });
                });
            });
    });
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



