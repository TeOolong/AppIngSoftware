const URL_BASE = 'http://localhost:3000';

//var UM = new UsuarioManager();
var VM = new VacunaManager();
var CVM = new CentroVacunacionManager();
var PM = new ProgramadorManager();
var CM = new CitaManager();

const cargarCentros = async() => {
    const listaLugares = await CVM.obtenerCentrosDeVacunacion();
    var select_insert = document.getElementById("ubicacion_insert");
    var select_update = document.getElementById("ubicacion_update");
    for(centro of listaLugares){
        var option_insert = document.createElement("option");
        var option_update = document.createElement("option");
        option_insert.value = centro.id;
        option_insert.innerHTML = centro.nombre;
        option_update.value = centro.id;
        option_update.innerHTML = centro.nombre;
        select_insert.add(option_insert);
        select_update.add(option_update);
    }
}

const cargarVacunas = async() => {
    const listaVacunas = await VM.obtenerVacunas();
    var select_insert = document.getElementById("vacuna_insert");
    var select_update = document.getElementById("vacuna_update");
    for(vacuna of listaVacunas){
        var option_insert = document.createElement("option");
        var option_update = document.createElement("option");
        option_insert.value = vacuna.id;
        option_insert.innerHTML = vacuna.nombre;
        option_update.value = vacuna.id;
        option_update.innerHTML = vacuna.nombre;
        select_insert.add(option_insert);
        select_update.add(option_update);
    }
}

const insertarCita = async() => {
    var dni = document.getElementById("dni_insert").value;
    var vacuna = document.getElementById("vacuna_insert").value;
    var ubicacion = document.getElementById("ubicacion_insert").value;
    var fecha = document.getElementById("fecha_insert").value;
    var data = await PM.insertarCita(dni, fecha, ubicacion, vacuna)
    if(data == ""){
        console.log("todo gucci");
        document.getElementById("alert_insert").style.display = "none"
        document.getElementById("alert_insert").style.opacity = "0";
        
    }
    else{
        document.getElementById("alert_insert").innerHTML = data;
        document.getElementById("alert_insert").style.display = "block"
        document.getElementById("alert_insert").style.opacity = "1";
    }
}

const actualizarCita = async() => {
    var dni = document.getElementById("dni_update").value;
    var vacuna = document.getElementById("vacuna_update").value;
    var ubicacion = document.getElementById("ubicacion_update").value;
    var fecha = document.getElementById("fecha_update").value;
    var data = await PM.actualizarCita(dni, fecha, ubicacion, vacuna)
    if(data == ""){
        console.log("todo gucci");
        document.getElementById("alert_update").style.display = "none"
        document.getElementById("alert_update").style.opacity = "0";
        
    }
    else{
        document.getElementById("alert_update").innerHTML = data;
        document.getElementById("alert_update").style.display = "block"
        document.getElementById("alert_update").style.opacity = "1";
    }
}

const actualizarDosis = async() => {
    var dni = document.getElementById("dni_dosis").value;
    var dosis = document.getElementById("select_dosis").value;

    var data = await PM.actualizarDosis(dni, dosis)
    if(data == ""){
        console.log("todo gucci");
        document.getElementById("alert_dosis").style.display = "none"
        document.getElementById("alert_dosis").style.opacity = "0";
        
    }
    else{
        document.getElementById("alert_dosis").innerHTML = data;
        document.getElementById("alert_dosis").style.display = "block"
        document.getElementById("alert_dosis").style.opacity = "1";
    }
}



const main = () => {
    cargarCentros();
    cargarVacunas();
    document.getElementById("insertar").onclick = insertarCita;
    document.getElementById("actualizar").onclick = actualizarCita;
    document.getElementById("actualizar_dosis").onclick = actualizarDosis;
    document.getElementById("alert_insert").style.display = "none"
    document.getElementById("alert_insert").style.opacity = "0";
    document.getElementById("alert_update").style.display = "none"
    document.getElementById("alert_update").style.opacity = "0";
    document.getElementById("alert_dosis").style.display = "none"
    document.getElementById("alert_dosis").style.opacity = "0";
}

window.onload = main;