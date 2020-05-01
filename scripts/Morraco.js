function Morraco(){
	
	this.x = 240;
	this.y = 220;
	this.img = $("#morraco")[0];
	this.saltando = false;	
	this.t = 0;	


	this.dibujar = function(ctx){
		ctx.drawImage(this.img, this.x, this.y);
	}

	this.saltar = function(){
		this.saltando = true;
	}
	
	this.actualizar = function(accion){
		if (accion == "arriba")
			this.y -= 10;
		if (accion == "abajo")
			this.y += 10;
		if (accion == "derecha")
			this.x += 10;
		if (accion == "izquierda")
			this.x -= 10;			
	}
	
	
	
}
