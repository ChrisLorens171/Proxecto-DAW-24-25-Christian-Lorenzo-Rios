const path = require('path');

// Controlador de inicio
class HomeController {
    static index(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    }

    static contact(req, res) {
        res.sendFile(path.join(__dirname, '../public/contact.html'));
    }

    static about(req, res) {
        res.sendFile(path.join(__dirname, '../public/about.html'));
    }
}

module.exports = HomeController;
