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
//     origin: 'http://localhost:5173', // URL frontend Anda
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


// deploy vercel

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
    origin: 'http://localhost:5173', // URL frontend Anda
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/admin', adminRouter)
app.use('/user', userRouter)
app.use('/auth', loginRouter)
app.use('/posts', postRouter)
app.use('/product', productRouter)
app.use('/logout', logoutRouter);

app.use(errorHandler)

// Export untuk Vercel
export default app

// Server start hanya jika bukan di Vercel 
if (process.env.NODE_ENV !== 'production') {
    const startServer = async () => {
        try {
            await connect()
            app.listen(port, () => {
                console.log(`app listen on port: ${port}`);
            })
        } catch (error) {
            console.log(`Gagal terhubung ke server: ${error.message}`);
        }
    }
    startServer()
}

// Tambahkan health check endpoint
app.get('/', (req, res) => {
    res.json({ status: 'API is running' });
});

// Koneksi DB untuk environment production
if (process.env.NODE_ENV === 'production') {
    connect().catch(err => console.log('DB Connection Error:', err));
}