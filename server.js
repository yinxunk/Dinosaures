const express = require('express');
const scrapeProduct = require('./controller/scrapeProduct');
const cors = require('cors');
const getList = require('./controller/getList');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/scrape', async(req,res) =>{
    const { url } = req.query;
    if(!url) {
        return res.status(400).send({error: 'Missing URL'});
    }
    try {
        const data = await scrapeProduct(url);
        if (data.link){
            res.send(data);
        } else{
            res.status(404).send({error: 'Image not found'});
        }
        
    }
    catch(error){
        console.error(error.stack);
        res.status(500).send({error: error.message});
    }
});

app.listen(PORT, () =>{
    console.log(`Server running on http://localhost:${PORT}`);
})

app.get('/getList', async(req,res) => {
    const { url } = req.query;
    if(!url) {
        return res.status(400).send({error: 'Missing URL'});
    }
    try {
        const data = await getList(url);
        if (data){
            res.send(data);
        } else{
            res.status(404).send({error: 'name not found'});
        }
        
    }
    catch(error){
        console.error(error.stack);
        res.status(500).send({error: error.message});
    }
})