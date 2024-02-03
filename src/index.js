const express = require('express');
const tasks = require('../routes/tasks');
const app = express();

// parse to json
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);
app.use('/api/v1/tasks', tasks);  
















app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
    }
);

