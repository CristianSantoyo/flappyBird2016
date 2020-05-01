function Obstaculo (x1,ti) {
	
	this.x = x1;	
	this.tipo = ti;
	this.y = 0;
	
	//console.log(this.x);	


	switch(this.tipo){
		case 1:
			this.img = $("#obstaculo")[0];
			this.y = 0;
			break;

		case 2:
			this.img = $("#banshee")[0];
			this.y = Math.floor((Math.random() * 360) + 75)
			break;

		case 3:
			this.img = $("#obstaculo2")[0];
			this.y = 0;
			break;

		case 4:
			this.img = $("#banshee2")[0];
			this.y = Math.floor((Math.random() * 360) + 75)
			break;

		case 5:
			this.img = $("#obstaculo3")[0];
			this.y = 0;
			break;
	}
	
	
	this.cambiar = function(x1,ti){
		this.x = x1;	
		this.tipo = ti;
		switch(this.tipo){
			case 1:
				this.img = $("#obstaculo")[0];
				this.y = 0;
				break;

			case 2:
				this.img = $("#banshee")[0];
				this.y = Math.floor((Math.random() * 360) + 75)
				break;

			case 3:
				this.img = $("#obstaculo2")[0];
				this.y = 0;
				break;

			case 4:
				this.img = $("#banshee2")[0];
				this.y = Math.floor((Math.random() * 360) + 75)
				break;

			case 5:
				this.img = $("#obstaculo3")[0];
				this.y = 0;
				break;
		}
	}


	this.dibujar = function(ctx){
		ctx.drawImage(this.img, this.x, this.y);
	}
}