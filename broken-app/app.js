const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function getInfo(arrayOfDevUsernames){
  try{
    return await axios.all(arrayOfDevUsernames.map((dev) => axios.get(`https://api.github.com/users/${dev}`)))
  } catch (err){
    console.error(err)
  }
}

app.post('/', (req, resp, next) => {
    getInfo(req.body.developers).then(results =>{
      let out = results.map(r => ({ user : r.data.login, name: r.data.name, bio: r.data.bio, link: r.data.html_url }));
      return resp.send(JSON.stringify(out));
    })
});

app.listen(3000, console.log('Express app running on port 3000'));
