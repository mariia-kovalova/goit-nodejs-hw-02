const { Contact } = require('../../models/contact');
const { HttpError } = require('../../utils');

const updateFavoriteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) throw HttpError(404, 'Not found');
  res.json(result);
};

module.exports = updateFavoriteById;
