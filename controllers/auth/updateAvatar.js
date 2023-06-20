const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const { User } = require('../../models/user');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;

  const avatarImage = await Jimp.read(tmpUpload);
  await avatarImage
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_LEFT | Jimp.VERTICAL_ALIGN_TOP)
    .quality(75)
    .writeAsync(tmpUpload);

  try {
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tmpUpload, resultUpload);

    const avatarUrl = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, { avatarUrl });

    res.json({ avatarUrl });
  } catch (error) {
    await fs.unlink(tmpUpload);
    next(error);
  }
};

module.exports = updateAvatar;
