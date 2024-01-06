	
	var empleados = [];
	
	function alta(){
		var existeAl = true;
		var todosLosDatos = true;
		
		var id 		 		= document.getElementById("id").value;
		var nombre 	 		= document.getElementById("nombre").value;
		var apellido 		= document.getElementById("apellido").value;
		var remuneracion	= document.getElementById("remuneracion").value;
		
		var hora;
		var valorHora;
		var sueldo;
		
		if(document.getElementById("remuneracion").value == "Mensual"){
			sueldo = parseInt(prompt("Ingrese su sueldo"));
		}
		if(document.getElementById("remuneracion").value == "Jornalero"){
			hora = parseInt (prompt("Ingrese las horas de trabajo"));
			valorHora = parseInt (prompt("Ingrese valor por hora"));
		}
		var todosLosDatos = datosIngresados();
		if(!todosLosDatos){
			alert("Faltan datos, por favor complete todos los campos");
		}
		else{
			var existeAl = existe(id);
			if(!existeAl){
			empleados[empleados.length] = {
					Id:				id,
					Nombre: 		nombre,
					Apellido: 		apellido,
					Remuneracion:	remuneracion,
					Hora:			hora,
					ValorHora:		valorHora,
					Sueldo:			sueldo || hora * valorHora
				};
		
				mostrar();
				limpiar();
			}
			else{
				alert("El empleado ya fue ingresado");
			}
		}
	}
	
	function baja(){
		var id = parseInt(document.getElementById("id").value);
		var pos = buscar(id);
		empleados.splice(pos,1);
		mostrar();
		limpiar();
	}
	
	function buscar(id){
	
		for(var i=0 ; i<empleados.length; i++){
			if(empleados[i].Id == id)
				return(i);
		}
	}
	
	function seleccionar(){
		var lista = document.getElementById("lista");
		var i = lista.selectedIndex;
		document.getElementById("id").value 				= empleados[i].Id;
		document.getElementById("nombre").value 			= empleados[i].Nombre;
		document.getElementById("apellido").value 			= empleados[i].Apellido;
		document.getElementById("remuneracion").value 		= empleados[i].Remuneracion;

	}
	
	function modificar(){
		var id = parseInt(document.getElementById("id").value);
		var i = buscar(id);
		empleados[i].Nombre 		= document.getElementById("nombre").value;
		empleados[i].Apellido 		= document.getElementById("apellido").value;
		empleados[i].Remuneracion 	= document.getElementById("remuneracion").value;
		
		mostrar();
	}
	
	function existe(id){
		for(var i= 0; i<empleados.length; i++){
			if(empleados[i].Id == id)
				return true;
		}
		return false;
	}
	
	 function datosIngresados(){
		if( document.getElementById("id").value       == "" ||
		    document.getElementById("nombre").value   == "" || 
			document.getElementById("apellido").value == "" ||
			document.getElementById("remuneracion").value == "")
			return false;
		else
			return true;
	 }
	 
	// Metodos auxiliares
	
	function mostrar(){
		var lista = document.getElementById("lista");
		lista.innerHTML = "";
		
		for(var i=0; i<empleados.length; i++){
		
			var renglon = document.createElement("option");
			renglon.text =  empleados[i].Id+" "+
							empleados[i].Nombre+" "+
							empleados[i].Apellido+" "+
							empleados[i].Remuneracion+" "+"$ "+
							empleados[i].Sueldo;
							
			lista.add(renglon);				
		}
	}
	
	function limpiar(){
		document.getElementById("miForm").reset();
	}
	
	function isNumberKey(evt){
		var charCode = (evt.which) ? evt.which : event.KeyCode;
		return !(charCode > 31 && (charCode < 48 || charCode > 57));
	}
	
	// Consulta: empleado mensual o jornalero y lo ganado
	
	function mensualOJornalero(){
		var id = parseInt(prompt("Ingrese la id"));
		
		for(var i=0 ; i<empleados.length; i++){
			if(empleados[i].Id == id)
		alert("El empleado seleccionado es "+empleados[i].Remuneracion+" y su sueldo es $ "+empleados[i].Sueldo);
		}
	}
	// Consulta: promedio de todos los sueldos
	
	function promedioDeSueldos(){
		var resultadoFinal = 0;
		var resultadoMensual = 0;
		var resultadoJornaleros = 0;
		
		for(var i=0 ; i<empleados.length; i++){
		
			if(empleados[i].Remuneracion == "Mensual")
				resultadoMensual = resultadoMensual + empleados[i].Sueldo;
			if(empleados[i].Remuneracion == "Jornalero")
				resultadoJornaleros = resultadoJornaleros + empleados[i].Sueldo;
		}
		
		resultadoFinal = (resultadoMensual + resultadoJornaleros)/empleados.length;
	
		alert("El promedio de todos los sueldos es: "+resultadoFinal)
		alert("Mensuales: "+resultadoMensual)
		alert("Jornaleros: "+resultadoJornaleros)
		
	}
	// Consulta: empleado que ganó menos
	
	function empleadoMenosPagado(){

		var resultadoMensual = 0;
		
		for(var i=0 ; i<empleados.length; i++){
			if(empleados[i].Sueldo < empleados[resultadoMensual].Sueldo){
				
				resultadoMensual = i;
			}				
		}
		alert("El empleado menor pagado es "+empleados[resultadoMensual].Nombre+" "+
		empleados[resultadoMensual].Apellido+" con: $"+empleados[resultadoMensual].Sueldo);
		
	}