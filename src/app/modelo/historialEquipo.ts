import { Equipo } from "./equipo";
import { FilaTabla } from "./filaTabla";
import { Partido } from "./partido";

export interface HistorialEquipo{
    equipo:Equipo;
    nombreTorneo:string;
    partidos:Partido[];
    totales:FilaTabla;
}