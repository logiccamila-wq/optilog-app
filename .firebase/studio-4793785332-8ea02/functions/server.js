const { onRequest } = require('firebase-functions/v2/https');
  const server = import('firebase-frameworks');
  exports.ssrstudio47937853328ea0 = onRequest({"region":"us-east4"}, (req, res) => server.then(it => it.handle(req, res)));
  