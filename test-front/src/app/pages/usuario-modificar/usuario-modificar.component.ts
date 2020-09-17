import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-modificar',
  templateUrl: './usuario-modificar.component.html',
  styles: []
})
export class UsuarioModificarComponent implements OnInit {

  public formSubmitted = false;
  usuario: Usuario;
  id: any;

  public usuarioUpdate = this.fb.group({
    _id: [''],
    nombre: ['',  Validators.required ],
    apellido:['', Validators.required  ],
    nick: ['', [Validators.minLength(3), Validators.required ] ],
    email: ['', [Validators.required, Validators.email] ],
    direccion: ['', [ Validators.required, Validators.minLength(5) ] ]
  });

  constructor( private fb: FormBuilder,
              public _usuarioServices: UsuarioService,
              public route: ActivatedRoute,
              public router: Router
    ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params;
    console.log(this.id.id);

    this.obtenerUsario();
  }

   obtenerUsario() {
     this._usuarioServices.cargarUsuariosByID(this.id.id)
      .subscribe( (resp: any ) => {
        console.log(resp);
        this.usuario = resp;

        this.usuarioUpdate.setValue({
            _id: this.usuario._id,
            nombre: this.usuario.nombre,
            apellido: this.usuario.apellido,
            nick: this.usuario.nick,
            email: this.usuario.email,
            direccion: this.usuario.direccion
        });
      });
  }


ModificarUsuario() {

  if (this.usuarioUpdate.invalid) {
    return;
  }

  let usuario = new Usuario(

    this.usuarioUpdate.value.nombre,
    this.usuarioUpdate.value.apellido,
    this.usuarioUpdate.value.email,
    this.usuarioUpdate.value.nick,
    this.usuarioUpdate.value.direccion,
    this.usuarioUpdate.value._id
  );
  console.log(usuario);


  this._usuarioServices.actualizarUsuario(usuario)
     .subscribe( (resp: any ) => {
       console.log(resp);
       this.router.navigate(['/dashboard']);
     });

}

campoNoValido( campo: string ): boolean {

  if ( this.usuarioUpdate.get(campo).invalid && this.formSubmitted ) {
    return true;
  } else {
    return false;
  }

}


}
