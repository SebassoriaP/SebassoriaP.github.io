import express from 'express';

const server = express();

server.listen(1985, () => {
    console.log('Esta VIVOOOOOOO');
 });
 


let title;

async function API() {
    //Aunque esta API si requiere de un token, consideré que no había problema de ponerla pública (aunque no es lo adecuado) porque realmente 
    //no se le puede dar un uso malicioso, ya que, como tal a la página de la NASA realmente solo se usa para trabajar con API's pero 
    //no contiene tu información personal o algo con lo que podrían hacer daño
    //link de la Nasa: https://api.nasa.gov/
    const apiKey = "bbI7e6MhlgLaNWe3h6lEDgWjURFsAzbEFQMtB9Rk";
    const url = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);

    const data = await url.json(); 
    console.log(data);  

    title = await data.title;
    console.log(title);

    server.get('/client', (req, res) => {
        res.send(title);
     });
    
}

API();
