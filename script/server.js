(function(){
    'use strict';

    const express = require('express');
    const cors = require('cors');
    const instagram = require('./instagram');

    const app = express();
    const config = {
        appName: 'Live Count Fiki',
        port: 3001,
    }

    const allowlist = [
        'http://localhost:3000',
      ];
      const corsOptionsDelegate = function (req, callback) {
        let corsOptions;
        if (allowlist.indexOf(req.header("Origin")) !== -1) {
          corsOptions = {
            origin: true,
            credentials: true,
          }; // reflect (enable) the requested origin in the CORS response
        } else {
          corsOptions = {
            origin: false,
          }; // disable CORS for this request
        }
        callback(null, corsOptions); // callback expects two parameters: error and options
    };

    app.get('/', (req, res) => {
        res.send('OK');
    })

    app.get('/instagram/:username', cors(corsOptionsDelegate), (req, res) => {
        instagram.get(req.params.username).then((result) => {
            res.json(result);
        })
    })

    app.listen(config.port);
    console.log(config.appName + ' is running on port '+ config.port);
})();