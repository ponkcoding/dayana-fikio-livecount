(function () {
  "use strict";

  const express = require("express");
  const cors = require("cors");

  const app = express();
  const config = {
    appName: "Live Count Instagram",
    port: 3001,
  };

  app.all("/", function(req, res){
    res.send('ok');
  })

  app.listen(config.port);
  console.log(config.appName + " running on port " + config.port);
})();
