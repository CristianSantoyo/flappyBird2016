$(document).ready(inicio);
$(document).keydown(captura);

function inicio() {
	lienzo = $("#lienzo")[0];
	fondo = $("#fondo")[0];

	fondoX = 0;	
	contexto = lienzo.getContext("2d");
	buffer = document.createElement("canvas");
	console.log(contexto);
	puntaje = 0;
	muerto = false;

	morraco = new Morraco();
	obstaculo[0] = new Obstaculo(640, Math.floor((Math.random() * 5) + 1));
	obstaculo[1] = new Obstaculo(940, Math.floor((Math.random() * 5) + 1));
	obstaculo[2] = new Obstaculo(1240, Math.floor((Math.random() * 5) + 1));
	obstaculo[3] = new Obstaculo(1540, Math.floor((Math.random() * 5) + 1));

	hilito = setInterval(gravedad, 1);
	hilito1 = setInterval(desplazar, 100);
	hilito2 = setInterval(desplazarObstaculo, 5);
	
	juego();
}





function gravedad () {	// Pa que el morraquito se caiga
	if (morraco.saltando == true){
		if (morraco.t < 17){
			if (morraco.y < 0){
				morraco.saltando = false;
			}else{
				morraco.y -= 5;	
			}
						
			morraco.t++;			
		}else{
			morraco.saltando = false;
			morraco.t = 0;
		}			
	}else{
		morraco.y += 1;
	}	
	puntajeM();
	clearInterval(gravedad);
}

function desplazarObstaculo(){   // Pa desplazar los obstaculos

	for (i = 0; i < 4; i++) {	 	
	 	if (obstaculo[i].x < -110)
			obstaculo[i].cambiar(1560, Math.floor((Math.random() * 5) + 1));
	 	

		for (j = 0; j < 4; j++){
			if (i != j){
				if ((Math.abs(obstaculo[i].x - obstaculo[j].x) < 80) && (obstaculo[i].tipo%2 == 1) && (obstaculo[j].tipo%2 == 1)) {
					obstaculo[j].x += 250;
				}
			}			
		}	

		if (obstaculo[i].tipo%2 == 0){			
			obstaculo[i].x -= 2;
		}else{
			obstaculo[i].x -= 1;
		}
	 	
	} 		
	clearInterval(desplazarObstaculo);
}

function desplazar() { // Pa desplazar el fondo
	
	if (fondoX < -490){
		fondoX = 0;
	}	
	fondoX -= 1; 
	clearInterval(desplazar);
}

function puntajeM() {  //Puntaje ¬¬

	for(var i = 0; i < 4; i++) {
		
		if (obstaculo[i].tipo%2 == 0){			
			if(morraco.x == obstaculo[i].x + 90)
				puntaje += 5; 
		
		}else{
			if(morraco.x == obstaculo[i].x + 73)
				puntaje += 10;
		}		
	}

	berificar();
	
}


function berificar(){
	

	if(morraco.y > 480)
		muerto = true;


	for (var i = 0; i < 4; i++){
		
		switch(obstaculo[i].tipo){
			case 1:
				if  (((morraco.x+38 >= obstaculo[i].x) && (morraco.x <= obstaculo[i].x + 72) ) &&  ( (morraco.y <= 148) || (morraco.y+42 >= 310)))
					muerto = true
				break;
			case 2:
				if  (((morraco.x+20 >= obstaculo[i].x) && (morraco.x <= obstaculo[i].x + 89) ) &&  ( (morraco.y+30 >= obstaculo[i].y) && (morraco.y <= obstaculo[i].y + 40)))
					muerto = true
				break;
			case 3:
				if  (((morraco.x+38 >= obstaculo[i].x) && (morraco.x <= obstaculo[i].x + 72) ) &&  ( (morraco.y <= 206) || (morraco.y+42 >= 363)))
					muerto = true
				break;
			case 4:
				if  (((morraco.x+20 >= obstaculo[i].x) && (morraco.x <= obstaculo[i].x + 89) ) &&  ( (morraco.y+30 >= obstaculo[i].y) && (morraco.y <= obstaculo[i].y + 40)))
					muerto = true
				break;
			case 5:
				if  (((morraco.x+38 >= obstaculo[i].x) && (morraco.x <= obstaculo[i].x + 72) ) &&  ( (morraco.y <= 112) || (morraco.y+42 >= 270)))
					muerto = true
				break

		}	

	}
	

	if (muerto == true){		
		
		clearInterval(hilito);
		clearInterval(hilito1);
		clearInterval(hilito2);	
		clearInterval(hilo);
		openVentana();		
	}

}

function openVentana(){
	
	var jq = $(document);
	$("#ventana").slideDown("slow");
	jq.find("#puntuacion").empty();
	jq.find("#puntuacion").append("Su puntuacion fue: " + puntaje);
}

function closeVentana(){
	$("#ventana").slideUp("fast");
	inicio();
}

function juego(){	// el coroto pa el juego y pa pintar
	buffer.width = lienzo.width;
	buffer.height = lienzo.height;
	contextoBuffer = buffer.getContext("2d");	
	contextoBuffer.clearRect(0,0,buffer.width,buffer.height);
	

	contextoBuffer.font = "bold 22px Halo";
	contextoBuffer.fillStyle="white";

	contextoBuffer.drawImage(fondo,fondoX,0);	
	
	for (i = 0; i < 4; i++) {	 	
	 	obstaculo[i].dibujar(contextoBuffer);
	}
	morraco.dibujar(contextoBuffer);
	
	contextoBuffer.fillText("Puntaje: " + puntaje,200 ,50);

	contexto.clearRect(0,0,lienzo.width, lienzo.height);
	contexto.drawImage(buffer,0,0);	
	hilo = setTimeout("juego()", 20);
	
}

function captura(event){ // capturar los saltos
	
	if (event.which == 32)
		morraco.saltar();
	if (event.which == 65)
		inicio();
	if (event.which == 38 || event.which == 87)
		morraco.actualizar("arriba");
	if (event.which == 40 || event.which == 83)
		morraco.actualizar("abajo");
	if (event.which == 39 || event.which == 68)
		morraco.actualizar("derecha");
	if (event.which == 37 || event.which == 65)
		morraco.actualizar("izquierda");		
}
