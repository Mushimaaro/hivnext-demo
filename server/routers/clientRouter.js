import express from 'express';
import { getClient, getAllClients, updateClient, deleteClient, createOneClient, createClients } from '../controllers/clientController.js';

const clientRouter = express.Router();

clientRouter.post('/get', getClient);
clientRouter.get('/get-all', getAllClients);
clientRouter.put('/update', updateClient);
clientRouter.delete('/delete', deleteClient);
clientRouter.post('/create', createOneClient);
clientRouter.post('/create-all', createClients);

export default clientRouter;