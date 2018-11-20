const multer = require('multer');


const createMulterStorage = () => {
    //  storage setting for multer
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads')
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now())
        }
    });
    return  multer({storage: storage});
}

module.exports = {
    createMulterStorage
}