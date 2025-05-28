const mongoose = require('mongoose');

const uri = "mongodb+srv://gabrielcv20:abc132023@cineplusdb.xv9dgo9.mongodb.net/cineplus?retryWrites=true&w=majority&appName=CinePlusDB";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Atlas conectado con Mongoose"))
.catch(err => console.error("❌ Error MongoDB:", err));
