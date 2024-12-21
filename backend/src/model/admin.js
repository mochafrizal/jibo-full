import { mongoose, Schema } from "mongoose";
import bcrypt from "bcrypt";

// Skema untuk model User
const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
},
  { timestamps: true }
);

adminSchema.pre('save', async function (next) {
  const modifyPassword = this.isModified('password');
  // if(!this.isModified('password')) return next()
  if (!modifyPassword) return next;

  try {
    // buat salt
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(this.password, salt);
    this.password = hashedPass;
    next()
  } catch (error) {
    next(error)
  }
});

adminSchema.pre('findOneAndUpdate', async function (next) {
  // console.log('Middleware findOneAndUpdate dipanggil');
  const update = this.getUpdate(); // Mendapatkan data yang diupdate
  // console.log('Data yang akan diupdate:', update);

  if (update.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(update.password, salt);
      this.setUpdate({
        ...update,
        password: hashedPass
      })
    } catch (error) {
      next(error)
    }
  }
  next();
});

// Buat model dari skema
const Admin = mongoose.model('admins', adminSchema);
export default Admin; // Atau ekspor sebagai named export: export { Admin };
