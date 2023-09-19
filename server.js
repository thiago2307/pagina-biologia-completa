    const mongoose = require("mongoose");
    const app = require("./app");
    const dotenv = require("dotenv");
    const Adn = require("./models/Adn");

    dotenv.config({ path: "./config.env" });

    const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

    mongoose.set('strictQuery', false);

    mongoose.connect(DB, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Conectado a la base de datos correctamente");
    })
    .catch(() => {
        console.log("No se pudo conectar a la base de datos");
    });

    Adn.find({}, (err, adns) => {
        if (err) {
            console.error("Error al obtener el Adn:", err);
            return;
        } else {
            console.log("Adns:", adns);

            app.locals.adns = adns;
        }
    });
    
    //https://github.com/thiago2307/pagina-biologia-completa.git
    //localhost:3000/adns
    const port = 3003;
    app.listen(port, () => {
        console.log(`Servidor corriendo en el puerto ${port} correctamente`);
    });