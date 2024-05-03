const express = require('express');
const path = require('path');

const app = express();

// Statik dosyaların bulunduğu dizini belirtin
app.use(express.static(path.join(__dirname, 'public')));

// Önceki middleware fonksiyonunu tanımlayın
const myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

// Middleware fonksiyonunu uygulayın
app.use(myLogger);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'template', 'index.html')); // Dosya yolu doğru bir şekilde belirtilmeli
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
