const { Router } = require('express');

const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');


const router = Router();


router.get('/:busqueda',  getTodo );



module.exports = router;