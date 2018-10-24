const express = require('express');
const router = express.Router();
const models  = require('../models');
const dotenv = require('dotenv').config();
const request = require('request');

//Obtiene los usuarios
router.get('/', (req, res, next) => {
  models.User.findAll().then((users) => {
    if (users.length == 0) {
      res.status(404).json({
        status: 404,
        message: 'No existen usuarios en el sistema'
      });
    }
    res.status(200).json({
      status: 200,
      data: users
    });
  });
});

//Obtiene un usuario en particular
router.get('/:user_id', (req, res, next) => {
  models.User.findOne({
    where: {
      id: req.params.user_id
    }
  }).then((user) => {
    if (user == null) {
      res.status(404).json({
        status: 404,
        message: 'El usuario solicitado no ha sido encontrado'
      });
    }
    res.status(200).json({
      status: 200,
      data: user
    });
  });
});

//Crea un nuevo usuario
router.post('/', (req, res, next) => {
  let newUser = {
    given_name: req.body.given_name,
    family_name: req.body.family_name,
    auth0_id: req.body.auth0_id,
    active: req.body.active
  }
  models.User.create(newUser).then((user) => {
    res.status(200).json({
      status: 200,
      data: user
    });
  }, (error) => {
    return res.status(500).json({
      status: 500,
      message: 'Ocurrió un error al guardar el usuario',
      detail: error.message
    });
  });
});

//Actualiza un usuario
router.put('/:user_id', (req, res, next) => {
  let updateFields = {
    given_name: req.body.given_name,
    family_name: req.body.family_name,
    auth0_id: req.body.auth0_id,
    active: req.body.active
  };
  let userId = req.params.user_id;
  for (let prop in updateFields) {
    if (updateFields[prop] == undefined) {
      delete updateFields[prop];
    }
  }
  models.User.update(updateFields, { where: { id: userId }}).then((user) => {
    if (user == 1) {
      res.status(200).json({
        status: 200,
        data: user
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: 'El usuario que intenta editar no existe'
      });
    }
  }, (error) => {
    return res.status(500).json({
      status: 500,
      message: 'Ocurrió un error al actualizar el usuario'
    });
  });
});

//Borra un usuario
router.delete('/:user_id', (req, res, next) => {
  let userId = req.params.user_id;
  models.User.destroy({
    where: { id: userId }
  }).then((user) => {
    if (user == 1) {
      res.status(200).json({
        status: 200,
        data: user
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: 'El usuario que intenta eliminar no existe'
      });
    }
  }, (error) => {
    return res.status(500).json({
      status: 500,
      message: 'Ocurrió un error al borrar el usuario'
    });
  });
});

module.exports = router;
