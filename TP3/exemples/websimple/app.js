var express = require('express');
var app = express();
var rest = require('restler');
var http = require('http');
var bodyparser = require('body-parser');

var Chance = require('chance');
chance = new Chance()

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.use('/api/*',bodyparser.json({ type: 'application/json' }));

attractions = [{id:"1234", name:"Festival de la patate"}]

// Application web

app.get('/',function(req,res){
    rest.get('http://localhost:3000/api/attractions').on('complete', function(attractions) {
	res.render('main',{data:attractions});
    });
});


// Service web

app.get('/api/attractions', function(req,res){
    res.json(attractions);
});


app.post('/api/attraction', function(req,res){
    var newId = chance.guid();
    attractions.push({
	id: newId,
        name: req.body.name
    });
    console.log(attractions);
    res.json({id:newId});
});

app.get('/api/attraction/:id', function(req,res){
    for (i = 0; i < attractions.length; i++){
	if (attractions[i].id === req.params.id) {
	    res.json(attractions[i]);
	}
    }
    res.json([]);
});


app.put('/api/attraction/:id', function(req,res){
    for (i = 0; i < attractions.length; i++){
	if (attractions[i].id === req.params.id) {
	    var updatedAttraction = attractions[i];
	}
    }

    if (updatedAttraction) {
	for (att in req.body) {
	    updatedAttraction[att] = req.body[att];
	}
    }

    res.json(updatedAttraction ? updatedAttraction.id : {"id": "None" });

});

app.delete('/api/attraction/:id', function(req,res){
    var filteredAttractions = [];
    var deletedId = "None";
    for (i = 0; i < attractions.length; i++){
	if (attractions[i].id != req.params.id)
	    filteredAttractions.push(attractions[i]);
	else
	    deletedId = req.params.id;
    }
    attractions = filteredAttractions;
    res.json({id:deletedId})
});



// custom 404 page
app.use(function(req, res){
        res.type('text/plain');
        res.status(404);
        res.send('404 - Not Found');
});

// custom 500 page
app.use(function(err, req, res, next){
        console.error(err.stack);
        res.type('text/plain');
        res.status(500);
        res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log( 'Express démarré sur  http://localhost:' +
    app.get('port') + '; entrer Ctrl-C pour terminer.' );
})
