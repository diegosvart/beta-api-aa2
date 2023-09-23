/**
 * Lógica implementada entre el enrutador y el controlador.
 * Permite validaciones y otras aplicaciones.
 * Aplicaciones: Logs, autenticación, protección de rutas por Roles, diferenciar plataformas, etc.
 */
import { NextFunction, Request, Response } from "express"

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log('Middleware Log');
    next();
    
}

export { logMiddleware }