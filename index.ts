import * as express from 'express';
import * as bodyParser from 'body-parser';
import api from './api';

const main = express();
const port = process.env.PORT || 3000;

main.use(bodyParser.json());
main.use(express.static(__dirname));
main.use('/api/v1', api);

main.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: __dirname
    });
});

const server = main.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});

server.on("error", (error: any) => {
    console.error(`Ocurrió un error al iniciar el servidor: ${error.message}`);
});
