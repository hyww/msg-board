const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const randomcolor = require('randomcolor');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

let data = [
  {
    children: [1],
  },
  {
    time: (new Date()).valueOf(),
    text: `## Hello World!
+ We support [markdown](http://markdown.tw/) by using [markdown-js](https://github.com/evilstreak/markdown-js)
+ We use [random colors](https://github.com/davidmerfield/randomColor) to identify different users.`,
    children: [],
    color: '#F0F0F0',
  },
]

app.use(express.static('build'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  req.color = req.cookies.color || randomcolor({luminosity: 'light'});
  res.cookie('color', req.color, { maxAge: 1000*60*60*24*30 });
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
      color: req.color,
      children: []
    }
    data[req.body.parent_id].children.push(data.length);
    data.push(msg);
    console.log(data);
    res.send('hi');
  }
});

app.listen(5000);
