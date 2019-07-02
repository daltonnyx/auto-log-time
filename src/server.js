import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config.json';
import routing from './server.routing';

let app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'js');
app.engine('js', require('express-react-views').createEngine());

app.server = http.createServer(app);


// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

app.use(routing());

app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${app.server.address().port}`);
});

export default app;