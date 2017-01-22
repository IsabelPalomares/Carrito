//para acumular los precios
var suma=0;

$(document).ready(function()
{	     
	//desde aquí llamamos a todas las funciones
        $(".item").on('dblclick', iniciar);

});


function iniciar(){
		//tenemos que ir cogiendo los diferentes valores y 
        //cambiando su valor por los nuevos	
	    //definicion de variables
        $item=$(this).find("label.stock");
	    $valorId=$(this).attr("id");
		$bloque=$(this);
        $stock = $item.text().split(" ");
	    $delete = $('<a href="" class="delete" onclick="return false;"></a>');
		
		// en caso de que haya existencias
        if($stock[1]>0)
        {
			//le restamos uno y lo sustituimos en cabecera
           $stock[1]-=1;
           $item.html($stock[0]+" "+$stock[1]);
		   
		   //unidades que pondremos en el carrito y sustitucion
		   $compra = parseInt($("#citem").val());
		   $compra+=1;
		   $("#citem").val($compra);
		   
		   //precio calculado para cada compra añadida y sustitucion
		   //utilizamos en este caso un sumatorio
		   $precio = parseInt($(this).find("label.price").text());
		   suma= suma+$precio;
		   $("#cprice").val(suma+ " €");
		   
		   // clonamos el elemento para añadir al carrito
		   $bloque.clone().appendTo("#cart_items");
		   
		   //le cambiamos el id añadiendo una "c" delante
		   //poniendo last-child solucionamos que se repita el id
		   $("#cart_items .item:last-child").attr("id", "c"+$valorId);
		   
		   //ocultamos la línea de stock
		   $("#cart_items .item .stock").hide();
		   
		   //cambiamos a cursor por defecto
		   $(this).css("cursor", "default");
		  
		 
		   //añadiremos el enlace al pulsar sobre el item
		   $("#cart_items .item").click(function() {
			    $(this).prepend($delete);
           });
		   
		   
           //ejercicio 2, borrar el elemento del carrito, aprovechando
		   //la funcion click
		   $delete.on("click", borrado);
		   //llamada ala función de vaciar
		   $("#btn_clear").on("click", vaciar);
		   
			//si se nos agotan los artículos mientras compramos... 
           if($stock[1] == 0)
           {
			 //cambiamos la class a agotado
             $item.attr("class", "agotado");
           }
        }
        else // en caso de que no quedan artículos
        {
            alert("No quedan artículos");
        }

      };//fin funcion iniciar




function borrado() {
   //obtenemos el id que nos interesa, el del elemento 
   //original
    $id=$(this).parent().attr("id");
	$idOrigen=$id.substring(1);
				 
	//como vamos a agregar un elemento aqui, si el stock 
	//es cero le quitamos la clase "agotado" y dejamos la
    //original de "stock"
	 if($stock[1] == 0)
    {
           $item.attr("class", "stock");
    }
			   
	//le sumamos uno, ya que lo quitamos del carrito		 
	//lo sustituimos en la cabecera
	$("#"+$idOrigen).find("label.stock").html($stock[0]+" "+($stock[1]+ +1));
			   
	// todo lo anterior en la cabecera
    // para el carrito en si:
	//quitamos un elemento a las unidades compradas
    $compra-=1;
    $("#citem").val($compra);
			  
    //actualizamos precio total del carrito
	$precioResta = parseInt($("#"+$id).find("label.price").text());
    suma= suma-$precioResta;
	$("#cprice").val(suma+" €");
			  
	//y por último lo hacemos desaparecer del carrito
    $(this).parent().slideUp();
 };
		      


function vaciar() {
			   
   $("#cart_items").empty();
   suma=0;
   $("#cprice").val(0+" €");
   $("#citem").val(0);
 };



