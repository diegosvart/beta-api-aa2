/**
 * Permite definir los tipos de datos.
 * Cómo validar la data que se asigna a una interfaz?
 */

export interface extraeExamenes{
    readonly pais_id: 1 | 5;
    readonly site: "CL" | "CO";
    readonly tipo_examen: string; //urgente | ambulatorio
}