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
const updateMedicos = (req, res = response) => {
  res.json({
    ok: true,
    msg: "actualizar Medicos",
  });
};
const deleteMedicos = (req, res = response) => {
  res.json({
    ok: true,
    msg: "eleiminar Medicos",
  });
};

module.exports = {
  getMedicos,
  creatMedicos,
  updateMedicos,
  deleteMedicos,
};
