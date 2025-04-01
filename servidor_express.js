import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Definir __dirname manualmente en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const server = express();
    
server.listen(1985, () => {
    console.log('Servidor escuchando');
 });

 server.use(express.static(path.join(__dirname, 'static')));


// Función para leer archivos HTML y enviarlos como respuesta
const sendHtml = (res, filename) => {
  const filePath = path.join(__dirname, filename);
  fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {  
          res.status(500).send('Oh no!!!!');
          return;
      }
      res.status(200).send(data);
  });
};

// Rutas HTML
server.get('/', (req, res) => sendHtml(res, 'bienvenida.html'));
server.get('/escuelas', (req, res) => sendHtml(res, 'escuelas.html'));
server.get('/donantes', (req, res) => sendHtml(res, 'donantes.html'));
server.get('/equipo', (req, res) => sendHtml(res, 'equipo.html'));
server.get('/opinion', (req, res) => sendHtml(res, 'opinion.html'));

// Rutas API
server.get('/api/donantes', (req, res) => {
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
  });

server.get('/api/escuelas', (req, res) => {
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
res.end(JSON.stringify(escuelas));
});

// Ruta 404
server.use((req, res) => {
  res.status(404).send('Bienvenido a la página perdida MUAJAJAJAJA. No es cierto, pero no encontraste lo que querías');
});