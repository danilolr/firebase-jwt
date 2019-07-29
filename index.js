const express = require('express');
var cors = require('cors');

var admin = require('firebase-admin');
var serviceAccount = require("./rygapp-1-firebase-adminsdk-rww01-19a4c0440a.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://rygapp-1.firebaseio.com"
});

const port = 3000;

const app = express();
app.use(cors())

app.get('/auth', (req, res) => {
    var token = req.query.token;
    res.setHeader('Content-Type', 'application/json');
    admin.auth().verifyIdToken(token)
        .then(function (decodedToken) {
            res.end(JSON.stringify({ 'valid': true, 'uid': decodedToken.uid, 'email': decodedToken.email, 'name': decodedToken.name }));
        }).catch(function (error) {
            res.end(JSON.stringify({ 'valid': false }));
        });

});

app.listen(port, () => console.log(`Firebase-jwt server listening on port ${port}!`));