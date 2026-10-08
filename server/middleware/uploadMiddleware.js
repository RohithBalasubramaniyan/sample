const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanBase = path.basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 30);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${cleanBase}-${uniqueSuffix}${ext}`);
  },
});

// File filter (images & pdf)
const fileFilter = (req, file, cb) => {
  const allowedExtensions = /jpeg|jpg|png|webp|svg|gif|pdf/;
  const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
  const mime = file.mimetype;

  if (allowedExtensions.test(ext) || mime === 'application/pdf' || mime.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images (.jpg, .jpeg, .png, .webp, .svg) and PDF documents are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter: fileFilter,
});

module.exports = upload;
