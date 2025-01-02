import multer from "multer";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadsPath = path.join(__dirname, '../uploads');

        if (!fs.existsSync(uploadsPath)) {
            fs.mkdirSync(uploadsPath);
        }

        cb(null, uploadsPath);
    },
    filename: (req, file, cb) => {
        const unique = Date.now() + Math.round(Math.random() * 1E9);

        const ext = path.extname(file.originalname);

        cb(null, file.fieldname + '-' + unique + ext);
    }
});

export const upload = multer({ storage });