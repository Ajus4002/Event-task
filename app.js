import express from 'express';
import { sequelize } from './config/db.js';
import eventRoutes from './routes/eventRoutes.js';
import webRoutes from './routes/webRoutes.js';
import path from 'path';
import fileUpload from 'express-fileupload';
import hbs from 'express-hbs'

const app = express();


// Database connection
sequelize.sync();

app.engine('hbs', hbs.express3({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './templates');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join( 'uploads')));

app.use(fileUpload());
app.use('/api/events', eventRoutes);
app.use('/', webRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
