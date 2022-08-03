    // Call all needed middleware to server.js
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequalizeStore = require('connect-session-sequalize')(session.Store);

    // call timestamp helper to server.js
const helpers = require('./utils/helpers');

    // designate where the routes folder
const routes = require('./controllers');

    // deignate the database configuation
const sequalize = require('cofig/connection');

    // enable the express middleware
const app = express();

    // enable the .env middleware
const PORT = process.env.PORT || 3001;

    // configure the session middleware
const sess = {
    secret: 'asdoitahetlk',
    cookie: {},
    resave: false,
    saveUninitializedStore: true,
    store: new SequelizedStore({
        db: sequalize,
    }),
};
    // enable the session middleware
app.use(session(sess));

    // designate the handlebars to use the helpers function
const hbs = exphbs.create({helpers});

    // enable the veiw engine in handlebars
app.engine('handlebars', hbs.engine);
app.set('veiw engine', 'handlebars');

    // enable express to read both JSON and URL encoding in incoming queries
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

    // enable express to access the public folder
app.use(express.static(path.join(__dirname, 'public')));

    // enabel express routes
app.use(routes);

    // links sequaized middleware to the PORT
sequalize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
});