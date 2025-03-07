//Escribe un comentario explicando para qué sirve http
//http nos sirve para crear servidores web y enviar peticiones
import http from 'http';
//Escribe un comentario explicando para qué sirve fs
//fs nos sirve para interactuar con el sistema de archivos
import fs from 'fs';

    //Esta función deberá mostrar deberá mostrar una página HTML 
    //con la bienvenida a tu proyecto
    function darBienvenida(req, res) {
       //Agrega lo mínimo necesario en bienvenida.html
       //Agrega un enlace en bienvenida a la página de escuelas 
       //Agrega un enlace en bienvenida a la página de donantes 

      fs.readFile('bienvenida.html', 'utf8', (error, data) => {
        if (error) {
           //Escribe qué significa el 500 
           //En esta porción de código, 500 significa que hubo un error, pues 500 es un código de estado HTTP que indica un error interno en el servidor.
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Oh no!!!!');
          return;
        }
        //Escribe qué significa el 200
        //En esta porción de código, 200 es un codigo de estado HTTP que significa que la petición ha sido exitosa y el servidor devuelve la respuesta correctamente.
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
    }


    //Esta función deberá enviar un json con los datos de las escuelas
    function getEscuelas(req, res) {
        //Esto representa un objeto JSON de una escuela
        //Agrega otra escuela
        //Objeto de arreglos
        const escuelas = { 
          escuela :
          [
            {"nombre": "Escuela Benito Juárez",
            "direccion": "Av. Principal 123, Ciudad de México"},
        
            {"nombre": "Escuela Miguel Hidalgo",
            "direccion": "Av. Secundaria 456, Ciudad de México"}
          ]
        };
       
              
      res.writeHead(200, { 'Content-Type': 'application/json' });
      //Escribe qué hace la función stringify y por qué la tenemos que usar
      //La función stringify convierte un objeto en una cadena de texto tipo JSON y es útil para que podamos manejar los datos
      res.end(JSON.stringify(escuelas));
    }

     //Agrega un enlace a bienvenida y a donantes en escuelas.html 
    function mostrarEscuelas(req, res) {
        fs.readFile('escuelas.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }

      function mostrarOpinion(req, res) {
        fs.readFile('opinion.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }

      //Agrega un enlace a bienvenida y a escuelas en donantes.html
      function mostrarDonantes(req, res) {
        //Construye una página básica donantes.html
        fs.readFile('donantes.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }

      function mostrarEquipo(req, res) {
        fs.readFile('equipo.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }

    //Esta función deberá enviar un json con los datos de las donantes
    function getDonantes(req, res) {
    //Tienes que corregir varias cosas en esta sección
    const donantes = { 
      donante :
      [
        {"nombre": "Pinturas Lulu",
        "donacion": "Pintura"},
    
        {"nombre": "Sor Juana Inés de la Cruz",
        "donacion": "Monetaria"}
      ]
    };
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(donantes));
    }

    function manejarRuta404(req, res) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      //Cambia el mensaje por algo más divertido
      res.end('Bienvenido al la pagina perdida MUAJAJAJAJA. No es cierto, pero no encontraste lo que querias');
    }

    //incluye el enlace a la documentación de createServer
    //Enlace a la documentación de createServer: https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener
    const servidor = http.createServer((req, res) => {
      const url = req.url;

      if (url === '/') {
        darBienvenida(req, res);
      } else if (url === '/api/escuelas') {
        getEscuelas(req, res);
      } else if (url === '/api/donantes') {
        getDonantes(req, res);
      } 
      else if (url === '/escuelas') {
        mostrarEscuelas(req, res);
      } 
      else if (url === '/donantes') {
        mostrarDonantes(req, res);
      }
      else if(url == "/equipo"){
        mostrarEquipo(req, res);
      } 
      else if(url == "/opinion"){
        mostrarOpinion(req, res);
      } 

      //Agrega una ruta /equipo y su función correspondiente para que muestre el equipo del proyecto
      //Haz una página equipo.html correspondiente
      //Escribe el nombre completo y una cualidad que valores en esa persona de tu equipo
      
      //Haz una página opinion.html
      //Agrega una ruta /opinion
      //Trata de agregar una imagen a opinion.html
      //Explica si la puedes ver, en caso negativo ¿qué crees que pase?
        //Si se puede ver :)

      // Lee el siguiente artículo y responde 
      //https://www.aljazeera.com/opinions/2019/3/13/digital-colonialism-is-threatening-the-global-south
      // ¿Crees que el colonialismo digital es un riesgo para tu carrera profesionl? 
      // Personalmente creo que depende mucho, por ejemplo, si trabajaría dentro de una de estas compañias no tendría algún problema, sin embargo, si quisiera iniciar un startup si sería un gran problma porque básicamente estas compañias quieres ser dueñas de todo y controlar el mundo de manera digital. 
      // ¿Para tu vida persona?
      // Sí creo que es un riesgo porque a mi forma de verlo están realizando also similar a un Monopolio. Además están manejando y espiando mi información personal y es una lástima, ya que, como usuarios de ellos no tenemos muchas que hacer para combatirlos al no ser código open-source.
      //¿Qué es el freedombox?
      //El freedomBox es un proyecto de software libre que está actualmente en la India y siendo implementada dentro de algunas villas. Este consiste en la creación de servidores personales descentralizados que protegen la privacidad y bloquea la vigilancia. .
  

      
      else {
        manejarRuta404(req, res);
      }
    });

    const puerto = 1984;
    servidor.listen(puerto, () => {
      console.log(`Servidor escuchando en el puerto ${puerto}`);
    });

    //Importante
    //En esta actividad deberás agregar en supertarea un enlace a servidor.js y al resto de los html
