import express from 'express';

const server = express();

server.listen(1985, () => {
    console.log('Esta VIVOOOOOOO');
 });
 


let title;

async function API() {
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
