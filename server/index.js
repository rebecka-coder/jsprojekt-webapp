const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//Initiering av express
const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

app.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
	next();
});

//Länk till goods.js
const posts = require('./routes/api/posts');

app.use('/api/posts', posts);

//Hantera produktion
if(process.env.NODE_ENV === 'production') {
	//Statisk mapp
	app.use(express.static(__dirname + '/public/'));

	//Hantera enskilda applikationen
	app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

//variabel för port-anslutning
const port = process.env.PORT || 3000;

//Lyssnar in port-anslutning och ger ett meddelande
app.listen(port, () => console.log(`Serven är startad på port ${port}`));

