import express from 'express';

const app = express();
const PORT = 1984;


let escuelas = [
    { nombre: "Escuela Benito Juárez", direccion: "Av. Principal 123, Ciudad de México" },
    { nombre: "Escuela Miguel Hidalgo", direccion: "Av. Secundaria 456, Ciudad de México" }
];

let donantes = [
    { nombre: "Pinturas Lulu", donacion: "Pintura" },
    { nombre: "Sor Juana Inés de la Cruz", donacion: "Monetaria" }
];


app.get('/api/escuelas/:nombre', (req, res) => {
    const nombreEscuela = req.params.nombre;
    const escuelaEncontrada = escuelas.find(escuela => escuela.nombre.toLowerCase() === nombreEscuela.toLowerCase());

    if (escuelaEncontrada) {
        res.json(escuelaEncontrada);
    } else {
        res.status(404).send('Escuela no encontrada');
    }
});


app.get('/api/donantes/:nombre', (req, res) => {
    const nombreDonante = req.params.nombre;
    const donanteEncontrado = donantes.find(donante => donante.nombre.toLowerCase() === nombreDonante.toLowerCase());

    if (donanteEncontrado) {
        res.json(donanteEncontrado);
    } else {
        res.status(404).send('Donante no encontrado');
    }
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
