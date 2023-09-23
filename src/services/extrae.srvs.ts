/**
 * Capa de negocio.
 */

import { extraeExamenes } from "../interfaces/extrae.ifcs";
import { connect } from "../db/dbConn";

const srvs_getExamenes = async (params: extraeExamenes) => {

        //try {
            console.log(params);  
            
            const pais_id = params.pais_id;
            const site = params.site;
            const tipo_examen = params.tipo_examen == "ambulatorio" ? 0 : 1;

            //console.log(pais_id, site, tipo_examen);

            const cnx = await connect();
            const sql = cnx.format(`
                    SELECT
                    RIS_EXAMEN.EXA_ID,
                    RIS_EXAMEN.URGENTE,  				
                    RIS_EXAMEN.EXA_EDAD,
                    RIS_EXAMEN.EXA_FECHATOMADO,
                    TM_MODALIDADES.ID_MODALIDAD,   
                    TM_PROCEDIMIENTOS.ID_PROCEDIMIENTO,
                    TM_PROCEDIMIENTOS.NOMBRE AS PROC_NOMBRE,
                    TM_PROCEDIMIENTOS.CODIGO,
                    TM_PROCEDIMIENTOS.CLASIFICACION,
                    PIT_EXA_PROC.EXA_UID
                FROM RIS_EXAMEN
                    INNER JOIN PIT_EXA_PROC ON PIT_EXA_PROC.EXA_ID = RIS_EXAMEN.EXA_ID
                    INNER JOIN TM_PROCEDIMIENTOS ON PIT_EXA_PROC.ID_PROCEDIMIENTO = TM_PROCEDIMIENTOS.ID_PROCEDIMIENTO
                    INNER JOIN TM_MODALIDADES ON TM_PROCEDIMIENTOS.ID_MODALIDAD = TM_MODALIDADES.ID_MODALIDAD                       
                    LEFT JOIN PIT_BOLSA_EXAMEN ON PIT_BOLSA_EXAMEN.EXA_ID = RIS_EXAMEN.EXA_ID            
                    LEFT JOIN RIS_ASIGNACION_AUTO ON RIS_EXAMEN.EXA_ID = RIS_ASIGNACION_AUTO.EXA_ID
                WHERE RIS_EXAMEN.TPOE_ID = 10
                    AND RIS_EXAMEN.URGENTE = ${tipo_examen} -- URGENTE 1 | AMBULATORIO 0
                    AND RIS_EXAMEN.EXA_ESTADOACTUAL= 12 -- (DEBE TENER VALOR 4)
                    AND RIS_EXAMEN.ID_CLIENTE_FAC <> 211 -- SE EXCLUYE CLIENTE Integramédica
                    AND PIT_BOLSA_EXAMEN.EXA_ID IS NULL
                    AND PIT_EXA_PROC.EXA_UID != ''
                    AND RIS_EXAMEN.SITE = '${site}'
                    AND RIS_EXAMEN.PAIS_ID = ${pais_id}     
                    -- AND RIS_EXAMEN.EXA_T0 > DATE_SUB( NOW( ), INTERVAL 200 MINUTE ) (COMENTADO PARA EVITAR EDICIÓN DE DATOS PARA OBTENER COINCIDENCIAS
                    AND RIS_ASIGNACION_AUTO.EXA_ID IS NULL   
                GROUP BY RIS_EXAMEN.EXA_ID 
                ORDER BY RIS_EXAMEN.EXA_T0 ASC 
                LIMIT 6;
                `);
            const result = await cnx.query(sql);
            
            //console.log('sql: ' + sql); Permite imprimir query
            
            return result[0];            
        // } catch (e) {
        //     handleHttp(res, 'ERROR_SRVS_GETEXAMENES',e);
        // }

};

export { srvs_getExamenes };