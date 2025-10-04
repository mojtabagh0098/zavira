// cjs
const express = require('express');
const app = express();

// api/index.js
app.get('/', (req, res) => {
    res.json({
        "hello": "my dear"
    });
})

app.listen(process.env.PORT || 3000);
// api/index.js
module.exports = app