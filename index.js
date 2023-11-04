const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    req.send('Server is Running');
})

app.listen(port, () => {
    console.log(`Server is Running`,port);
})