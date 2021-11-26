const multer = require("multer")


const MIME_TYPE = {
    "image/png": true,
    "image/jpg": true,
    "image/jpeg": true,
}

module.exports = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "/uploads")
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    }),
    fileFilter: (req, file, cb) => {
        if(MIME_TYPE[file.mimetype]){
            cb(null, true)
        } else {
            return cb(new Error("Invalid Mime Type, please upload image"))
        }
    }
})