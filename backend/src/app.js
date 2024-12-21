import express from 'express';
import cors from 'cors';
import adminRouter from './routes/adminRoutes.js';
import userRouter from './routes/userRoutes.js';
import loginRouter from './routes/loginRoutes.js';
import postRouter from './routes/postRoutes.js';
import productRouter from './routes/productRoutes.js';
import { connect } from './library/db.js';
import { errorHandler } from './middleeware/errorHandler.js';

// Membuat aplikasi Express
const app = express();
const port = process.env.PORT || 3000;

// Middleware CORS
app.use(cors({
    origin: 'http://localhost:5173', // URL frontend Anda
    credentials: true, // Memungkinkan pengiriman cookie lintas asal
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

// Global error handler
app.use(errorHandler);

// Endpoint root untuk tes koneksi
app.get('/', (req, res) => {
    res.send('Server backend terhubung dengan frontend!');
});

// Fungsi untuk memulai server dan menghubungkan ke database
const startServer = async () => {
    try {
        await connect(); // Menghubungkan ke database
        app.listen(port, () => {
            console.log(`Server berjalan di http://localhost:${port}`);
        });
    } catch (error) {
        console.log(`Gagal terhubung ke server: ${error.message}`);
    }
};

// Menjalankan server
startServer();
