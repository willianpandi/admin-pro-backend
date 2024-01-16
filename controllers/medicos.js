const { response } = require("express");
const Medico = require("../models/medico");

const getMedicos = async (req, res = response) => {
  const medicos = await Medico.find()
                                  .populate('usuario','nombre img')
                                  .populate('hospital','nombre img');
  res.json({
    ok: true,
    medicos,
  });
};
const creatMedicos = async (req, res = response) => {
    const uid = req.uid;
    const medico = new Medico({
      usuario: uid,
    //   hospitales: req.body.hospitales,
      ...req.body,
    });

  try {

    const medicoDB = await medico.save();
    res.json({
      ok: true,
      medicos: medicoDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};
const updateMedicos = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;
  try {

    const medico = await Medico.findById( id );
    if ( !medico ) {
      res.status(404).json({
        ok: false,
        msg: "Medico no encontrado por id",
      });
    }

    // hospital.nombre = req.body.nombre;
    const cambiosMedico = {
      ...req.body,
      usuario: uid,
    }

    const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true } );

    res.json({
      ok: true,
      hospital: medicoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const deleteMedicos = async (req, res = response) => {
  const id = req.params.id;
  try {

    const medico = await Medico.findById( id );
    if ( !medico ) {
      res.status(404).json({
        ok: false,
        msg: "Medico no encontrado por id",
      });
    }

    await Medico.findByIdAndDelete( id );

    res.json({
      ok: true,
      msg: 'Medico Eliminado',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }

};

module.exports = {
  getMedicos,
  creatMedicos,
  updateMedicos,
  deleteMedicos,
};
