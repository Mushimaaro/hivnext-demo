import express from 'express';
import { getRole, getAllRoles, updateRole, deleteRole, createRole } from '../controllers/roleController.js';

const roleRouter = express.Router();

roleRouter.post('/get', getRole);
roleRouter.get('/get-all', getAllRoles);
roleRouter.put('/update', updateRole);
roleRouter.delete('/delete', deleteRole);
roleRouter.post('/create', createRole);

export default roleRouter;