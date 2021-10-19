import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from "aws-sdk";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_PASSWORD, 
  },
})

const multerUploader = multerS3({
  s3: s3,
  bucket: 'cau-gy',
  acl: "public-read",
  key: function(req, file, cb){
    cb(null, file.originalname.split('.').shift());
}
})

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     },
//     limits: {
//         fileSize: 10000000
//     },
//     storage:multerUploader,
//   })
export const storyUpload = multer({
    storage:multerUploader,
    dest: "uploads",
    // destination: function (req, file, cb) {
    //   cb(null, 'uploads')
    // },
    // filename: function (req, file, cb) {
    //   cb(null, file.originalname)
    // },
    limits: {
        fileSize: 10000000
    },
  });


// export const storyUpload = multer({ storage })

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  next();
}