const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upLoaders = multer({
  storage: storage,
  limits: {fileSize: 1000000},
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('photoPath');

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb({message: 'Error: Images Only!'}, false);
  }
}

module.exports = upLoaders;