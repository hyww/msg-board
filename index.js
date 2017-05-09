const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let data = [
  {
    children: [1],
  },
  {
    time: (new Date()).valueOf(),
    text: `## Hello World!
+ Yeah, we support [markdown](http://markdown.tw/)
+ using [markdown-js](https://github.com/evilstreak/markdown-js)`,
    children: [],
  },
]

app.use(express.static('build'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //FIXME
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get('/api/comments', (req, res) => {
  res.json(data);
});

app.post('/api/comments', (req, res) => {
  if(!req.body.text) {
    res.status(400).send('Bad request.');
    console.log('Bad request.');
  }
  else {
    const msg = {
      time: (new Date()).valueOf(),
      text: req.body.text,
      children: []
    }
    data[req.body.parent_id].children.push(data.length);
    data.push(msg);
    console.log(data);
    res.send('hi');
  }
});

app.listen(5000);
