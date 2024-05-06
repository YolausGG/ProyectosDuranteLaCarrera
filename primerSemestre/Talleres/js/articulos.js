// Declaraciones globales
var articulos = [];

// Métodos del ABM
function alta() {
	var existeAl = true;
	var todosLosDatos = true;

	var id = document.getElementById("id").value;
	var nombre = document.getElementById("nombre").value;
	var stock = document.getElementById("stock").value;
	var precio = document.getElementById("precio").value;


	var todosLosDatos = datosIngresados();
	if (!todosLosDatos) {
		alert("Faltan datos, por favor complete todos los campos");
	}
	else {
		var existeAl = existe(id);
		if (!existeAl) {
			articulos[articulos.length] = {
				Id: id,
				Nombre: nombre,
				Stock: stock,
				Precio: precio,

			};
			mostrar();
			limpiar();
		}
		else {
			alert("El articulo ya fue ingresado");
		}
	}
}


function baja() {
	var id = parseInt(document.getElementById("id").value);
	var pos = buscar(id);
	articulos.splice(pos, 1);
	mostrar();
	limpiar();
}

function modificar() {
	var id = parseInt(document.getElementById("id").value);
	var i = buscar(id);
	articulos[i].Nombre = document.getElementById("nombre").value;
	articulos[i].Stock = document.getElementById("stock").value;
	articulos[i].Precio = document.getElementById("precio").value;

	mostrar();
}

function buscar(id) {
	for (var i = 0; i < articulos.length; i++) {
		if (articulos[i].Id == id)
			return (i);
	}
}

function existe(id) {
	for (var i = 0; i < articulos.length; i++) {
		if (articulos[i].Id == id)
			return true;
	}
	return false;
}

function datosIngresados() {
	if (document.getElementById("id").value == "" ||
		document.getElementById("nombre").value == "" ||
		document.getElementById("stock").value == "" ||
		document.getElementById("precio").value == "")
		return false;
	else
		return true;
}


function seleccionar() {
	var lista = document.getElementById("lista");
	var i = lista.selectedIndex;
	document.getElementById("id").value = articulos[i].Id;
	document.getElementById("nombre").value = articulos[i].Nombre;
	document.getElementById("stock").value = articulos[i].Stock;
	document.getElementById("precio").value = articulos[i].Precio;

}

// Métodos auxiliares
function limpiar() {
	document.getElementById("miForm").reset();
}

function mostrar() {
	var lista = document.getElementById("lista");
	lista.innerHTML = " ";

	for (var i = 0; i < articulos.length; i++) {
		var renglon = document.createElement("option");
		renglon.text = articulos[i].Id + "  " +
			articulos[i].Nombre + "  " +
			articulos[i].Stock + " $" +
			articulos[i].Precio;
		lista.add(renglon);
	}
}
function isNumberKey(evt) {
	var charCode = (evt.which) ? evt.which : event.KeyCode;
	return !(charCode > 31 && (charCode < 48 || charCode > 57));
}

// Consulta: venta de articulos: precio * cantidad y actualiza stock

function muestraVentas() {

	var idArticulo = parseInt(prompt("Ingrese id del articulo a comprar"));
	var cantidadArticulo = parseInt(prompt("Ingrese la cantirdad a comprar"));
	var resultado = 0;
	if (articulos[idArticulo - 1].Stock > cantidadArticulo) {
		resultado = articulos[idArticulo - 1].Precio * cantidadArticulo;
		articulos[idArticulo - 1].Stock = articulos[idArticulo - 1].Stock - cantidadArticulo;

		alert("Compró " + cantidadArticulo + " " + articulos[idArticulo - 1].Nombre + " por un precio de $" + resultado);

		mostrar()
		var resultado = "";
		for (var i = 0; i < articulos.length; i++) {

			resultado = resultado + "Articulo: " + articulos[i].Nombre + " " +
				"Precio: $ " + articulos[i].Precio + " " +
				"Stock: " + articulos[i].Stock + "\n";
		}
		alert("Articulos a la venta: \n" + resultado);
	}
	else {
		alert("No se cuenta con tanto stock \nEl stock de " + articulos[idArticulo - 1].Nombre + " es de " + articulos[idArticulo - 1].Stock);
		muestraVentas();
	}
}

// Consulta: precio de articulo dado un id

function precioId() {
	var id = parseInt(prompt("Ingrese la id"));

	for (var i = 0; i < articulos.length; i++) {
		if (articulos[i].Id == id)
			alert("El precio del articulo seleccionado es $ " + articulos[i].Precio);
	}
}


// Consulta: articulos con stock menor a 5

function stockMenorCinco() {
	var resultado = "";
	for (var i = 0; i < articulos.length; i++) {
		if (parseInt(articulos[i].Stock) < 5)
			resultado = resultado + articulos[i].Id + " " + articulos[i].Nombre + "\n";
	}
	alert("Los articulos cuyo stock es menor a 5 son: \n" + resultado);

}

