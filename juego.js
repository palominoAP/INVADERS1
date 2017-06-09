//<script>
	    
			var canvas =document.getElementById('ncanvas');
			var ctx = canvas.getContext("2d");
	        var fondo;
			
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
			
			var jugador = {direction: "r", posX:10, posY:100, width:100, height:10};
						   
			function loadMedia(){
			fondo = new Image();
			fondo.src = "lo.png";	
			fondo.onload = function(){
			 var intervalo = window.setInterval(frameLoop, 1000/55);
			}
			
			}
			function dibujarFondo(){
				ctx.save();
				ctx.drawImage(fondo,0,0,300,150);
				ctx.restore();
			}
	 
            function crearnave(){
				ctx.save();
				ctx.fillStyle = "yellow";
				ctx.fillRect(jugador.posX, jugador.posY, jugador.width, jugador.height);
				ctx.restore();
			}
	         $(document).keydown(function(event){
				var key = event.which;
				switch(key){
					case "39":
						jugador.direction = "r";
						break;
					case "37":
						jugador.direction = "l";
						break;
					case "38":
						jugador.direction = "t";
						break;
					case "40":
						jugador.direction = "d";
						break;
				}
			})
			 function frameLoop(){
				 dibujarFondo();
				 crearnave();
				 moverNave();
			 }
	   
	        function moverNave(){
				switch(jugador.direction){
					case "r":
						jugador.posX +=10;
						break;
					case "l":
						jugador.posX -=10;
						break;
					case "t":
						jugador.posY +=10;
						break;
					case "d":
						jugador.posY -=10;
						break;
					default:
						jugador.posX = jugador.posX;
						jugador.posY = jugador.posY;
				}
			}
			
			loadMedia();
	 			
	        

  //</script>
  
