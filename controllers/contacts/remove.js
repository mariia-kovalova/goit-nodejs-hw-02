const { Contact } = require('../../models/contact');
const { HttpError } = require('../../utils');

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) throw HttpError(404, 'Not found');
  res.json(result);
};

module.exports = remove;
