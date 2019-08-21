const express = require('express')
const fileUpload = require('express-fileupload');
const fs = require('fs');

const app = express()
const port = 3000

app.use(fileUpload());
app.use(express.static('static'))

app.post('/upload', function (req, res) {
  let files = req.files.files;

  if(!(files instanceof Array)){
    files = [files];
  }

  Array.from(files).forEach(file => {
    fs.writeFileSync(`./temp/${file.name}`, file.data);
  });

  res.status(200).send('Operation completed');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))