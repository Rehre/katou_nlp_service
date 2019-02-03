import express from 'express';
import bodyParser from 'body-parser';

import classifyRouter from './routes/classify';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/classify', classifyRouter);

app.get('/', (req, res) => res.send('index'));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening in PORT: ${port}`));
