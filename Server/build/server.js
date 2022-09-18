//usando no package json uma tag "type":"module" pode usar o express sem usar o require
import express from 'express';
const app = express();
//req ->  busca informações
//res ->  devolve uma resposta
app.get('/ads', (req, res) => {
    return res.json([
        {
            id: 1,
            name: "anuncio1"
        },
        {
            id: 2,
            name: "anuncio2"
        },
        {
            id: 3,
            name: "anuncio3"
        },
    ]);
});
app.listen(3333);
