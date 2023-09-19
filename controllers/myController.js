
const Adn = require("../models/Adn");

exports.inicio = (req, res) => {
    Adn.find({}, (err, adns) => {
        if (err) {
            console.error("Error al obtener los ADNs:");
            res.status(500).json({ error: "Error al obtener los ADNs" });
        } else {
            res.render("index", { adns: adns });  
        }
    });
};

exports.getAdns = (req, res) => {
    Adn.find({}, (err, adns) => {
        if (err) {
            console.error("Error al obtener los ADNs:");
            res.status(500).json({ error: "Error al obtener los ADNs" });
        } else {
            res.render("index", { adns: adns });
        }
    });
};

exports.createAdn = (req, res) => {
    const nuevoAdn = new Adn(req.body);
    nuevoAdn.save((err, adn) => {
        if (err) {
            console.error("Error al crear el ADN:", err);
            res.status(500).json({ error: err.message }); 
        } else {
            console.log("ADN creado:", adn);
            res.redirect("/adns"); 
        }
    });
};



exports.getAdnById = (req, res) => {
    const adnId = req.params.id;
    Adn.findById(adnId, (err, adn) => {
        if (err) {
            console.error("Error al obtener el ADN:");
            res.status(500).json({ error: "Error al obtener el ADN" });
        } else {
            res.status(200).json(adn);
        }
    });
};

exports.deleteAdn = (req, res) => {
    const adnId = req.params.id;
    Adn.findByIdAndRemove(adnId, (err, adn) => {
        if (err) {
            console.error("Error al eliminar el ADN:");
            res.status(500).json({ error: "Error al eliminar el ADN" });
        } else {
            res.redirect("/adns");
        }
    });
};