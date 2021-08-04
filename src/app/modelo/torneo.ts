import { Categoria } from "./categoria";
import { Grupo } from "./grupo";

export interface Torneo{
    id:number;
    nombre:string;
    categoria:Categoria;
    fechaInicio:Date;
    grupos:Grupo[];
}
