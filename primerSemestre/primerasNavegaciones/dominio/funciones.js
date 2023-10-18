// Funciones de Javascript y LocalStorage
// Inicializacion del localStorage

function inicializacion() { 
	if (localStorage.getItem("personas") === null)
		localStorage.setItem("personas", "");
	mostrar();
	limpiar();
}

// Alta - Baja

function alta() { 
	var personas 	= leerPersonas();
	var id 			= document.getElementById("id").value;
	var nombre 		= document.getElementById("nombre").value;
	var apellido 	= document.getElementById("apellido").value;
	personas[personas.length] = { 
			Id		: id, 
			Nombre	: nombre, 
			Apellido: apellido
			};
			
	localStorage.setItem("personas", JSON.stringify(personas));
	
	mostrar();
	limpiar();
}

function baja() {
	
	var personas = leerPersonas();
	
	var id 		 = parseInt(document.getElementById("id").value);
	var i 		 = buscar(id);
	personas.splice(i, 1);
	localStorage.setItem("personas", JSON.stringify(personas));
	mostrar();
	limpiar();
}

function modif() {
	
	var personas  = leerPersonas();
	
	var id 		  = parseInt(document.getElementById("id").value);
	var pos 	  = buscar(id);
	var nombre 	  = document.getElementById("nombre").value;
	var apellido  = document.getElementById("apellido").value;
	personas[pos] = { 
			Id		: id, 
			Nombre	: nombre, 
			Apellido: apellido
			};
			
	localStorage.setItem("personas", JSON.stringify(personas));
	
	mostrar();
	limpiar();
}

// Métodos auxiliares

/* JSON.parse(localStorage.getItem("personas")) */
function leerPersonas() { 		
	var stringpersonas = localStorage.getItem("personas");
	if (stringpersonas == "")
		return [];
	else
		return JSON.parse(stringpersonas);
}

function buscar(id) {
	var personas = leerPersonas();
	for(var i = 0; i < personas.length; i++)
		if(personas[i].Id == id)
			return(i);
}

function limpiar() {
	document.getElementById("id").value 		   = "";
	document.getElementById("nombre").value 	   = "";
	document.getElementById("apellido").value 	   = "";
	document.getElementById("lista").selectedIndex = -1;
	document.getElementById("botónAlta").disabled  = false;
	document.getElementById("botónBaja").disabled  = true;
	document.getElementById("botónModificar").disabled  = true;
	document.getElementById("id").focus();
}

function mostrar() {
	var personas 	= leerPersonas();
	var lista 	 	= document.getElementById("lista");
	lista.innerHTML = "";

	for(var i = 0; i < personas.length; i++) {
		var elemento  = document.createElement("option");
		elemento.text = personas[i].Id + " " + personas[i].Nombre + " " + personas[i].Apellido;
		lista.add(elemento);
	}
}

function seleccionar() {
	var personas = leerPersonas();
	var lista 	 = document.getElementById("lista");
	var i 		 = lista.selectedIndex;
	document.getElementById("id").value 		  = personas[i].Id;
	document.getElementById("nombre").value 	  = personas[i].Nombre;
	document.getElementById("apellido").value 	  = personas[i].Apellido;
	document.getElementById("botónAlta").disabled = true;
	document.getElementById("botónBaja").disabled = false;
	document.getElementById("botónModificar").disabled = false;
}

