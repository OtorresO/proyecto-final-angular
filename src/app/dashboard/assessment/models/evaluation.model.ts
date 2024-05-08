export default interface Evaluation {
    idTeacher: number | null,
    idSchool: number | null,
    date: string | null,
    factores: Factor[] | null,
}

export interface Factor {
    idFactor: number | null;
    factor: string | null;
    recomendacion: null | string;
    indicadores: IndicadorEvaluation[] | null;
}

export interface IndicadorEvaluation {
    idIndicador: number | null;
    idValoracionSeleccionada: number | null
    valoracionDescription:string|null
    valor:number|null
}