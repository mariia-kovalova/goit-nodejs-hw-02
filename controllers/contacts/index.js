const getAll = require('./getAll');
const getById = require('./getById');
const add = require('./add');
const updateById = require('./updateById');
const updateFavoriteById = require('./updateFavoriteById');
const remove = require('./remove');
const { ctrlWrapper } = require('../../utils');

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
  remove: ctrlWrapper(remove),
};
