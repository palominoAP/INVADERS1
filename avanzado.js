//crear variables de la nave
var canvas =document.getElementById('ncanvas');
		var ctx = canvas.getContext("2d");
	    var fondo;
		var nave = {
			x:100,
			y:canvas.height-20,
			width: 30,
			height: 10
			};
		var juego = { estado: 'iniciando'};
		var teclado = {};
		//array para los disparos
		var disparos = [];
		//arreglo para almacenar enemigos
		var enemigos = [];
		/*var enemy = new Array(2);
		var	cantidadEnemigos = 1;

		for(var i = 0; i<enemy.length; i++)
		{
			enemy[i]= {direction:"r",posX:0,posY:0,width:20,height:20};
		}*/
		//definir variable de la imagen
		var fondo;
		//creando menu inicio
			 function Game(gameDiv){
				  var frames = [];
				  var framesNames = [];
				  for(var i=0; i<gameDiv.childNodes.length; i++)
				  {
					  var id = gameDiv.childNodes[i].id;
					  if(id !=undefined){
						  var child = gameDiv.childNodes[i];
						  if(child.classList.contains("frame"))
							  {
								  frames[id] = child;
								  framesNames.push(id);
							  }
					  }
				  }

				  function setFrameVisible(name)
				  {
					  frames[name].classList.remove("hidden");
					  frames[name].classList.add("visible");
				  }
				  function setFrameHidden(name)
				  {
					  frames[name].classList.remove("visible");
					  frames[name].classList.add("hidden");
				  }
				  return {
					  "setFrameVisible": setFrameVisible,
					  "setFrameHidden": setFrameHidden
				  };

			  }
			  window.addEventListener("load", function()
									  {
				  game = new Game(document.getElementById("game"));

			  });
			 var game;


		function loadMedia(){
			fondo = new Image();
			fondo.src = "lo.png";	
			fondo.onload = function(){
			 var intervalo = window.setInterval(frameLoop,1000/55);
			}

		}
		function dibujarFondo(){
			ctx.save();
			ctx.drawImage(fondo,0,0,300,150);
			ctx.restore();
		}
		function dibujarNave(){
			ctx.save();
			ctx.fillStyle = "white";
			ctx.fillRect(nave.x,nave.y,nave.width,nave.height);
			ctx.restore();
		}
	    /*function crearjugadores(color,x,y,width,height){
			ctx.save();
			ctx.fillStyle = color;
			ctx.fillRect(x,y,width,height);
			ctx.restore();
		}*/
		/*function drawenemies(cantidad){
			ctx.save();
			for(var i = 0; i<cantidad; i++){
				ctx.fillStyle = "blue";
				ctx.fillRect(enemy[i].posX,enemy[i].posY,enemy[i].width,enemy[i].height);
			}
			ctx.restore();
		}*/
		function dibujarDisparos(){
			ctx.save();
			ctx.fillStyle = " yellow";
			for(var i in disparos){
				var disparo = disparos[i];
				ctx.fillRect(disparo.x,disparo.y,disparo.width,disparo.height);
			}
			ctx.restore();
		} 
		function dibujarEnemigos(){
			for(var i in enemigos){
				var enemigo = enemigos[i];
				ctx.save();
				if(enemigo.estado== 'vivo'){ctx.fillStyle = "red";}
				if(enemigo.estado== 'muerto'){ctx.fillStyle= "blue";}
				ctx.fillRect(enemigo.x,enemigo.y,enemigo.width,enemigo.height);
			}
		}
		function manejodeTeclados(){
			agregarEvento(document,"keydown",function(a){
				teclado[a.keyCode] = true;
				console.log(a.keyCode);
			});
			agregarEvento(document,"keyup",function(a){
				teclado[a.keyCode] = false;
			});
			function agregarEvento(elemento,nombreevento,funcion){
				if(elemento.addEventListener){
					elemento.addEventListener(nombreevento,funcion,false);
				}
				else if(elemento.attachEvent){
						elemento.attachEvent(nombreevento,funcion);
				}
			}
		}
		function moverNave(){
			if(teclado[37]){
				nave.x -=6;
				if(nave.x < 0){ nave.x = 0;}
			}
			if(teclado[39]){
				var limited = canvas.width - nave.width;
				nave.x +=6;
				if(nave.x > limited){ nave.x = limited;}
			}
			if(teclado[32]){
				if(!teclado.fire){
					fire();
					teclado.fire = true;
				}

			}else
				{
					teclado.fire = false;
				}

		}
		/*function moveEnemis(){
			for(var i = 0;i < cantidadEnemigos; i++){
				switch(enemy[i].direction){
					case "r":
						enemy[i].posX +=2;
						break;
					case "l":
						enemy[i].posX -=2;
						break;
					default:
						enemy[i].posX = enemy[i].posX;
						enemy[i].posY = enemy[i].posY;				
				}
			}
		}*/
		function actualizaEnemigos(){
			if(juego.estado == 'iniciando'){
				for(var i=0;i<8;i++){
					enemigos.push({
						x: 10 + (i*20),
						y: 10,
						height:10,
						width:10,
						estado: 'vivo',
						contador: 0
					});
				}	
			}
			for(var i in  enemigos){
				var enemigo = enemigos[i];
				if(!enemigo){
					continue;
				}
				if(enemigo && enemigo.estado == 'vivo'){
					enemigo.contador++;
					enemigo.x += Math.sin(enemigo.contador * Math.PI /90)*5;
				}
			}

		}
		function moverDisparos(){
			for(var i in disparos){
				var disparo = disparos[i];
				disparo.y -= 3;
			}
			disparos = disparos.filter(function(disparo){
				return disparo.y > 0;
			});
		}
		function fire(){
			disparos.push({
				x: nave.x + 20,
				y: nave.y - 10,
				width: 10,
				height: 10
			});
		}

		function frameLoop(){
			moverNave();
			//moveEnemis();
			actualizaEnemigos();
			moverDisparos();
			dibujarFondo();
			dibujarEnemigos();
			dibujarDisparos();
			dibujarNave();
			//drawenemies(cantidadEnemigos);
		}
		//Ejecucion de funciones
		
		loadMedia();
