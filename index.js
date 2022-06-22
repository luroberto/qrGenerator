const express = require('express');
const app = express();
const port = 3000;
const bp = require('body-parser');
const qr = require('qrcode');

app.set("view engine", "ejs");
app.use(bp.urlencoded({extended: true}));
app.use(bp.json());
app.use( express.static( "views" ) );

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

