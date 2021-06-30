import { Equipo } from "./equipo";

export interface Grupo{
    id:number;
    nombre:string;
    equipos:Equipo[];
}