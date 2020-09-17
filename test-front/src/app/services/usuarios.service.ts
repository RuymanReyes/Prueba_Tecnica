import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { pipe, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;


  URL_SERVICES = 'http://localhost:3000';

  constructor(
    public http: HttpClient,
    public router: Router,
  ) {}


  // ====================================
  // CREAR USUARIO
  // ====================================

  crearUsuario(usuario: Usuario) {

    const url = this.URL_SERVICES + '/usuarios';

    return this.http.post(url, usuario)
      .pipe(map((resp: any) => {
        Swal.fire('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      })
      )
      .pipe(
        catchError( err => {
          Swal.fire( err.error.mensaje, err.error.errors.message, 'error');
          return throwError( err );
        })
      );
  }

  // ====================================
  // ACTUALIZAR USUARIO
  // ====================================
  actualizarUsuario(usuario: Usuario) {

    let url = this.URL_SERVICES + '/usuarios/' + usuario._id;
    console.log(url)

    return this.http.put(url, usuario)
      .pipe(map((resp: any) => {

        Swal.fire('Usuario Actualizado', usuario.nombre, 'success');

        return resp.usuario;
      }))
      .pipe(
        catchError( err => {
          Swal.fire( err.error.mensaje, 'error');
          return throwError( err );
        })
      );

  }

  // ====================================
  // ELIMINAR USUARIO
  // ====================================

  borrarUsuario(id: string) {
    let url = this.URL_SERVICES + '/usuarios/' + id;

    return this.http.delete(url)
      .pipe(map((resp: any) => {
        Swal.fire(
          '¡Borrado!',
          'El usuario,ha sido borrado',
          'success'
        );
        return true;
      }));
  }


  // ====================================
  // CARGAR USUARIOS
  // ====================================

  cargarUsuarios() {

    const url = this.URL_SERVICES + '/usuarios';

    return this.http.get(url);
  }

  // ====================================
  // BUSCAR UN USUARIO
  // ====================================

  buscarUsuarios(termino: string) {
    const url = this.URL_SERVICES + '/api/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.usuarios));
  }

    // ====================================
  // CARGAR USUARIOS POR ID
  // ====================================

  cargarUsuariosByID(id: string) {

    const url = this.URL_SERVICES + '/usuarios/' + id;

    return this.http.get(url)
    .pipe(map((resp: any) => resp.usuario));
  }

}
