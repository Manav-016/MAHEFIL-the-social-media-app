import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet, { crossOriginResourcePolicy } from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { register } from './controllers/authentication.js';

/*CONF*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({
    limit: "10MB", extended: true
}));
app.use(bodyParser.urlencoded({
    limit: "10MB", extended: true
}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/*file*/

const storage = multer.diskStorage(
    {
        destination: function (req, file, callback) {
            callback(null, 'public/assets');
        },
        filename: function (req, file, callback) {
            callback(null, file.originalname);
        }

    }
);
const upload = multer({ storage });


/*routs*/

app.post("/auth/register", upload.single("picture"), register);


/*mongo*/

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => {
        console.log(`${PORT} is being listened`);
    })
}).catch((error) => console.log(`${error}`));




