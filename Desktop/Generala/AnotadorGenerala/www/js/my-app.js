  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'Anotador',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        path: '/anotar/',
        url: 'anotar.html',
      },
      {
        path: '/index/',
        url: 'index.html',
      },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

var player1="";
var player2="";
var id="";
var dado=0;
var valorPuntaje="";
var total=0;
var servido=0;
var noservido= 0;

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log('cargada');
})
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log('index cargada');

    $$('#inGame').on('click', function(){
    	if ($$('#j1').val()=="") {
    		app.dialog.alert('no completaste los nombres kpo');
    	} else if ($$('#j2').val()=="") {
    		app.dialog.alert('completame kpo');
    	} else {

        	player1=$$('#j1').val();
        	player2=$$('#j2').val();
        
        	console.log(player1, player2);

       		mainView.router.navigate('/anotar/');
    	}
    })
})
// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="anotar"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log('anotar cargada');
    $$('#LJugador1').text(player1);
    $$('#LJugador2').text(player2);

    Total();
  	Total2();

    $$('.Divclick').on('click', function(){
    	id = this.id;
    	console.log(id);
    	valorPuntaje = id.replace('j1d', '');

    	console.log('valor', valorPuntaje);

    })

$$('.Divclick2').on('click', function(){
      id = this.id;
      console.log(id);
      valorPuntaje = id.replace('j2d', '');

      console.log('valor', valorPuntaje);
    })


/*Boton limpiar*/
$$('#btnLimpiar').on('click',function(){
	app.dialog.confirm("¿Estas seguro que queres borrar pa?", function () {
        for (var i=1; i<=11; i++){
    		$$('#j1d'+i).text(0);
    		$$('#j2d'+i).text(0);
  		}
  	Total();
  	Total2();
    });
});

/*juegos jugador1*/
    $$('.juegoClick').on('click', function(){
      id = this.id;
      console.log(id);

      switch(id){
        case 'j1d7': servido= 25;
                      noservido= 20;
          break;
        case 'j1d8':servido= 35;
                      noservido= 30;
          break;
        case 'j1d9': servido= 45;
                      noservido= 40;
          break;
        case 'j1d10': servido= 55;
                      noservido= 50;
          break;
        case 'j1d11':servido= 65;
                      noservido= 60;
          break;
          case 'j2d7': servido= 25;
                      noservido= 20;
          break;
        case 'j2d8':servido= 35;
                      noservido= 30;
          break;
        case 'j2d9': servido= 45;
                      noservido= 40;
          break;
        case 'j2d10': servido= 55;
                      noservido= 50;
          break;
        case 'j2d11':servido= 65;
                      noservido= 60;
          break;

      }
    })

/*action sheet juegos j1*/
var acjj1 = app.actions.create({
        buttons: [
          {
            text: 'Juego',
            label: true
          },
          {
            text: 'Servido',
            onClick: function(){
                valorJuegoS();
                Total();
                Total2();
            }
          },
          {
            text: 'No Servido',
            onClick: function(){
                valorJuegoNS();
                Total();
                Total2();
            }
          },
          {
            text: 'Tachar',
            onClick: function(){
              $$('#'+id).text(0);
              Total();
              Total2();
            }
          },
        ]
      });
$$('.acjj1').on('click', () => {
        acjj1.open();
});


/*action sheet dados j1*/

   $$('.acdj1').on('click', () => {
var acdj1 = app.actions.create({
        buttons: [
          {
            text: 'Dado '+valorPuntaje,
            label: true
          },
          {
            text: 'Uno',
            onClick: function () {
              valorDado(1);
              Total();
              Total2();
            }
          },
          {
            text: 'Dos',
            onClick: function () {
              valorDado(2);
              Total();
              Total2();
            }
          },
          {
            text: 'Tres',
            onClick: function () {
              valorDado(3);
              Total();
              Total2();
            }
          },
          {
            text: 'Cuatro',
            onClick: function () {
              valorDado(4);
              Total();
              Total2();
            }
          },
          {
            text: 'Cinco',
            onClick: function () {
              valorDado(5);
              Total();
              Total2();
            }
          },
          {
            text: 'Tachar',
            onClick: function () {
              valorDado(0);
              Total();
              Total2();
            }
          },
        ]
      });
        acdj1.open();
  });


$$('#btnTerminar').on('click',function(){
  app.dialog.confirm("Puntaje total "+player1+": "+totalj1 +"         Puntaje total "+player2+": "+totalj2, function () {
          mainView.router.navigate('/index/');
        });

})

})


	function valorDado(v) {
		console.log(v);
		console.log(valorPuntaje);
		multi = valorPuntaje * v;
		$$('#'+id).text(multi);
	}

	function Total() {
      for (var i=1; i<=11; i++) {
      total+=parseInt($$('#j1d'+i).text());
      console.log(total);
      $$('#totalj1').text(total);
      totalj1=total;
    }
    
		total=0;
	}
    function Total2() {
      for (var i=1; i<=11; i++) {
      total+=parseInt($$('#j2d'+i).text());
      console.log(total);
      $$('#totalj2').text(total);
      totalj2=total;
    }
    
    total=0;
  }

  function valorJuegoS(){
    $$('#'+id).text(servido);
  }
  function valorJuegoNS(){
    $$('#'+id).text(noservido);
  }


