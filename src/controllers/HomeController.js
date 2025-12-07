// Controlador de inicio
class HomeController {
    static index(req, res) {
        res.render('index', { 
            title: 'Mariscamar - Del mar a tu tienda',
            page: 'home'
        });
    }

    static contact(req, res) {
        res.render('contact', { 
            title: 'Contacto - Mariscamar',
            page: 'contact'
        });
    }

    static about(req, res) {
        res.render('about', { 
            title: 'Sobre nosotros - Mariscamar',
            page: 'about'
        });
    }
    
    static subastas(req, res) {
        res.render('subastas', { 
            title: 'Subastas - Mariscamar',
            page: 'subastas'
        });
    }

    static crearSubasta(req, res) {
        res.render('crearSubasta', { 
            title: 'Crear Subasta - Mariscamar',
            page: 'crearSubasta'
        });
    }
}

export default HomeController;
