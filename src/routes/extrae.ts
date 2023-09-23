/**
 * El controlador sólo gestiona request y response.
 * Verbose: get, post, put, delete.
 */

import {Request, Response, Router} from "express";
import { getExamenes, getExamenesAsignacion, getMedico, putExamen } from "../controllers/extrae.ctrl"
import { logMiddleware } from "../middleware/mid.log";

const router = Router();
/**
 * http://localhost:3002/extrae [get]
 */

router.get('/', logMiddleware, getExamenes);

router.get('/:exa_id', getMedico);

router.post('/', logMiddleware, getExamenesAsignacion);

router.put('/:exa_id/:user', putExamen);

export { router };

