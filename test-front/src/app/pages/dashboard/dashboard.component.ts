import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { UsuarioService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  public formSubmitted = false;

  usuarios: Usuario[] = [];

  usuarioSelect: Usuario;

  public usuarioUpdate = this.fb.group({
    nombre: ['',  Validators.required ],
    apellido: ['', Validators.required  ],
    nick: ['', [Validators.minLength(3), Validators.required ] ],
    email: ['', [Validators.required, Validators.email] ],
    direccion: ['', [ Validators.required, Validators.minLength(5) ] ]
  });

  cargando: boolean = true;


  constructor(
    public _usuarioServices: UsuarioService,
    private fb: FormBuilder
    ) {

     }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioServices.cargarUsuarios()
      .subscribe((resp: any) => {
        console.log(resp);
        this.usuarios = resp.usuarios;
        this.cargando = false;

      });

  }

  buscarUsario(termino: string) {

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;


    this._usuarioServices.buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {

        this.usuarios = usuarios;
        this.cargando = false;
      });
  }



  borrarUsuario(usuario: Usuario) {

    Swal.fire({
      title: '¿Estas seguro',
      text: 'Está a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      showClass: {
        popup: 'animated fadeInDown faster'
      },
      hideClass: {
        popup: 'animated fadeOutUp faster'
      },
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡Bórralo!'
    }).then((result) => {
      if (result) {
        this._usuarioServices.borrarUsuario(usuario._id)
          .subscribe((borrado: boolean) => {
            console.log(borrado);
            this.cargarUsuarios();
          });
      }
    });
  }


  guardarUsuario(usuario: Usuario) {
    this._usuarioServices.actualizarUsuario(usuario)
     .subscribe();
  }

  obtenerUsuario(usuario: Usuario ) {
    this.usuarioSelect = usuario;
    console.log(this.usuarioSelect)
  }


  modificarUsuario(usuario: Usuario) {
    console.log(this.usuarioUpdate.value);
  }

  // cargarData() {
  //   this.usuarioUpdate.setValue({
  //     nombre: [this.usuarioSelect.nombre,  Validators.required ],
  //   apellido: [this.usuarioSelect.apellido, Validators.required  ],
  //   nick: [this.usuarioSelect.nick, [Validators.minLength(3), Validators.required ] ],
  //   email: [this.usuarioSelect.email, [Validators.required, Validators.email] ],
  //   direccion: [this.usuarioSelect.direccion, [ Validators.required, Validators.minLength(5) ] ]
  //   });
  // }

  campoNoValido( campo: string ): boolean {

    if ( this.usuarioUpdate.get(campo).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

}
