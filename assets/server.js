const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequalizeStore = require('connect-session-sequalize')(session.Store);
const helpers = require('./utils/helpers')

const routes = require('./controllers');
const sequalize = require('cofig/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'asdoitahetlk',
    cookie: {},
    resave: false,
    saveUninitializedStore({
        db: sequalize,
    }),
};

app.use(session(sess));

const hbs = exphbs.create({helpers});

app.engine('handlebars', hbs.engine);
app.set('veiw engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequalize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
});