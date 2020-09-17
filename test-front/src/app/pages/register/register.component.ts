import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public nuevoUsuarioForm = this.fb.group({
    nombre: ['',  Validators.required ],
    apellido: ['', Validators.required  ],
    nick: ['', [Validators.minLength(3), Validators.required ] ],
    email: ['', [Validators.required, Validators.email] ],
    direccion: ['', [ Validators.required, Validators.minLength(5) ] ]
  });

  constructor(
    public _usuarioServices: UsuarioService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
  }
  crearUsuario() {
    this.formSubmitted = true;
    console.log( this.nuevoUsuarioForm.value );

    if ( this.nuevoUsuarioForm.invalid ) {
      return;
    }

    // Realizar el posteo
    this._usuarioServices.crearUsuario( this.nuevoUsuarioForm.value )
        .subscribe( resp => {

          // Navegar al Dashboard
          this.router.navigateByUrl('/dashboard');

        }, (err) => {
          // Si sucede un error
          Swal.fire('Error', 'error' );
        });


  }

  campoNoValido( campo: string ): boolean {

    if ( this.nuevoUsuarioForm.get(campo).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

}
