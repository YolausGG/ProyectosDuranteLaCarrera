// Declaraciones globales
var pacientes = [];

// Métodos del ABM
function alta() {
	var existeAl = true;
	var todosLosDatos = true;

	var id = document.getElementById("id").value;
	var nombre = document.getElementById("nombre").value;
	var apellido = document.getElementById("apellido").value;
	var remedios = document.getElementById("remedios").value;
	var retirados = document.getElementById("retirados").value;

	var todosLosDatos = datosIngresados();
	if (!todosLosDatos) {
		alert("Faltan datos, por favor complete todos los campos");
	}
	else {
		var existeAl = existe(id);
		if (!existeAl) {
			pacientes[pacientes.length] = {
				Id: id,
				Nombre: nombre,
				Apellido: apellido,
				Remedios: remedios,
				Retirados: retirados
			};
			mostrar();
			limpiar();
		}
		else {
			alert("El paciente ya fue ingresado");
		}
	}
}


function baja() {
	var id = parseInt(document.getElementById("id").value);
	var pos = buscar(id);
	pacientes.splice(pos, 1);
	mostrar();
	limpiar();
}

function modificar() {
	var id = parseInt(document.getElementById("id").value);
	var i = buscar(id);
	pacientes[i].Nombre = document.getElementById("nombre").value;
	pacientes[i].Apellido = document.getElementById("apellido").value;
	pacientes[i].Remedios = document.getElementById("remedios").value;
	pacientes[i].Retirados = document.getElementById("retirados").value;
	mostrar();
}

function buscar(id) {
	for (var i = 0; i < pacientes.length; i++) {
		if (pacientes[i].Id == id)
			return (i);
	}
}

function existe(id) {
	for (var i = 0; i < pacientes.length; i++) {
		if (pacientes[i].Id == id)
			return true;
	}
	return false;
}

function datosIngresados() {
	if (document.getElementById("id").value == "" ||
		document.getElementById("nombre").value == "" ||
		document.getElementById("apellido").value == "" ||
		document.getElementById("remedios").value == "Cantidad a retirar" ||
		document.getElementById("retirados").value == "")
		return false;
	else
		return true;
}


function seleccionar() {
	var lista = document.getElementById("lista");
	var i = lista.selectedIndex;
	document.getElementById("id").value = pacientes[i].Id;
	document.getElementById("nombre").value = pacientes[i].Nombre;
	document.getElementById("apellido").value = pacientes[i].Apellido;
	document.getElementById("remedios").value = pacientes[i].Remedios;
	document.getElementById("retirados").value = pacientes[i].Retirados;
}

// Métodos auxiliares
function limpiar() {
	document.getElementById("miForm").reset();
}

function mostrar() {
	var lista = document.getElementById("lista");
	lista.innerHTML = " ";

	for (var i = 0; i < pacientes.length; i++) {
		var renglon = document.createElement("option");
		renglon.text = pacientes[i].Id + "  " +
			pacientes[i].Nombre + "  " +
			pacientes[i].Apellido + "  " +
			pacientes[i].Remedios + "  " +
			pacientes[i].Retirados;
		lista.add(renglon);
	}
}
function isNumberKey(evt) {
	var charCode = (evt.which) ? evt.which : event.KeyCode;
	return !(charCode > 31 && (charCode < 48 || charCode > 57));
}

// Consulta: dado el Id de un paciente mostrar la cantidad de remedios que le quedan para retirar

function cantRemedios() {
	var paciente = parseInt(prompt("Ingrese Id del paciente"));
	var pos = buscar(paciente);
	var resultado = parseInt(pacientes[pos].Remedios) - parseInt(pacientes[pos].Retirados);

	if (resultado >= 0)
		alert("Al paciente " + pacientes[pos].Apellido + " le quedan por retirar " + resultado + " remedios");

	else
		alert("Cantidad de remedios retirados supera límite");

}

// Consulta: pacientes que no han retirado remedios

function noRetiraron() {
	var resultado = "";
	for (var i = 0; i < pacientes.length; i++) {
		if (parseInt(pacientes[i].Retirados) == 0)
			resultado = resultado + pacientes[i].Apellido + " " + pacientes[i].Nombre + "\n";
	}
	alert("Los pacientes que no han retirado remedios son: \n" + resultado);

}


// Consulta: Pacientes que solo pueden retirar 3 remedios

function tresRemedios() {
	var resultado = "";
	for (var i = 0; i < pacientes.length; i++) {
		if (parseInt(pacientes[i].Remedios) == 3)
			resultado = resultado + pacientes[i].Apellido + " " + pacientes[i].Nombre + "\n";
	}
	alert("Los pacientes que pueden retirar 3 remedios son: \n" + resultado);

}


