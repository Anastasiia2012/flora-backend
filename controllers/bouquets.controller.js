'use strict';

const HTTP_STATUS = require('../constants/httpStatus');
const { ctrlWrapper } = require('../helpers');
const svc = require('../services/bouquets.service');

const listBouquets    = async (req, res) => res.status(HTTP_STATUS.OK).json(await svc.listBouquets(req.query));
const getBouquetById  = async (req, res) => res.status(HTTP_STATUS.OK).json({ data: await svc.getBouquetById(req.params.id) });
const createBouquet   = async (req, res) => res.status(HTTP_STATUS.CREATED).json({ data: await svc.createBouquet(req.body) });
const updateBouquet   = async (req, res) => res.status(HTTP_STATUS.OK).json({ data: await svc.updateBouquet(req.params.id, req.body) });
const deleteBouquet   = async (req, res) => res.status(HTTP_STATUS.OK).json(await svc.deleteBouquet(req.params.id));
const setFavorite     = async (req, res) => res.status(HTTP_STATUS.OK).json({ data: await svc.setFavorite(req.params.id, req.body.favorite) });
const updatePhoto     = async (req, res) => res.status(HTTP_STATUS.OK).json({ data: await svc.updatePhoto(req.params.id, req.file) });

module.exports = {
  listBouquets:   ctrlWrapper(listBouquets),
  getBouquetById: ctrlWrapper(getBouquetById),
  createBouquet:  ctrlWrapper(createBouquet),
  updateBouquet:  ctrlWrapper(updateBouquet),
  deleteBouquet:  ctrlWrapper(deleteBouquet),
  setFavorite:    ctrlWrapper(setFavorite),
  updatePhoto:    ctrlWrapper(updatePhoto),
};
