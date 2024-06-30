const app = require('./app');
const PORT = process.env.PORT || 5021;
const conn = require('./database/conn');


conn.sync()
.then(() => {
    app.listen(PORT, () => {
        console.log("Server ON port: ", PORT);
    })
}).catch((err) => {
    console.log(err)
});
