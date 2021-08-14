import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    },
    limits: {
        fileSize: 10000000
    }
  })

export const storyUpload = multer({ storage })