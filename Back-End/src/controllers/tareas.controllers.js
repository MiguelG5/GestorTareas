const pool = require('../DataBase');
const { ActividadFlyweightFactory } = require('../actividad');

const tareasCtrl = {};
const actividadFactory = new ActividadFlyweightFactory();

tareasCtrl.getTareas = async (req, res) => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM actividad');
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener tareas:", error);
        res.status(500).json({ error: "Error interno del servidor", message: error.message });
    }
};

tareasCtrl.createTarea = async (req, res) => {
    const { datosCompartidos, tareaDatosEspecifico, fechaTerminacion } = req.body;

    try {
        const actividad = actividadFactory.obtenerActividad(datosCompartidos, tareaDatosEspecifico, fechaTerminacion);

        // Asegúrate de tener una tabla llamada 'actividad' con las columnas adecuadas
        const [result] = await pool.query('INSERT INTO actividad (datosCompartidos, tareaDatosEspecifico, fechaTerminacion) VALUES (?, ?, ?)', [actividad.nombre, actividad.duracion, fechaTerminacion]);

        const nuevaTareaId = result.insertId;
        res.json({ message: 'Tarea creada con éxito', nuevaTareaId });
    } catch (error) {
        console.error("Error al crear tarea:", error);
        res.status(500).json({ error: "Error interno del servidor", message: error.message });
    }
};

tareasCtrl.getTarea = async (req, res) => {
    const tareaId = req.params.id;

    try {
        const [rows, fields] = await pool.query('SELECT * FROM actividad WHERE idActividad = ?', [tareaId]);

        if (rows.length === 0) {
            res.status(404).json({ error: "No se encontró la tarea", message: `La tarea con ID ${tareaId} no existe` });
        } else {
            const actividad = actividadFactory.obtenerActividad(rows[0].nombre, rows[0].duracion);
            res.json({ ...rows[0], actividad });
        }
    } catch (error) {
        console.error("Error al obtener tarea:", error);
        res.status(500).json({ error: "Error interno del servidor", message: error.message });
    }
};

  tareasCtrl.editTarea = async (req, res) => {
    const tareaId = req.params.id;
    const { datosCompartidos, tareaDatosEspecifico, fechaTerminacion } = req.body;
  
    try {
      // Asegúrate de tener una tabla llamada 'actividad' con las columnas adecuadas
      const [result] = await pool.query('UPDATE actividad SET datosCompartidos = ?, tareaDatosEspecifico = ?, fechaTerminacion = ? WHERE idActividad = ?', [datosCompartidos, tareaDatosEspecifico, fechaTerminacion, tareaId]);
      
      res.json({ message: 'Tarea actualizada con éxito' });
    } catch (error) {
      console.error("Error al editar tarea:", error);
      res.status(500).json({ error: "Error interno del servidor", message: error.message });
    }
  };
  
  tareasCtrl.deleteTarea = async (req, res) => {
    const tareaId = req.params.id;
  
    try {
      // Asegúrate de tener una tabla llamada 'actividad' con las columnas adecuadas
      const [result] = await pool.query('DELETE FROM actividad WHERE idActividad = ?', [tareaId]);
  
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "No se encontró la tarea", message: `La tarea con ID ${tareaId} no existe` });
      } else {
        res.json({ message: 'Tarea eliminada con éxito' });
      }
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
      res.status(500).json({ error: "Error interno del servidor", message: error.message });
    }
  };
  
module.exports = tareasCtrl;