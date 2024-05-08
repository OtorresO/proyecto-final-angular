export interface Rubric{
    idFactor:      number;
    factor:        string;
    recomendacion: null|string;
    indicadores:   Indicador[];
}

export interface Indicador {
    idIndicador: number;
    indicador:   string;
    valoraciones: Valoracion[];
}

export interface Valoracion {
    idValoracion: number;
    valoracion:   string;
    descripcion:  string;
    valor:        number;
}


