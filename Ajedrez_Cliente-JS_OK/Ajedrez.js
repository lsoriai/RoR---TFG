var celdas, pieza, antiguo;
var posibles_movimientos = [];
var en_movimiento = false;
var piezas = ["♜", "♞", "♝", "♛", "♚", "♟"];
function start(){
	//Asociamos el atributo onclick a todas las celdas
	celdas = document.querySelectorAll("td");
	for(i=0; i<celdas.length; i++){
		celdas[i].setAttribute("onclick", "juega(this)", false);
	};
	console.log (celdas);
};

function juega(elemento){
console.log(elemento);
	var aceptada = false;
	if(en_movimiento == false && elemento.className != ""){
		antiguo = elemento;
		pieza = elemento.innerHTML;
		elemento.style.opacity = ".4";
		en_movimiento = true;
		posibles_movimientos = posibles_celdas(elemento);
		pintar(posibles_movimientos);
		if (posibles_movimientos == ""){
			elemento.style.opacity = "1";
			en_movimiento = false;
		}
	}else if(en_movimiento == true){
		for(var i=0; i<posibles_movimientos.length; i++){
			if(elemento.id == posibles_movimientos[i]){
				aceptada = true;
			};
		};
		if (aceptada == true){
			elemento.innerHTML = antiguo.innerHTML;
			elemento.className = antiguo.className;
			antiguo.innerHTML = "";
			antiguo.style.opacity = "1";
			antiguo.className = "";
			en_movimiento = false;
			estilo_original(posibles_movimientos);
		};
	};
};

function pintar (celdas_posibles){
	//console.log("DENTRO DE PINTAR : "+celdas_posibles);
	/*if (celdas_posibles.length = 0){
		game_over();
	}*/
	var celdas = celdas_posibles
	for (var i=0; i<celdas.length; i++){
		var celda = celdas[i].toString();
		fila = celda.substr(0,1);
		columna = celda.substr(1,2);
		//console.log(celda+fila);
		document.getElementById(fila+columna).style.backgroundColor = "orange";
		if(fila % 2 == 0 && columna % 2 == 1){
			document.getElementById(fila+columna).style.opacity = ".6";
		}else if(fila % 2 == 1 && columna % 2 == 0){
			document.getElementById(fila+columna).style.opacity = ".6";
		}else{
			document.getElementById(fila+columna).style.opacity = ".3";
		};
	};
};

function estilo_original (celdas){
	for (i=0; i<celdas.length; i++){
		celda = celdas[i];
		fila = celda.substr(0,1);
		columna = celda.substr(1,2);
		document.getElementById(fila+columna).style.backgroundColor = "";
		document.getElementById(fila+columna).style.cssText = "";
	};
};

function posibles_celdas(elemento){
	var posicion_pieza = elemento.id;
	fila = posicion_pieza.substr(0,1);
	columna = posicion_pieza.substr(1,2);
	var celdas_ocupadas = localiza_piezas();
	for (var pos = 0; pos < piezas.length; pos++){
		if (piezas[pos] == pieza){
			if (pos == 0){
				console.log("es una torre");
				return (movimiento_torre(fila, columna, celdas_ocupadas));
			}else if (pos == 1){
				console.log("es un caballo");
				return (movimiento_caballo(fila, columna, celdas_ocupadas));
			}else if (pos == 2){
				console.log("es un alfil");
				return(movimiento_alfil(fila, columna, celdas_ocupadas));
			}else if (pos == 3){
				console.log("es una dama");
				return(movimiento_dama(fila, columna, celdas_ocupadas));
			}else if (pos == 4){
				console.log("es un rey");
				return(movimiento_rey(fila, columna, celdas_ocupadas));
			}else if (pos == 5){
				console.log("es un peon");
				return(movimiento_peon(fila, columna, celdas_ocupadas, false));
			}
		}
	}
};

function localiza_piezas(){
	var piezas = [];
	celdas = document.querySelectorAll("td");
	for(var i=0; i<celdas.length; i++){
		if (celdas[i].className != ""){
			piezas.push(celdas[i].id);
		};
	};
	return(piezas);
};

function colision(celda, ocupadas, equipo){
	var aux = 0;
	var choca = false;
	while (choca == false && aux<ocupadas.length){
		if(celda == ocupadas[aux]){
			equipo_choca = document.getElementById(ocupadas[aux]).className;
			if(equipo_choca == equipo){
				return("mismo equipo");
			}else{
				return("diferente equipo");
			};
			choca = true;
		};
		aux++
	};
	return ("no colisiona");
};


function analisis(fila, columna, ocupadas, equipo, mov_posibles){
	var respuesta = colision(fila.toString()+columna.toString(), ocupadas, equipo); 
	if (respuesta != "mismo equipo"){
		mov_posibles.push(fila.toString()+columna.toString());
	};
	if (respuesta != "no colisiona"){
		return true;
	};
	return false;
};

function mov_abajo(fila, columna, ocupadas, mov_posibles){
	var choca = false;
	var fin_tablero = false;
	var contador_fila = fila;
	var contador_columna = columna;
	var equipo = document.getElementById(fila+columna).className;
	while (choca == false && fin_tablero == false){
		contador_fila++;
		if (contador_fila > 8){
			fin_tablero = true;
		}else{
			choca = analisis(contador_fila, columna, ocupadas, equipo, mov_posibles);
		};
	};
};

function mov_arriba(fila, columna, ocupadas, mov_posibles){
	var choca = false;
	var fin_tablero = false;
	var contador_fila = fila;
	var contador_columna = columna;
	var equipo = document.getElementById(fila+columna).className;
	while (choca == false && fin_tablero == false){
		contador_fila--;
		if (contador_fila < 1){
			fin_tablero = true;
		}else{
			choca = analisis(contador_fila, columna, ocupadas, equipo, mov_posibles);
		};
	};
};
	
function mov_derecha(fila, columna, ocupadas, mov_posibles){
	var choca = false;
	var fin_tablero = false;
	var contador_fila = fila;
	var contador_columna = columna;
	var equipo = document.getElementById(fila+columna).className;
	while (choca == false && fin_tablero == false){
		contador_columna++;
		if (contador_columna > 8){
			fin_tablero = true;
		}else{
			choca = analisis(fila, contador_columna, ocupadas, equipo, mov_posibles);
		};
	};
};

function mov_izquierda(fila, columna, ocupadas, mov_posibles){
	var choca = false;
	var fin_tablero = false;
	var contador_fila = fila;
	var contador_columna = columna;
	var equipo = document.getElementById(fila+columna).className;
	while (choca == false && fin_tablero == false){
		contador_columna--;
		if (contador_columna < 1){
			fin_tablero = true;
		}else{
			choca = analisis(fila, contador_columna, ocupadas, equipo, mov_posibles);
		};
	};
};

function mov_arriba_izquierda(fila, columna, ocupadas, mov_posibles){
	var choca = false;
	var fin_tablero = false;
	var contador_fila = fila;
	var contador_columna = columna;
	var equipo = document.getElementById(fila+columna).className;
	while (choca == false && fin_tablero == false){
		contador_fila--;
		contador_columna--;
		if (contador_columna < 1 || contador_fila < 1){
			fin_tablero = true;
		}else{
			choca = analisis(contador_fila, contador_columna, ocupadas, equipo, mov_posibles);
		};
	};
};

function mov_abajo_izquierda(fila, columna, ocupadas, mov_posibles){
	var choca = false;
	var fin_tablero = false;
	var contador_fila = fila;
	var contador_columna = columna;
	var equipo = document.getElementById(fila+columna).className;
	while (choca == false && fin_tablero == false){
		contador_fila++;
		contador_columna--;
		if (contador_columna < 1 || contador_fila > 8){
			fin_tablero = true;
		}else{
			choca = analisis(contador_fila, contador_columna, ocupadas, equipo, mov_posibles);
		};
	};
};

function mov_abajo_derecha(fila, columna, ocupadas, mov_posibles){
	var choca = false;
	var fin_tablero = false;
	var contador_fila = fila;
	var contador_columna = columna;
	var equipo = document.getElementById(fila+columna).className;
	while (choca == false && fin_tablero == false){
		contador_fila++;
		contador_columna++;
		if (contador_columna > 8 || contador_fila > 8){
			fin_tablero = true;
		}else{
			choca = analisis(contador_fila, contador_columna, ocupadas, equipo, mov_posibles);
		};
	};
};

function mov_arriba_derecha(fila, columna, ocupadas, mov_posibles){
	var choca = false;
	var fin_tablero = false;
	var contador_fila = fila;
	var contador_columna = columna;
	var equipo = document.getElementById(fila+columna).className;
	while (choca == false && fin_tablero == false){
		contador_fila--;
		contador_columna++;
		if (contador_columna > 8 || contador_fila < 1){
			fin_tablero = true;
		}else{
			choca = analisis(contador_fila, contador_columna, ocupadas, equipo, mov_posibles);
		};
	};
};

function mov_en_L (fila, columna, ocupadas, mov_posibles){
	var pos_caballo = [(parseInt(fila)+2).toString() + (parseInt(columna)+1).toString(),
					   (parseInt(fila)+2).toString() + (parseInt(columna)-1).toString(),
					   (parseInt(fila)-2).toString() + (parseInt(columna)+1).toString(),
					   (parseInt(fila)-2).toString() + (parseInt(columna)-1).toString(),
					   (parseInt(fila)+1).toString() + (parseInt(columna)+2).toString(),
					   (parseInt(fila)-1).toString() + (parseInt(columna)+2).toString(),
					   (parseInt(fila)+1).toString() + (parseInt(columna)-2).toString(),
					   (parseInt(fila)-1).toString() + (parseInt(columna)-2).toString()];
	var equipo = document.getElementById(fila+columna).className;
	for (var i=0; i<pos_caballo.length; i++){
		var fila = pos_caballo[i].substr(0,1);
		var columna = pos_caballo[i].substr(1,2);
		if ((parseInt(fila)<9 && parseInt(fila)>0) && (parseInt(columna)<9 && parseInt(columna)>0) && pos_caballo[i].length == 2){
			var respuesta = colision(fila+columna, ocupadas, equipo);
			if (respuesta != "mismo equipo"){
				mov_posibles.push(fila.toString()+columna.toString());
			};
			if (respuesta != "no colisiona"){
				choca =true;
			};
		};
	};
};

function mov_peon (fila, columna, ocupadas, mov_posibles, rey){
	var equipo = document.getElementById(fila+columna).className;
	if (rey == true){
		if (equipo == "ficha_negra"){
			var pos_peon = [(parseInt(fila)+1).toString() + (parseInt(columna)-1).toString(),
							(parseInt(fila)+1).toString() + (parseInt(columna)+1).toString()];
		}else{
			var pos_peon = [(parseInt(fila)-1).toString() + (parseInt(columna)-1).toString(),
							(parseInt(fila)-1).toString() + (parseInt(columna)+1).toString()];
		};
	}else{
		if (fila == 2 && equipo == "ficha_negra"){
			var pos_peon = [(parseInt(fila)+1).toString() + columna,
							(parseInt(fila)+2).toString() + columna,
							(parseInt(fila)+1).toString() + (parseInt(columna)-1).toString(),
							(parseInt(fila)+1).toString() + (parseInt(columna)+1).toString()];
		}else if(fila == 7 && equipo == "ficha_blanca"){
			var pos_peon = [(parseInt(fila)-1).toString() + columna,
							(parseInt(fila)-2).toString() + columna,
							(parseInt(fila)-1).toString() + (parseInt(columna)-1).toString(),
							(parseInt(fila)-1).toString() + (parseInt(columna)+1).toString()];
		}else if (equipo == "ficha_blanca"){
			var pos_peon = [(parseInt(fila)-1).toString() + columna,
							(parseInt(fila)-1).toString() + (parseInt(columna)-1).toString(),
							(parseInt(fila)-1).toString() + (parseInt(columna)+1).toString()];
		}else if (equipo == "ficha_negra"){
			var pos_peon = [(parseInt(fila)+1).toString() + columna,
							(parseInt(fila)+1).toString() + (parseInt(columna)-1).toString(),
							(parseInt(fila)+1).toString() + (parseInt(columna)+1).toString()];
		};
	};
	for (var i=0; i<pos_peon.length; i++){
		var fila = pos_peon[i].substr(0,1);
		var columna = pos_peon[i].substr(1,2);
		if ((parseInt(fila)<9 && parseInt(fila)>0) && (parseInt(columna)<9 && parseInt(columna)>0)){
			var respuesta = colision(fila+columna, ocupadas, equipo);
			if (pos_peon.length == 3){
				if (i == 0 && respuesta == "no colisiona"){
					mov_posibles.push(fila.toString()+columna.toString());
				}else if (i != 0 && respuesta == "diferente equipo"){
					mov_posibles.push(fila.toString()+columna.toString());
				};
			}else if (pos_peon.length == 4){
				 if((i == 0 || i == 1) && respuesta == "no colisiona"){
				 	mov_posibles.push(fila.toString()+columna.toString());
				 }else if((i == 2 || i == 3) && respuesta == "diferente equipo"){
				 	mov_posibles.push(fila.toString()+columna.toString());
				 };
			}else if (pos_peon.length == 2){
				mov_posibles.push(fila.toString()+columna.toString());
			};
		};
	};
	return mov_posibles;
};

function posibles_pos_rey (fila, columna, ocupadas, equipo, mov_posibles){
	var pos_rey = [(parseInt(fila)+1).toString() + columna,
				   (parseInt(fila)-1).toString() + columna,
				   fila + (parseInt(columna)+1).toString(),
				   fila + (parseInt(columna)-1).toString(),
				   (parseInt(fila)-1).toString() + (parseInt(columna)-1).toString(),
				   (parseInt(fila)-1).toString() + (parseInt(columna)+1).toString(),
				   (parseInt(fila)+1).toString() + (parseInt(columna)+1).toString(),
				   (parseInt(fila)+1).toString() + (parseInt(columna)-1).toString()];
	//hacemos comprobacion para descartar las posiciones que se salen del tablero
	for (var i=0; i<pos_rey.length; i++){
		var fila = pos_rey[i].substr(0,1);
		var columna = pos_rey[i].substr(1,2);
		if ((parseInt(fila)<9 && parseInt(fila)>0) && (parseInt(columna)<9 && parseInt(columna)>0)){
			var respuesta = colision(fila+columna, ocupadas, equipo);
			if (respuesta != "mismo equipo"){
				mov_posibles.push(fila.toString()+columna.toString());
			};
			if (respuesta != "no colisiona"){
				choca =true;
			};
		};
	};
	return mov_posibles
};

function celdas_atacadas (pos_piezas_contrarias, celda_rey){
	var ocupadas = localiza_piezas();

	//Quitamos la posicion del rey para que las iterativas no tenga en cuenta que se choca
	var encontrado = false;
	var aux = 0;
	while (encontrado == false){
		if (ocupadas[aux] ==celda_rey){
			ocupadas.splice(aux, 1);
			encontrado = true;
		};
		aux++;
	};

	//Calculamos las celdas que van a ser atacadas por todas las piezas
	var celdas_atacadas = [];
	for(var i = 0; i<pos_piezas_contrarias.length; i++){
		fila = pos_piezas_contrarias[i].id.substr(0,1);
		columna = pos_piezas_contrarias[i].id.substr(1,2);
		pieza = pos_piezas_contrarias[i].innerHTML;

		console.log (fila, columna, pieza);
		if (pieza == piezas[0]){
			posiciones = movimiento_torre(fila, columna, ocupadas);
		}else if (pieza == piezas[1]){
			posiciones = movimiento_caballo(fila, columna, ocupadas);
		}else if (pieza == piezas[2]){
			posiciones = movimiento_alfil(fila, columna, ocupadas);
		}else if (pieza == piezas[3]){
			posiciones = movimiento_dama(fila, columna, ocupadas);
		}else if (pieza == piezas[5]){
			posiciones = movimiento_peon(fila, columna, ocupadas, true);
		};
		for (var k = 0; k<posiciones.length; k++){
			var igual = false;
			var aux = 0;
			while ((celdas_atacadas.length>aux) && (igual == false)){
				if (posiciones[k]==celdas_atacadas[aux]){
					igual = true;
				};
				aux++;
			};
			if (igual == false){
				celdas_atacadas.push(posiciones[k]);
			};
		};
	};
	return celdas_atacadas;
};

function mov_rey (fila, columna, ocupadas, mov_posibles){
	var equipo = document.getElementById(fila+columna).className;
	var pos_rey = posibles_pos_rey (fila, columna, ocupadas, equipo, mov_posibles);

	//analizamos quien es el equipo que mueve, el contrario ataca y calculamos a que celdas
	if (equipo == "ficha_blanca"){
		var piezas_ataque = document.getElementsByClassName("ficha_negra");
	}else{
		var piezas_ataque = document.getElementsByClassName("ficha_blanca");
	};
	var mov_prohibido = celdas_atacadas (piezas_ataque, fila+columna);
	//console.log ("LAS CELDAS DONDE PODRÍA MOVER EL REY SON: "+pos_rey);
	//console.log ("LAS CELDAS DONDE TIENE PROHIBIDO MOVER: "+mov_prohibido);

	//Comparamos y eliminamos aquellas en las que coincide el rey con atacada
	for (var i = 0; i<pos_rey.length; i++){
		var encontrado = false;
		var aux = 0;
		while((encontrado == false) && (aux<mov_prohibido.length)){
			if (pos_rey[i] == mov_prohibido[aux]){
				encontrado = true;
				pos_rey.splice(i, 1);
				i--;
			};
			aux++;
		};
	};
};	
		
function movimiento_torre (fila, columna, celdas_ocupadas){
	var mov_posibles = [];
	mov_abajo (fila, columna, celdas_ocupadas, mov_posibles);
	mov_arriba (fila, columna, celdas_ocupadas, mov_posibles);
	mov_derecha (fila, columna, celdas_ocupadas, mov_posibles);
	mov_izquierda (fila, columna, celdas_ocupadas, mov_posibles);
	return mov_posibles;
};

function movimiento_alfil (fila, columna, celdas_ocupadas){
	var mov_posibles = [];
	mov_abajo_derecha (fila, columna, celdas_ocupadas, mov_posibles);
	mov_arriba_derecha (fila, columna, celdas_ocupadas, mov_posibles);
	mov_abajo_izquierda (fila, columna, celdas_ocupadas, mov_posibles);
	mov_arriba_izquierda (fila, columna, celdas_ocupadas, mov_posibles);
	return mov_posibles;
};

function movimiento_dama (fila, columna, celdas_ocupadas){
	var mov_posibles = [];
	mov_abajo (fila, columna, celdas_ocupadas, mov_posibles);
	mov_arriba (fila, columna, celdas_ocupadas, mov_posibles);
	mov_derecha (fila, columna, celdas_ocupadas, mov_posibles);
	mov_izquierda (fila, columna, celdas_ocupadas, mov_posibles);
	mov_abajo_derecha (fila, columna, celdas_ocupadas, mov_posibles);
	mov_arriba_derecha (fila, columna, celdas_ocupadas, mov_posibles);
	mov_abajo_izquierda (fila, columna, celdas_ocupadas, mov_posibles);
	mov_arriba_izquierda (fila, columna, celdas_ocupadas, mov_posibles);
	return mov_posibles;
};

function movimiento_caballo (fila, columna, celdas_ocupadas){
	var mov_posibles = [];
	mov_en_L (fila, columna, celdas_ocupadas, mov_posibles);
	return mov_posibles;
};

function movimiento_peon (fila, columna, celdas_ocupadas, rey){
	var mov_posibles = [];
	mov_peon (fila, columna, celdas_ocupadas, mov_posibles, rey);
	return mov_posibles;
};

function movimiento_rey (fila, columna, celdas_ocupadas){
	var mov_posibles = [];
	mov_rey (fila, columna, celdas_ocupadas, mov_posibles);
	return mov_posibles;
};
