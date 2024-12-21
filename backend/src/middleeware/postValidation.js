import { body, check, validationResult } from "express-validator";

export const createPostValidation = [
    body('title')
        .exists({ checkFalsy: true })
        .withMessage('title wajib diisi')
        .isString()
        .withMessage('title harus string'),
    body('content')
        .exists({ checkFalsy: true })
        .withMessage('content wajib diisi')
        .isString()
        .withMessage('content harus string')
        .isLength({ min: 5 })
        .withMessage("content minimal 5 karakter"),
    check('image')
        .custom((value, {req}) => {
            // console.log("File yang diunggah di validasi:", req.file); 
            if(!req.file){
                throw new Error('Silahkan upload gambar terlebih dulu')
            }

            const allowedExtensions = ['image/jpeg', 'image/png'];
            // mime : file extensions
            if (!allowedExtensions.includes(req.file.mimetype)) {
                throw new Error('Hanya file JPG atau PNG yang diperbolehkan');
            }
            return true;
        })
]

export const updatePostValidation = [
    body('title')
        .optional()
        .isLength({ min: 5, max: 20 })
        .withMessage('Panjang konten antara 5-20 karakter'),
    body('content')
        .optional()
        .isLength({ min: 5, max: 20 })
        .withMessage('Panjang konten antara 5-20 karakter'),
    check('image')
        .custom((value, {req}) => {
		   if(!req.file){
				return true;
		   }

           const allowedExtensions = ['image/jpeg', 'image/png']; 

           if (!allowedExtensions.includes(req.file.mimetype)) {
           		throw new Error('Hanya file JPG atau PNG yang diperbolehkan');
           }
		   return true;
        })
]

export const result = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    next();
};