let image;

async function API() {
    const apiKey = "NZB3h5xLCRiHMkjKU2Dmdr3OAxmGaAbtn6LbqW2f";
    const url = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);

    const data = await url.json(); 
    console.log(data);  

    image = data.url;
    console.log(image);

    let s=document.createElement("img");
    s.src=image;
    document.body.appendChild(s);

    
}

