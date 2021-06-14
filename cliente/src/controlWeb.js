function ControlWeb($){
	var yo=this;
	var principal;
	var canvas;
	var btn;
	var angulo;
	var divAngulo;
	var ang;
	var confirm = false;
	var seleccion;
	var logeado=false;
	var toLogOut	=false;

	this.confirmarLogOut=function(){
		cw.dialogoLogOut("¿Esta seguro?","Asegurese de que desea cerrar sesión", "logout");
	}
	this.logOut=function(){
	  		cw.limpiar();
	        document.getElementById("myMain").appendChild(cw.seleccion);
	        //document.getElementById('entrar').click();
	}
	this.primerMenu=function(){
		//funcion_primera();
		$('#contenedorMenuPrincipal2').remove();
		var primero = '<div class="contenedor" id="contenedorMenuPrincipal2">';
        primero+='<section class="info" id="main">';
          primero+='<article class="infoColumna">';
              primero+='<div class="image-take">';
                primero+='<label for="btnRegistro">';
                    primero+='<img src="cliente/img/registro.png" alt ="Click aquí para registrarte" title ="Click aquí para registrarte"> ';
                primero+='</label>';
                primero+='<input id="btnRegistro" name="registro" type="button" style="display: none;">';
                primero+='<h2 class="infoTitulo">Registrarse</h2>';
              primero+='</div>';
          primero+='</article>';
          primero+='<article class="infoColumna">';
              primero+='<div class="image-take">';
                primero+='<label for="btnInicio">';
                    primero+='<img src="cliente/img/login.png" alt ="Click aquí para iniciar sesión" title ="Click aquí para iniciar sesión">';
                primero+='</label>';
                primero+='<input id="btnInicio" name="inicio" type="button" style="display: none;">';
                primero+='<h2 class="infoTitulo">Iniciar Sesión</h2>';
              primero+='</div></article></section></div>';
        $('#contenedorMenuPrincipal').append(primero);

        $('#btnRegistro').click(function(){
        	console.log("LLEGA");
	        cw.mostrarRegistroMedico();
	        //document.getElementById('entrar').click();
	        //if('#btnFotoPaciente').isClicked()
	    });

	    $('#btnInicio').click(function(){
	        cw.mostrarLogin();
	        //document.getElementById('entrar').click();
	        //if('#btnFotoPaciente').isClicked()
	    });

	}

	this.menuFoto=function(){
		funcion_primera();
		this.limpiar();
		//$('#btnFoto').remove();
		var menu = '<div class="contenedor" id="contenedorPrincipal">';
		 menu +='<div id="atras" class="atras">';
	  	menu+='<div class="btnAtras" style="margin-right: 30%;">';
	        menu+='<label for="atrasBtn">';
	          menu+='<h1 class="icon-back" alt ="Click aquí para volver atras" title ="Click aquí para volver atras"></h1></label>';
	        menu+='<input id="atrasBtn" type="button" class="atrasBtn" value="Atras" >';
	      menu+='</div>';
	    menu+='</div>';
			menu += '<div class="resultado" id="canvasPosition" style="visibility: hidden;"></div>';
				menu += '<div id="ang"></div>';
				menu += '<div id="btnDownload"></div>';
				menu += '<section class="info" id="main">';
					menu += '<article style="visibility: hidden;">';
						menu += '<script type="text/javascript" src="cliente/src/sketch.js"></script>';
					menu += '</article>';
					menu += '<article class="infoColumna">';
						menu += '<form id="subir">';
							menu += '<div class="image-take">';
								menu += '<label for="file-input"><img src="cliente/img/camara.png" alt ="Click aquí para hacer tu foto" title ="Click aquí para tomar tu foto"></label>';
								menu += '<input id="file-input" name="foto" type="file"/ accept="image/*" capture="camera">';
								menu += '<h2 class="infoTitulo">Click en la imagen para tomar foto</h2>';
							menu += '</div>';
						menu += '</form>';
					menu += '</article>';
					menu += '<article class="infoColumna">';
						menu += '<form id="subir2">';
							menu += '<div class="image-take">';
								menu += '<label for="btnSelect"><img src="cliente/img/select.gif" alt ="Click aquí para seleccionar una foto" title ="Click aquí para seleccionar una foto"></label>';
								menu += '<input id="btnSelect" name="select" type="file"/ accept="image/*">';
                				menu += '<h2 class="infoTitulo">Click en la imagen para seleccionar una foto</h2>';
							menu += '</div>';
						menu += '</form>';
					menu += '</article>';
					menu += '<article class="infoColumna">';
            			menu += '<div class="image-upload">';
							menu += '<label for="btnUpload"><img src="cliente/img/cargar1.gif" alt ="Click aquí para subir tu foto" title ="Click aquí para subir tu foto"></label>';
							menu += '<input id="btnUpload" name="upload" type="button" style="display: none;" onclick="onUpload();"/>';
							menu += '<h2 class="infoTitulo">Click en la imagen para subir foto</h2>';
						menu += '</div>';
					menu += '</article>';
				menu += '</section>';
			menu += '</div>';

		$('#menuFoto').append(menu);

		$('#atrasBtn').click(function(){
	    	cliR.mostrarAngulos();
	    });
	}


	this.mostrarLogin=function(){
		if(document.getElementById('salir').style.display=="contents")document.getElementById('salir').style.display="none";
		funcion_primera();
		this.seleccion=document.getElementById("contenedorMenuPrincipal");
		//cliR.guardarMenu(document.getElementById('contenedorMenuPrincipal'));
		$('#login').remove();
	  	this.limpiar();
	  	cliR.eliminarCookies();
	  	//$('#contenedorMenuPrincipal').remove();
	  	//$('#btnFoto').remove();

	  	var cadena='<div id="login" class="login">';
	  	cadena+='<div id="atras" class="atras">';
	  	cadena+='<div class="btnAtras" style="margin-right: 30%;">';
	        cadena+='<label for="atrasBtn">';
	          cadena+='<h1 class="icon-back" alt ="Click aquí para volver atras" title ="Click aquí para volver atras"></h1></label>'
	        cadena+='<input id="atrasBtn" type="button" class="atrasBtn" value="Atras" >';
	      cadena+='</div>';
	    cadena+='</div>';
	  	cadena=cadena+'<h2 id="cabeceraP">Inicio de sesión</h2><div id="ig1" class="input-group" style="margin-bottom:25px">';
	  	cadena=cadena+'<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>';
	  	cadena=cadena+'<input id="email" type="text" class="form-control" name="email" placeholder="Escribe tu email"></div>';
	  	cadena=cadena+'<div id="ig2" class="input-group" style="margin-bottom:25px">';
	  	cadena=cadena+'<span class="input-group-addon" ><i class="glyphicon glyphicon-lock"></i></span>';
	  	cadena=cadena+'<input id="clave" type="password" class="form-control" name="password" placeholder="Escribe tu clave"></div>';
	  	cadena = cadena + '<p id="nombreBtn" style="text-align: center;"><button type="button" id="nombreBtn" class="btn btn-primary btn-md" style="margin-right:10%;">Iniciar sesión</button>';
	  	cadena = cadena +'<button type="button" id="cancel" class="btn btn-primary btn-md" style="background-color:grey; margin-left:10%;margin-top:2%">Cancelar</button>';
	  	cadena=cadena+'</p></div>';
	  	$('#cabecera').append(cadena);

	  	$('#cancel').click(function(){
	  		cw.limpiar();
	  		cw.primerMenu();
	        document.getElementById("myMain").appendChild(cw.seleccion);
	        //document.getElementById('entrar').click();
	        //if('#btnFotoPaciente').isClicked()
	    });

	    $('#atrasBtn').click(function(){
	    	//this.seleccion=document.getElementById("contenedorMenuPrincipal");
	    	cw.limpiar();
	        //document.getElementById("myMain").appendChild(cw.seleccion);
	        yo.primerMenu();
	    });

	    $('#logOut').click(function(){
	  	  cw.toLogOut = true;
          funcion_primera();
          //document.getElementById('entrar').click();
          //if('#btnFotoPaciente').isClicked()
      });

	  	$('#email').blur(function() {
	    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
	    
	    if (testEmail.test(this.value) ) {
	      	$('#nombreBtn').unbind("click").on('click',function(){
	        	var nombre=$('#email').val();
	        	var clave=$('#clave').val();
	        	//$('#nombre').remove();
	        	$('#login').remove();
	        	$('#nombreBtn').remove();  
	        	cw.logeado=true; 
	        	cliR.loginUsuario(nombre,clave);
	      	});
	      	$('#refRecordar').on('click',function(){
	        	var nombre=$('#email').val();        
	        	enviarClave(nombre);
	      	});
	    }
	    else
	      	yo.mostrarModal("Advertencia!","Debe ser una dirección de email","yellow");
	  	});
	}

	this.menuAngulo=function(lista){
		funcion_primera();
		this.limpiar();
		//cliR.eliminarCookies();
		var cadena = '<div id="menuAng" class="nuevoP">';
		cadena+='<div id="atras" class="atras">';
			cadena+='<div class="btnAtras" style="margin-right: 30%;">';
		        cadena+='<label for="atrasBtn">';
		          cadena+='<h1 class="icon-back" alt ="Click aquí para volver atras" title ="Click aquí para volver atras"></h1></label>'
		        cadena+='<input id="atrasBtn" type="button" class="atrasBtn" value="Atras" >';
		      cadena+='</div>';
		    cadena+='</div>';
		    cadena += '<div class="nombreMedico"><h4 >'+cw.nombrePaciente()+'</h4></div>';
			cadena += '<h2 id="altaP">Nueva Foto</h2>';
				cadena += '<div class="image-nuevo">';
					cadena += '<label for="btnNuevaF"><img src="cliente/img/nuevoP.png" alt ="Click aquí para tomar una foto" title ="Click aquí para tomar una nueva foto"></label>';
					cadena += '<input id="btnNuevaF" name="nuevaF" type="button" style="display: none;" onclick="onFoto();"/>';
		cadena += '</div></div>';

		cadena += '<div id="listaAngulos" class="listaPacientes">'
		cadena += '<h2 id="titleP" style="justify-content: flex-start;">Historial</h2>';
			
		cadena += this.obtenerAngulos(lista.retorno);
		cadena += '</div>';

		$('#menuAngulos').append(cadena);

		$('#atrasBtn').click(function(){
	    	cliR.obtenerListaPacientes();
	    });

	    $(".list-group a").click(function(){
	        StoreValue = [];
	        StoreValue.push($(this).attr("value"));
	        //document.getElementById('entrar').click();
	        //if('#btnFotoPaciente').isClicked()
	    })
		$('#btnDeleteAngulo').click(function(){
	          id=StoreValue[0];//$("#lista").val();
	          console.log(id);
	          //var nick=$('#nick').val();
	          if(id)
	          	cliR.confirmar(id, "deleteAng");
	          	//cw.dialogoConfirmacion("¿Esta seguro?","Asegurese de que desea eliminar el paciente", id);
	          
	    });
	}

	this.guardarP=function(){
		this.seleccion=document.getElementById("contenedorMenuPrincipal");
	}

	this.obtenerAngulos=function(lista){
		console.log(lista);
		console.log(lista.length);
		var cadena='<div id="listadoAngulos"><div class="list-group" id="lista">';
	    if(lista.length == 0){
	    	cadena = cadena + '<h3 id="noP" class="col text-center" style="color: black;"><p>No hay angulos registrados</p></h3></div></div>';
	    	return cadena;
	    }
	    for(var i=0;i<lista.length;i++){
	        var nombre=lista[i].nombre;
	        var apellido=lista[i].apellido;
	        var fecha=lista[i].fecha;
	        var angulo = lista[i].ang;
	        var _id= lista[i]._id;
	        cadena=cadena+'<a href="#" value="'+_id+'" class="list-group-item a-jugadores"><table class="tableListaA"><tr><td><span class="badge"><h4>'+fecha+'</h4></span></td><td><span class="badge"><h4>'+angulo+'</h4></span></td><td>'+this.botonesAngulo()+'</td></tr></table></a>';
	    } 
	    cadena=cadena+'</div>';
	    //cadena=cadena+'</div>';
	    cadena=cadena+'<input type="button" class="btn btn-primary center" id="entrar" value="Seleccionar" style="margin-bottom:5%; display:none;"></button>';
	    cadena = cadena + '</div></div>';
	    return cadena;
	}

	this.botonesAngulo=function(){
		var cadena = '<div id="botonesAng" class="botones">';
		cadena+= '<div class="btnPaciente"><label for="btnDeleteAngulo">';
		cadena += '<h1 class="icon-delete" alt ="Click aquí para eliminar el angulo" title ="Click aquí para eliminar el angulo"></h1></label>';
		cadena+='<input id="btnDeleteAngulo" type="button" class="btnFinal" value="delete"></div></div>';



		return cadena;
	}

	this.nombreMedico=function(){
		var nombre = cliR.obtenerMedico();
		return nombre;
	}
	this.nombrePaciente = function(){
		return cliR.obtenerPaciente();
	}

	this.mostrarMenuP=function(lista){
		if(document.getElementById('salir').style.display=="none"){document.getElementById('salir').style.display="contents";};
		var sel = this.seleccion;
		console.log(sel);
		this.limpiar();
		funcion_primera();
		//$('#btnFoto').remove();
		var cadena = '<div id="menuP" class="nuevoP">';
		cadena+='<div id="atras" class="atras">';
			cadena+='<div class="btnAtras" style="margin-right: 30%;">';
		        cadena+='<label for="atrasBtn">';
		          cadena+='<h1 class="icon-back" alt ="Click aquí para volver atras" title ="Click aquí para volver atras"></h1></label>'
		        cadena+='<input id="atrasBtn" type="button" class="atrasBtn" value="Atras" >';
		      cadena+='</div>';
		    cadena+='</div>';
		    cadena += '<div class="nombreMedico"><h4 >'+cw.nombreMedico()+'</h4></div>';
			cadena += '<h2 id="altaP">Nuevo paciente</h2>';
				cadena += '<div class="image-nuevo">';
					cadena += '<label for="btnNuevo"><img src="cliente/img/nuevoP.png" alt ="Click aquí para crear un nuevo paciente" title ="Click aquí para crear un nuevo paciente"></label>';
					cadena += '<input id="btnNuevo" name="nuevo" type="button" style="display: none;" onclick="onMenuPacientes();"/>';
		cadena += '</div></div>';

		cadena += '<div id="pacientesL" class="listaPacientes">'
		cadena += '<h2 id="titleP" style="justify-content: flex-start;">Lista de pacientes</h2>';
			
		cadena += this.obtenerTodos(lista.retorno);
		cadena += '</div>';
		
		$('#menuPacientes').append(cadena);
		$('#atrasBtn').click(function(){
			cw.limpiar();
	        document.getElementById("myMain").appendChild(sel);
	    });
		//StoreValue = [];
	    $(".list-group a").click(function(){
	        StoreValue = [];
	        paciente = $(this);
	        StoreValue.push($(this).attr("value"));
	        //document.getElementById('entrar').click();
	        //if('#btnFotoPaciente').isClicked()
	    });

	    $('#btnFotoPaciente').click(function(){
	        
	          id=StoreValue[0];//$("#lista").val();
	          console.log(id);
	          //var nick=$('#nick').val();

	          if (id){
	          	cliR.cookieUpdate(id);
	            //cliR.mostrarAngulos();
	          }
	    });


	    $('#btnEditPaciente').click(function(){
	          id=StoreValue[0];//$("#lista").val();
	          console.log(id);
	          //var nick=$('#nick').val();

	          if (id){
	          	var obj = obtenerObj(lista.retorno,id);
	          	//cliR.eliminarPaciente(id);
	          	//console.log(lista);
	           	cw.mostrarMenuActualizar(obj);
	          }
	    });

	    $('#btnDeletePaciente').click(function(){
	          id=StoreValue[0];//$("#lista").val();
	          console.log(id);
	          //var nick=$('#nick').val();
	          if(id)
	          	cliR.confirmar(id, "delete");
	          	//cw.dialogoConfirmacion("¿Esta seguro?","Asegurese de que desea eliminar el paciente", id);
	          
	    });

	    $('#atrasBtn').click(function(){
	    	cw.mostrarLogin();
	    });
	}

	function obtenerObj(lista,id){
		console.log("ListaFuera-->"+id);
		 		console.log(lista);
		 for(var i=0;i<lista.length;i++){
		 	if(lista[i]._id==id){
		 		console.log("ListaDentro--->"+id);
		 		console.log(lista);
		 		return lista[i];
		 	}
		 }
	}

	this.mostrarMenuActualizar=function(data){
		funcion_primera();
		//cw.comprobarBackdrop();
		console.log(data);
		this.limpiar();
		var cadena = '<div id="actualizarPaciente" class="registro">';
		cadena+='<div id="atras" class="atras">';
			cadena+='<div class="btnAtras" style="margin-right: 30%;">';
		        cadena+='<label for="atrasBtn">';
		          cadena+='<h1 class="icon-back" alt ="Click aquí para volver atras" title ="Click aquí para volver atras"></h1></label>'
		        cadena+='<input id="atrasBtn" type="button" class="atrasBtn" value="Atras" >';
		      cadena+='</div>';
		    cadena+='</div>';
			cadena += '<h2 id="cabeceraP">Actualizar Paciente</h2>';
			cadena += '<div id="ig1" class="input-group" style="margin-bottom:25px">';
				cadena += '<span class="input-group-addon">';
					cadena += '<i class="glyphicon glyphicon-user"></i>';
				cadena += '</span>';
				cadena += '<input id="nombreP" type="text" class="form-control" name="nombre" placeholder="'+data.nombre+'" value="'+data.nombre+'" required>';
			cadena += '</div>';
			cadena += '<div id="ig2" class="input-group" style="margin-bottom:25px">';
				cadena += '<span class="input-group-addon">';
					cadena += '<i class="glyphicon glyphicon-user"></i>';
				cadena += '</span>';
				cadena += '<input id="apellidoP" type="text" class="form-control" name="apellido" placeholder="'+data.apellido+'" value="'+data.apellido+'" required>';
			cadena += '</div>';
			cadena += '<div id="ig3" class="input-group" style="margin-bottom:25px">';
				cadena += '<span class="input-group-addon">';
					cadena += '<i class="glyphicon glyphicon-phone"></i>';
				cadena += '</span>';
				cadena += '<input id="nTlf" type="text" class="form-control" name="nTlf" placeholder="'+data.tlf+'"  value="'+data.tlf+'" required>';
			cadena += '</div>';
    		cadena += '<p id="btnRegistro" style="text-align: center;">';
    			cadena += '<button type="button" id="btnActu" class="btn btn-primary btn-md">Actualizar</button>';
    			cadena += '<button type="button" id="btnCancel" class="btn btn-primary btn-md" style=" background-color:grey; border-color:black;">Cancelar</button>';
			cadena += '</p>';
		cadena += '</div>';

		$('#menuActuP').append(cadena);

		$('#btnActu').click(function(){
	          if(id){
	          	var nombre = $('#nombreP').val();
	      		var apellido = $('#apellidoP').val();
	      		var tlf = $('#nTlf').val();
	          	cliR.confirmarActu(id, nombre,apellido,tlf, "update");
	          }
	          	//cw.dialogoConfirmacion("¿Esta seguro?","Asegurese de que desea eliminar el paciente", id);  
	    });
	    $('#btnCancel').click(function(){
	    	cliR.obtenerListaPacientes();
	    });

	    $('#atrasBtn').click(function(){
	    	cliR.obtenerListaPacientes();
	    });
	}

	this.dialogoActu=function(title, msg, id,nombre,apellido,tlf, tipo){
		$('#modalGeneral').remove();
		this.confirm=false;
		console.log("????????????????????");
		var cadena = '<div class="modal" id="modalActualizacion" tabindex="-1" role="dialog">';
			cadena += '<div class="modal-dialog" role="document">';
				cadena += '<div class="modal-content" style="background-color: white; margin-top:45%;">';
					cadena += '<div class="modal-header">';
						cadena += '<h2 id="modalTitle" class="modal-title">'+title+'</h2>';
		        			cadena += '<button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="'+this.comprobarBackdrop()+'">'
		        				cadena += '<span aria-hidden="true">&times;</span>';
		        			cadena += '</button>';
		        		cadena += '</div>';
		      			cadena += '<div class="modal-body" id="contenidoModal"><h5>'+msg+'</h5></div>';
		      			cadena += '<div class="modal-footer">';
		      				cadena += '<button id="check" type="button" class="btn btn-primary" data-dismiss="modal" >Si</button>';
		      				cadena += '<button id="noCheck" type="button" class="btn btn-primary" data-dismiss="modal"  style=" background-color:grey; border-color:black;">No</button>';
		      			cadena += '</div>';
		      		cadena += '</div>';
		      	cadena += '</div>';
		    cadena += '</div>';

		$('#modalA').append(cadena);
		$('#modalActualizacion').modal({backdrop: 'static', keyboard: false})
		$('#modalActualizacion').modal("show");

		$('#check').click(function(){
			//cliR.close();
			if(tipo=="update"){
				console.log("DialogoACTU+++++++/id-->"+id+"/nombre-->"+nombre+"/apellido-->"+apellido+"/tlf-->"+tlf);
	          cliR.actualizarPaciente(id,nombre,apellido,tlf);
			}
	    });

	    $('#noCheck').click(function(){
	          cliR.close();
	    });
	}

	this.dialogoConfirmacion=function(title, msg, id, tipo){
		$('#modalGeneral').remove();
		$('#modalConfirmacion').remove();
		this.confirm=false;
		var cadena = '<div class="modal" id="modalConfirmacion" tabindex="-1" role="dialog">';
			cadena += '<div class="modal-dialog" role="document">';
				cadena += '<div class="modal-content" style="background-color: white; margin-top:45%;">';
					cadena += '<div class="modal-header">';
						cadena += '<h2 id="modalTitle" class="modal-title">'+title+'</h2>';
		        			cadena += '<button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="'+this.comprobarBackdrop()+'">'
		        				cadena += '<span aria-hidden="true">&times;</span>';
		        			cadena += '</button>';
		        		cadena += '</div>';
		      			cadena += '<div class="modal-body" id="contenidoModal"><h5>'+msg+'</h5></div>';
		      			cadena += '<div class="modal-footer">';
		      				cadena += '<button id="check" type="button" class="btn btn-primary" data-dismiss="modal">Si</button>';
		      				cadena += '<button id="noCheck" type="button" class="btn btn-primary" data-dismiss="modal">No</button>';
		      			cadena += '</div>';
		      		cadena += '</div>';
		      	cadena += '</div>';
		    cadena += '</div>';

		$('#modalC').append(cadena);
		$('#modalConfirmacion').modal({backdrop: 'static', keyboard: false})
		$('#modalConfirmacion').modal("show");

		$('#check').click(function(){
			if(tipo=="delete")
	          cliR.eliminarPaciente(id);
	      	if(tipo=="deleteAng")
	      		cliR.eliminarAngulo(id);
	    });

	    $('#noCheck').click(function(){
	          cliR.close();
	    });
	}

	this.dialogoLogOut=function(title, msg){

		$('#modalGeneral').remove();
		$('#modalConfirmacion').remove();
		$('#modalLogOut').remove();
		this.confirm=false;


		var cadena = '<div class="modal" id="modalLogOut" tabindex="-1" role="dialog">';
			cadena += '<div class="modal-dialog" role="document">';
				cadena += '<div class="modal-content" style="background-color: white; margin-top:45%;">';
					cadena += '<div class="modal-header">';
						cadena += '<h2 id="modalTitle" class="modal-title">'+title+'</h2>';
		        			cadena += '<button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="'+this.comprobarBackdrop()+'">'
		        				cadena += '<span aria-hidden="true">&times;</span>';
		        			cadena += '</button>';
		        		cadena += '</div>';
		      			cadena += '<div class="modal-body" id="contenidoModal"><h5>'+msg+'</h5></div>';
		      			cadena += '<div class="modal-footer">';
		      				cadena += '<button id="check" type="button" class="btn btn-primary" data-dismiss="modal">Si</button>';
		      				cadena += '<button id="noCheck" type="button" class="btn btn-primary" data-dismiss="modal">No</button>';
		      			cadena += '</div>';
		      		cadena += '</div>';
		      	cadena += '</div>';
		    cadena += '</div>';

		$('#modalLO').append(cadena);
		$('#modalLogOut').modal({backdrop: 'static', keyboard: false})
		$('#modalLogOut').modal("show");

		$('#check').click(function(){
			cw.toLogOut	=false;
			cw.logeado=false;
	      	cliR.mostrarLO();
	      	cliR.eliminarCookies();
	    });

	    $('#noCheck').click(function(){
	    	cw.toLogOut	=false;
	        cliR.close();
	    });
	}

	this.obtenerTodos=function(lista){
		console.log(lista);
		console.log(lista.length);
		var cadena='<div id="listadoP"><div class="list-group" id="lista">';
	    if(lista.length == 0){
	    	cadena = cadena + '<h3 id="noP" class="col text-center" style="color: black;"><p>No hay pacientes registrados</p></h3></div></div>';
	    	return cadena;
	    }
	    for(var i=0;i<lista.length;i++){
	        var nombre=lista[i].nombre;
	        var apellido=lista[i].apellido;
	        var tlf=lista[i].tlf;
	        var _id = lista[i]._id;
	        cadena=cadena+'<a href="#" value="'+_id+'" class="list-group-item a-jugadores"><table class="tableListaP"><tr><td><span class="badge"><h4>'+apellido+'</h4></span></td><td><span class="badge"><h4>'+nombre+'</h4></span></td><td><span class="badge"><h4>'+tlf+'<h4></span></td><td>'+this.botonesPaciente()+'</td></tr></table></a>';
	    } 
	    cadena=cadena+'</div>';
	    //cadena=cadena+'</div>';
	    cadena=cadena+'<input type="button" class="btn btn-primary center" id="entrar" value="Seleccionar" style="margin-bottom:5%; display:none;"></button>';
	    cadena = cadena + '</div></div>';
	    return cadena;
	}

	this.botonesPaciente=function(){
		var cadena = '<div id="botonesP" class="botones"><div class="btnPaciente"><label for="btnFotoPaciente">';
		cadena += '<h1 class="icon-cam" alt ="Click aquí para tomar una foto" title ="Click aquí para tomar una foto"></h1></label>';
		cadena += '<input id="btnFotoPaciente" type="button" class="btnFinal" value="menuPacientes"></div>';
		cadena += '</hr>';
		cadena+= '<div class="btnPaciente"><label for="btnEditPaciente">';
		cadena += '<h1 class="icon-edit" alt ="Click aquí para editar el paciente" title ="Click aquí para editar el paciente"></h1></label>';
		cadena+='<input id="btnEditPaciente" type="button" class="btnFinal" value="edit"></div>';
		cadena+= '<div class="btnPaciente"><label for="btnDeletePaciente">';
		cadena += '<h1 class="icon-delete" alt ="Click aquí para eliminar el paciente" title ="Click aquí para eliminar el paciente"></h1></label>';
		cadena+='<input id="btnDeletePaciente" type="button" class="btnFinal" value="delete"></div></div>';

		return cadena;
	}

	this.mostrarRegistroMedico=function(){
		funcion_primera();
		this.seleccion=document.getElementById("contenedorMenuPrincipal");
		this.limpiar();
		cliR.eliminarCookies();

		var cadena = '<div id="registro" class="registro">';
			cadena+='<div id="atras" class="atras">';
		  	cadena+='<div class="btnAtras" style="margin-right: 30%;">';
		        cadena+='<label for="atrasBtn">';
		          cadena+='<h1 class="icon-back" alt ="Click aquí para volver atras" title ="Click aquí para volver atras"></h1></label>'
		        cadena+='<input id="atrasBtn" type="button" class="atrasBtn" value="Atras" >';
		      cadena+='</div>';
		    cadena+='</div>';
			cadena += '<h2 id="cabeceraP">Registrarse</h2>';
			cadena += '<div id="ig1" class="input-group" style="margin-bottom:25px">';
				cadena += '<span class="input-group-addon">';
					cadena += '<i class="glyphicon glyphicon-user"></i>';
				cadena += '</span>';
				cadena += '<input id="nombre" type="text" class="form-control" name="nombre" placeholder="Escribe tu nombre" required>';
			cadena += '</div>';
			cadena += '<div id="ig2" class="input-group" style="margin-bottom:25px">';
				cadena += '<span class="input-group-addon">';
					cadena += '<i class="glyphicon glyphicon-user"></i>';
				cadena += '</span>';
				cadena += '<input id="apellido" type="text" class="form-control" name="apellido" placeholder="Escribe tu apellido" required>';
			cadena += '</div>';
			cadena += '<div id="ig3" class="input-group" style="margin-bottom:25px">';
				cadena += '<span class="input-group-addon">';
					cadena += '<i class="glyphicon glyphicon-user"></i>';
				cadena += '</span>';
				cadena += '<input id="email" type="text" class="form-control" name="email" placeholder="Escribe tu email" required>';
			cadena += '</div>';
			cadena += '<div id="ig4" class="input-group" style="margin-bottom:25px">';
				cadena += '<span class="input-group-addon" >';
					cadena += '<i class="glyphicon glyphicon-lock"></i>';
				cadena += '</span>';
				cadena += '<input id="clave1" type="password" class="form-control" name="password" placeholder="Escribe tu clave" required>';
			cadena += '</div>';
			cadena += '<div id="ig5" class="input-group" style="margin-bottom:25px">';
          		cadena += '<span class="input-group-addon" >';
            		cadena += '<i class="glyphicon glyphicon-lock"></i>';
            	cadena += '</span>';
            	cadena += '<input id="clave2" type="password" class="form-control" name="password" placeholder="Repite la clave">';
    		cadena += '</div>';
    		cadena += '<p id="btnRegistro" style="text-align: center;">';
    			cadena += '<button type="button" id="nombreBtn" class="btn btn-primary btn-md">Registrarse</button>';
	  	cadena = cadena +'<button type="button" id="cancel" class="btn btn-primary btn-md" style="background-color:grey; margin-top:2%">Cancelar</button>';
			cadena += '</p>';
		cadena += '</div>';

		$('#menuRegistro').append(cadena);

		$('#cancel').click(function(){
	        cw.limpiar();
	        cw.primerMenu();
	        document.getElementById("myMain").appendChild(cw.seleccion);
	        //document.getElementById('entrar').click();
	        //if('#btnFotoPaciente').isClicked()
	    });

	    $('#atrasBtn').click(function(){
	    	cw.limpiar();
	    	cw.primerMenu();
	        document.getElementById("myMain").appendChild(cw.seleccion);
	    });

		$('#email').blur(function() {
	    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
	    
	    if (testEmail.test(this.value)) {
		      	$('#btnRegistro').unbind("click").on('click',function(){
		      		var nombre = $('#nombre').val();
		      		var apellido = $('#apellido').val();
		      		var email = $('#email').val();
		      		var clave1 = $('#clave1').val();
	    			var clave2 = $('#clave2').val();
		        	
		        	if(clave1 == clave2){
		        		$('#registro').remove();
		        		$('#btnRegistro').remove();   
		        		cliR.registroMedico(nombre, apellido, email, clave1);
			      	}else{
			      		yo.mostrarModal("Warning!","Las contraseñas no coinciden", "#F6FF81");
			      	}
		      	});
		      	$('#refRecordar').on('click',function(){
		        	var nombre=$('#email').val();        
		        	enviarClave(nombre);
		      	});
		    }
	    else
	      	yo.mostrarModal("Warning!","Email invalido", "#F6FF81");
	  	});
	}

	this.mostrarModal=function(title, msg, color){
		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		$('#modalLogOut').remove();
		$('#modalGeneral').remove();
		var cadena = '<div class="modal" id="modalGeneral" tabindex="-1" role="dialog">';
			cadena += '<div class="modal-dialog" role="document">';
				cadena += '<div class="modal-content" style="background-color: '+color+'; margin-top:45%;">';
					cadena += '<div class="modal-header">';
						cadena += '<h2 id="modalTitle" class="modal-title">'+title+'</h2>';
		        			cadena += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
		        				cadena += '<span aria-hidden="true">&times;</span>';
		        			cadena += '</button>';
		        		cadena += '</div>';
		      			cadena += '<div class="modal-body" id="contenidoModal"><h5>'+msg+'</h5></div>';
		      			cadena += '<div class="modal-footer">';
		      				cadena += '<button type="button" class="btn btn-primary" data-dismiss="modal" onclick="'+this.comprobarBackdrop()+'">Cerrar</button>';
		      			cadena += '</div>';
		      		cadena += '</div>';
		      	cadena += '</div>';
		    cadena += '</div>';

		$('#modalG').append(cadena);
		$('#modalGeneral').modal({backdrop: 'static', keyboard: false})
		$('#modalGeneral').modal("show");
	}

	this.comprobarBackdrop=function(){
		$('#modalGeneral').remove(); 
		if ($('.modal-backdrop').is(':visible')) {
		  //$('body').removeClass('modal-open'); 
		  $('.modal-backdrop').remove(); 
		};
	}

	this.mostrarRegistroPaciente = function (){
		funcion_primera();
		this.limpiar();

		var cadena = '<div id="registroPaciente" class="registro">';
		cadena+='<div id="atras" class="atras">';
		  	cadena+='<div class="btnAtras" style="margin-right: 30%;">';
		        cadena+='<label for="atrasBtn">';
		          cadena+='<h1 class="icon-back" alt ="Click aquí para volver atras" title ="Click aquí para volver atras"></h1></label>'
		        cadena+='<input id="atrasBtn" type="button" class="atrasBtn" value="Atras" >';
		      cadena+='</div>';
		    cadena+='</div>';
			cadena += '<h2 id="cabeceraP">Registrar Paciente</h2>';
			cadena += '<div id="ig1" class="input-group" style="margin-bottom:25px">';
				cadena += '<span class="input-group-addon">';
					cadena += '<i class="glyphicon glyphicon-user"></i>';
				cadena += '</span>';
				cadena += '<input id="nombreP" type="text" class="form-control" name="nombre" placeholder="Nombre del paciente" required>';
			cadena += '</div>';
			cadena += '<div id="ig2" class="input-group" style="margin-bottom:25px">';
				cadena += '<span class="input-group-addon">';
					cadena += '<i class="glyphicon glyphicon-user"></i>';
				cadena += '</span>';
				cadena += '<input id="apellidoP" type="text" class="form-control" name="apellido" placeholder="Apellido del paciente" required>';
			cadena += '</div>';
			cadena += '<div id="ig3" class="input-group" style="margin-bottom:25px">';
				cadena += '<span class="input-group-addon">';
					cadena += '<i class="glyphicon glyphicon-phone"></i>';
				cadena += '</span>';
				cadena += '<input id="nTlf" type="text" class="form-control" name="nTlf" placeholder="Numero de telefono" required>';
			cadena += '</div>';
    		cadena += '<p style="text-align: center;">';
    			cadena += '<button type="button" id="btnRegistro" class="btn btn-primary btn-md">Registrarse</button>';
	  	cadena = cadena +'<button type="button" id="cancel" class="btn btn-primary btn-md" style="background-color:grey; margin-top:2% ">Cancelar</button>';
			cadena += '</p>';
		cadena += '</div>';

		$('#menuRegistroP').append(cadena);

		$('#cancel').click(function(){
	        
	        cliR.obtenerListaPacientes();
	    });

	    $('#atrasBtn').click(function(){
	    	cliR.obtenerListaPacientes();
	    });

		$('#btnRegistro').unbind("click").on('click',function(){
      		var nombre = $('#nombreP').val();
      		var apellido = $('#apellidoP').val();
      		var tlf = $('#nTlf').val();

        	if(nombre!=undefined && apellido!=undefined && tlf!=undefined){
	    		$('#registroPaciente').remove();
	    		$('#btnRegistro').remove();   
	    		cliR.registroPaciente(nombre, apellido, tlf);
	    	}else{
	    		cw.mostrarRegistroPaciente();
	    	}
      	});

      	$('#logOut').click(function(){
	    	cw.toLogOut = true;
          	funcion_primera();
	    });

	}
	
	this.ponerResultado=function(angulo){
		principal = document.getElementById('main');
		$('#main').remove();
		this.mover(angulo);
		document.getElementById('canvasPosition').style.visibility="visible";
		document.getElementsByTagName('canvas')[0].style.visibility="visible";
	}

	this.mover=function(angulo){
		var canv1 = document.getElementsByTagName('canvas')[1];
		if(canv1)
			canv1.remove();
        var canv = document.getElementsByTagName('canvas')[0];
        document.getElementById("canvasPosition").appendChild(canv);
        yo.ponerAngulo(angulo);
        yo.ponerBoton();
	}

	this.ponerAngulo=function(angulo){
		if(divAngulo)
			document.getElementById("canvasPosition").appendChild(divAngulo);
		
		$('#angulo').remove();
		var cadena = '<h2 id="angulo">Angulo --> '+angulo+'</h2>';
		$('#ang').append(cadena);
		
		
	}

	this.getWidth=function(){
		var width = document.getElementById('canvasPosition');
		return width.getBoundingClientRect().width;
	}

	this.getHeight=function(){
		var height = document.getElementById('canvasPosition');
		return Math.abs(height.getBoundingClientRect().height);
	}

	this.volverPrincipal=function(){
		canvas = document.getElementById('canvasPosition');
		btn = document.getElementById('btnDownload');
		divAngulo = document.getElementById('ang');
		$('#canvasPosition').remove();
		$('#btnDownload').remove();
		$('#ang').remove();
		document.getElementById("contenedorPrincipal").appendChild(principal);
	}

	this.ponerBoton=function(){
		var cadena = '<div id="download" class="botones"><div class="image-download" style="margin-right: 10%;"><label for="btnDescargar">';
		cadena += '<h1 class="icon-download-alt" alt ="Click aquí para subir tu foto" title ="Click aquí para descargar la foto"></h1></label>';
		cadena += '<input id="btnDescargar" type="button" class="btnFinal" value="Descargar" onClick="descargar()"></div>';
		cadena += '</hr>';
		cadena+= '<div class="image-return" style="margin-right: 10%;"><label for="btnFinal">';
		cadena += '<h1 class="icon-undo" alt ="Click aquí para volver al menú" title ="Click aquí para volver al menú"></h1></label>';
		cadena+='<input id="btnFinal" type="button" class="btnFinal" value="Volver Menú" onClick="volver()"></div>';
		cadena+= '<div class="image-return"><label for="btnStorage">';
		cadena += '<h1 class="icon-save" alt ="Click aquí para guardar en el historial" title ="Click aquí para guardar en el historial"></h1></label>';
		cadena+='<input id="btnStorage" type="button" class="btnFinal" value="guardarBDD" onClick="registrarAngulo()"></div></div>';
		var z = document.createElement('p'); // is a node
		z.innerHTML = cadena;
		if(btn){
			document.getElementById("ang").appendChild(btn);	
		}else{
			document.getElementById("btnDownload").appendChild(z);
		}
	}

	this.crear=function(){
		document.getElementById("contenedorPrincipal").appendChild(canvas);
	}

	this.mostrarModal1=function(h2,p, color){
		$('#miModal').remove();
		var cadena = '<div id="miModal" class="modal"><div class="modal-contenido" style="background-color:'+color+';"><a href="#" style="align-self: flex-end;">X</a><h2>'+h2+'</h2><p>'+p+'</p></div></div>';
		$('#modal').append(cadena);

		document.getElementById("open").click();
	}

	this.limpiar=function(){
		//cliR.guardarMenu(document.getElementById('contenedorMenuPrincipal'));
		$('#contenedorMenuPrincipal2').remove();
	  	$('#btnFoto').remove();
	  	$('#menuP').remove();
		$('#pacientesL').remove();
	    $('#nuevoP').remove();
	    $('#menuAng').remove();
        $('#listaAngulos').remove();
        $('#actualizarPaciente').remove();
        $('#login').remove();
        $('#registro').remove();
        $('#registroPaciente').remove();
        $('#contenedorPrincipal').remove();
        $('#atras').remove();

	}
}