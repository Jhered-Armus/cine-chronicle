const express = require('express')
const connectDB = require('./src/config/db');
const cors = require('cors');

const app = express();

//conectar a la base de datos
connectDB()

//MiddleWare
app.use(cors());
app.use(express.json());

//Rutas
app.use('/api/users', require('./src/routes/UserRoutes'));

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Welcome to the Movie Catalog API');
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})