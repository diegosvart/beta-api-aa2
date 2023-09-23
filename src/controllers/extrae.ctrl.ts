/**
 * Encargado de orquestar las solicitudes.
 * Gestiona la información del Request y el Response.
 */

import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handler";
import { srvs_getExamenes } from "../services/extrae.srvs";

const getExamenes = ({body}: Request, res: Response) => {

    try {
        console.log('llega getExamenes');        
        console.log(body);
        res.send(body);
    } catch (e) {
        handleHttp(res, 'ERROR_GETEXAMENES');
    }

};

const getExamenesAsignacion = async (req: Request, res: Response) => {

    try {
        const params = req.body;
        
        const resp = await srvs_getExamenes(params);
        
        res.send(resp);

    } catch (e) {
        handleHttp(res, 'getExamenesAsignacion', e);
    }

};

const getMedico = (req: Request, res: Response) => {

    try {
        console.log('llega');
    } catch (e) {
        handleHttp(res, 'ERROR_GETMEDICO');
    }

};

const putExamen = (req: Request, res: Response) => {

    try {
        console.log('llega');
    } catch (e) {
        handleHttp(res, 'ERROR_POSTEXAMEN');
    }

};

export { getExamenes, getExamenesAsignacion, getMedico, putExamen };

