const { Router } = require('express')
const router = Router()

const tareasCtrl = require ('../controllers/tareas.controllers.js')

router.get('/', tareasCtrl.getTareas)
router.post('/', tareasCtrl.createTarea)
router.get('/:id', tareasCtrl.getTarea)
router.put('/:id', tareasCtrl.editTarea)
router.delete('/:id', tareasCtrl.deleteTarea)

module.exports = router;
