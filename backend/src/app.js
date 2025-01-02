// import express from 'express';
// import cors from 'cors';
// import adminRouter from './routes/adminRoutes.js';
// import userRouter from './routes/userRoutes.js';
// import loginRouter from './routes/loginRoutes.js';
// import postRouter from './routes/postRoutes.js';
// import productRouter from './routes/productRoutes.js';
// import { connect } from './library/db.js';
// import { errorHandler } from './middleeware/errorHandler.js';
// import logoutRouter from './routes/logoutRouter.js';
// import path from 'path';

// const app = express();
// const port = process.env.PORT || 3000;

// //  untuk dapat mengakses file gambar dari folder uploads
// app.use('/uploads', express.static(path.join(path.resolve(), 'src/uploads')));
// // Middleware CORS
// app.use(cors({
//     origin: process.env.NODE_ENV === 'production'
//         ? ['https://jibo-full-backend.vercel.app/', 'http://localhost:5173']
//         : 'http://localhost:5173',
//     credentials: true,
// }));

// // Middleware parsing request body
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Menyambungkan rute
// app.use('/admin', adminRouter);
// app.use('/user', userRouter);
// app.use('/auth', loginRouter);
// app.use('/posts', postRouter);
// app.use('/product', productRouter);
// app.use('/logout', logoutRouter);

// // Global error handler
// app.use(errorHandler);

// // Endpoint root untuk tes koneksi
// app.get('/', (req, res) => {
//     res.send('Server backend terhubung dengan frontend!');
// });

// // Fungsi untuk memulai server dan menghubungkan ke database
// const startServer = async () => {
//     try {
//         await connect(); // Menghubungkan ke database
//         app.listen(port, () => {
//             console.log(`Server berjalan di http://localhost:${port}`);
//         });
//     } catch (error) {
//         console.log(`Gagal terhubung ke server: ${error.message}`);
//     }
// };

// // Menjalankan server
// startServer();

// vercel run
import express from 'express';
import cors from 'cors';
import adminRouter from './routes/adminRoutes.js';
import userRouter from './routes/userRoutes.js';
import loginRouter from './routes/loginRoutes.js';
import postRouter from './routes/postRoutes.js';
import productRouter from './routes/productRoutes.js';
import { connect } from './library/db.js';
import { errorHandler } from './middleeware/errorHandler.js';
import logoutRouter from './routes/logoutRouter.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Untuk dapat mengakses file gambar dari folder uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware CORS
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? ['https://jibo-full-backend.vercel.app', 'http://localhost:5173']
        : 'http://localhost:5173',
    credentials: true,
}));

// Middleware parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Menyambungkan rute
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/auth', loginRouter);
app.use('/posts', postRouter);
app.use('/product', productRouter);
app.use('/logout', logoutRouter);

// Global error handler
app.use(errorHandler);

// Endpoint root untuk tes koneksi
app.get('/', (req, res) => {
    res.send('Server backend terhubung dengan frontend!');
});

// Connect to database dengan error handling
try {
    await connect();
    console.log('Database connected successfully');
} catch (error) {
    console.error('Failed to connect to database:', error);
}

// Export untuk Vercel
export default app;
