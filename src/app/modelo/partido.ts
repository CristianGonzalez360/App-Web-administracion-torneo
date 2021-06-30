import { Equipo } from "./equipo";
import { Fecha } from "./fecha";

export interface Partido{
    id:number;
    local:Equipo;
    visitante:Equipo;
    golesLocal:number;
    golesVisitante:number;
    fecha:Fecha;
    fechaJugado:Date;
}