const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bp = require('body-parser');
const qr = require('qrcode');
const cors = require('cors');

app.set("view engine", "ejs");
app.use(bp.urlencoded({extended: true}));
app.use(bp.json());
app.use( express.static( "views" ) );


// posible solución para posible problema de CORS
// const whitelist = ['http://localhost:8080', 'https://myapp.co']; //lista de dominios permitidos EJEMPLOS
// const options = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('no permitido'));
//     }
//   },
// };
// app.use(cors(options));
app.use(cors());

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/scan', (req, res) => {
    const url = req.body.url;
    if(url === 0){
        res.send('Please enter a valid URL');
    } else {
        qr.toDataURL(url, (err, src) => {
            if(err){
                res.send('Please enter a valid URL');
            } else {
                res.render('scan', { src });
            }
        });
    }
});

 app.listen(port, () => console.log(`Example app listening on port ${port}!`));

