const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


/*REST-webbtjänst*/

//Hämta inlägg med varor
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());         
});

//Skapa inlägg vara
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        section: req.body.section,
        goods: req.body.goods,
        quantity: req.body.quantity,
        store: req.body.store,
        createdAt: new Date()
    });
    res.status(201).send();
});

//Radera vara
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id) }); //Raderar specifikt inlägg
    res.status(200).send();
});

//Uppdatera vara
router.put('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    console.log(req.body.section)
    await posts.updateOne(
        { _id: new mongodb.ObjectID(req.params.id) },
        {
            $set: {
            section: req.body.section,
            goods: req.body.goods,
            quantity: req.body.quantity,
            store: req.body.store
            }
        }
    );
    res.status(201).send();
});

//Skapar sökväg med mongodb atlas och hämtar information från min collection
async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://rebbe123:1234@list-8k2uu.gcp.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('jsprojekt').collection('shoppinglist');
}

//Export av routern
module.exports = router;