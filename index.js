const express = require('express');
const route = require('./routes/app');
app = express();


app.use('/I/want/title', route)
app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log("Serve Started...")
})