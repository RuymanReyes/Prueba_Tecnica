export class Usuario {
    constructor(
        public nombre: string,
        public apellido: string,
        public email: string,
        public direccion: string,
        public nick: string,
        public _id?: string
    ) { }
}
