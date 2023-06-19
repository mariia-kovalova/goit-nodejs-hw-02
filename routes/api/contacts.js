const express = require('express');
const ctrl = require('../../controllers/contatcs');
const { validateBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:contactId', isValidId, ctrl.getById);

router.post('/', validateBody(schemas.addSchema), ctrl.add);

router.put(
  '/:contactId',
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavoriteById
);

router.delete('/:contactId', isValidId, ctrl.remove);

module.exports = router;
