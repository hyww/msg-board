const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let data = [
  {
    time: 1494354687000,
    text: 'Hello Root!',
    user: 'test',
    children: [1],
  },
  {
    time: 1494354687000,
    text: 'Hello World!',
    user: 'test',
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
  if(!(req.body.user&&req.body.text)) {
    res.status(400).send('Bad request.');
    console.log('Bad request.');
  }
  else {
    const msg = {
      time: (new Date()).valueOf(),
      user: req.body.user,
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
