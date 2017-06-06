const express = require('express');
const tus = require('tus-node-server');
const EVENTS = tus.EVENTS;

const server = new tus.Server();
server.datastore = new tus.GCSDataStore({
  path: '/files',
  projectId: 'tus-node',
  keyFilename: process.env.KEY_FILE_NAME,
  bucket: 'tus-node',
});

server.on(EVENTS.EVENT_FILE_CREATED, (e) => {
  console.log('File created');
  console.log(e.file);
});

server.on(EVENTS.EVENT_UPLOAD_COMPLETE, (e) => {
  console.log('Upload complete');
  console.log(e.file);
});

const app = express();
app.all('/files/*', (req, res) => {
  server.handle(req, res);
});

const PORT = process.env.PORT || 3003;
app.listen(PORT);
console.log(`App listening on ${PORT}`);
