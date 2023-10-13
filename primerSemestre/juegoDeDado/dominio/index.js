//Capa de Dominio 
var cara0 = new Image();
cara0.src = "imagenes/inicio.jpg";

var cara1 = new Image();
cara1.src = "imagenes/1uno.jpg";

var cara2 = new Image();
cara2.src = "imagenes/2dos.jpg";

var cara3 = new Image();
cara3.src = "imagenes/3tres.jpg";

var cara4 = new Image();
cara4.src = "imagenes/4cuatro.jpg";

var cara5 = new Image();
cara5.src = "imagenes/5cinco.jpg";

var cara6 = new Image();
cara6.src = "imagenes/6seis.jpg";

var numeroAleatorioJ;
var numeroAleatorioB;

function lanzarDado() {
	var tabla = document.getElementById("tabla");


	for (var i = 0; i < 6; i++)
		tabla.rows[2].cells[i].style.background = "white";


	numeroAleatorioJ = Math.ceil(Math.random() * 6);
	document.images["miDado"].src = eval("cara" + numeroAleatorioJ + ".src");


	numeroAleatorioB = Math.ceil(Math.random() * 6);
	tabla.rows[2].cells[numeroAleatorioB - 1].style.background = "rgb(253, 128, 253)";
	resultado(numeroAleatorioJ, numeroAleatorioB, tabla)

}

function resultado(numeroAleatorioJ, numeroAleatorioB, tabla) {

	if (numeroAleatorioJ != numeroAleatorioB) {
		if (numeroAleatorioJ > numeroAleatorioB) {
			tabla.rows[3].cells[0].innerHTML = "GANA EL JUGADOR";
		} else
			tabla.rows[3].cells[0].innerHTML = "GANA LA BANCA";
	} else
		tabla.rows[3].cells[0].innerHTML = "EMPATE";
}
function nuevoJUEGO() {
	var tabla = document.getElementById("tabla");

	for (var i = 0; i < 6; i++)
		tabla.rows[2].cells[i].style.background = "white";

	document.images["miDado"].src = eval("cara0.src");
	tabla.rows[3].cells[0].innerHTML = "";

}