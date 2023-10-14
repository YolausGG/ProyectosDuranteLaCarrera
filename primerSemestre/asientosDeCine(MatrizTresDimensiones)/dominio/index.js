//*** topes de la matriz de 3 dimensiones ***
var numeroDeDias = 7;
var numeroDeFilas = 20;
var numeroDeAsientos = 30;
var matriz;

// Método: Inicializa matriz en Capa Dominio y Dibuja tabla en Capa Presentación
function inicializar() {
	// 	Crea arrays de 3 dimensiones	matriz[i][j][k]
	// 		i = días
	//		j = filas
	//		k = asientos (o columnas o celdas)
	
	
	// crea el vector de días
	matriz = new Array(); 
	for (var i = 0; i < numeroDeDias; i++) {
	
		// crea el vector de filas para cada día
		matriz[i] = new Array(); 
		
		for (var j = 0; j < numeroDeFilas; j++) {
		
			// crea el vector de asientos para cada fila
			matriz[i][j] = new Array(); 
			for (var k = 0; k < numeroDeAsientos; k++) {
				
// asignamos "V" de vacío en asiento "k" de la fila "j" del día "i"
				matriz[i][j][k] = "V"; 
			}
		}
	}

	// Dibuja la tabla en la capa presentación
	var tabla = document.getElementById("tabla");
	for (var j = 0; j < numeroDeFilas; j++) {
	
		//creo la fila de la tabla
		var fila = document.createElement("tr");
		for (var k = 0; k < numeroDeAsientos; k++) {
		
			//creo las celdas de las filas
			var celda = document.createElement("td");
			
			// agrego celda a la fila
			fila.appendChild(celda);
		}
		
		// agrego fila a la tabla
		tabla.appendChild(fila);
	}
}

// Método: Actualiza la tabla, en función del día seleccionado.
function actualizarTabla() {
	
	// Leer día seleccionado:
	var dia = document.getElementById("dias").selectedIndex;
	
	// Seleccionar el elemento tabla en la capa presentación:
	var tabla = document.getElementById("tabla");
	
	for (var j = 0; j < numeroDeFilas; j++) {
		for (var k = 0; k < numeroDeAsientos; k++) {

			// Texto en las celdas:
			tabla.rows[j].cells[k].textContent = matriz[dia][j][k];

			// Colores para las celdas, según está ocupado o no:
			if (matriz[dia][j][k] == "O") {
				tabla.rows[j].cells[k].className = "ocupado";
			} else {
				tabla.rows[j].cells[k].className = "vacio";
			}
		}
	}
}

// Método: "Ocupa" el asiento dado el día seleccionado.
function ocuparAsiento() {
	// Leer día, fila y columna seleccionados:
	var dia 	= document.getElementById("dias").selectedIndex;
	var fila 	= parseInt(document.getElementById("fila").value)-1;
	var asiento = parseInt(document.getElementById("columna").value)-1;
	
	
	// Verifica que el asiento no está ocupado.
	if (matriz[dia][fila][asiento] == "O") {
		alert("El asiento ya está ocupado.");
	} else {
		matriz[dia][fila][asiento] = "O";
	}
}

// Método: Recorre la matriz contando el número de asientos ocupados por día.
function cuantosAsientosOcupadosHay() {
	var dias = document.getElementById("dias");
	var respuesta = "";
	for (let dia = 0; dia < numeroDeDias; dia++) {
		var contador = 0;
		for (var j = 0; j < numeroDeFilas; j++) {
			for (var k = 0; k < numeroDeAsientos; k++) {
				if (matriz[dia][j][k] == "V") {
					contador = contador + 1;
				}
			}
		}
		respuesta += dias.options[dia].text + " asientos ocupados: " + contador + "\n";
	}
	alert(respuesta)
}
