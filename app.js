const express = require("express");
const app = express();

const config = require('./config');
app.use(config);

const middleware = require('./middleware');
app.use(middleware.cors);

const router = require('./router');
app.use(router);





app.listen(80, () => {
    console.log(`Example app listening on port `);
});
