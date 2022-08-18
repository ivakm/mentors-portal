import express from 'express';
import mongoose from 'mongoose';
import router from './router.js';
import cors from 'cors';


const PORT = process.env.PORT || 5000;
const DB_URL = `mongodb+srv://admin:admin@cluster0.vmzgk0y.mongodb.net/auth_roles?retryWrites=true&w=majority`

const app = express();
app.use(cors());

app.use(express.json());
app.use('/auth', router);

async function startApp() {
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT, () => console.log('Server Startsadeasdd ' + PORT));
    } catch (e) {
        console.log(e);
    }
}
startApp();
