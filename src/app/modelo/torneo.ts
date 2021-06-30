import { Categoria } from "./categoria";
import { Grupo } from "./grupo";

export interface Torneo{
    id:number;
    nombre:string;
    categoria:Categoria;
    fechaInicio:Date;
    grupos:Grupo[];
}

/*export class Torneo{
    id:number=0;
    nombre:string="";
    categoria:Categoria={id:0,nombre:""};
    fechaInicio:Date = new Date();
    grupos:Grupo[] = [];

    private static nombreGrupo:string[] = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    addGrupo(){
        if(this.grupos.length<Torneo.nombreGrupo.length){
            this.grupos.push({id:0,nombre: Torneo.nombreGrupo[this.grupos.length],equipos:[]} as Grupo);
        }
    }
}*/