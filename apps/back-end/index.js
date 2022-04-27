const express = require('express')
const app = express();
const port = process.env.PORT || 3000;

const list = require('./files');

app.use('/assets',express.static(`${__dirname}/assets`));

app.get('/:place/:scene?/objects', (req, res) => {
    if(!req.params.place) {
        res.send("Parametros não preenchidos corretamentes");
        return;
    }

    (list.objects(req.params.place, req.params.scene).then( (a) => {
        res.json({ 
            objects: a
        });
    }));
});

app.get('/places', (req, res) => {
    (list.places().then( (a) => {
        res.json({ 
            places: a
        });
    }));
});

app.get('/:place/scenes', (req, res) => {
    if(!req.params.place) {
        res.send("Parametros não preenchidos corretamentes");
        return;
    }

    (list.scenes(req.params.place).then( (a) => {
        res.json({ 
            scenes: a
        });
    }));
});

app.get('/:file?/path', (req, res) => {
    (list.path(req.params.file).then( (a) => {
        res.json({ 
            files: a
        });
    }));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

