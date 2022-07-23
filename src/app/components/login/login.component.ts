import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertControllerService } from '../../services/alert-controller.service';
import { LoadingControllerService } from '../../services/loading-controller.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  loginForm: FormGroup;

  @ViewChild('flipcontainer', { static: false }) flipcontainer: ElementRef;

  constructor(private fb: FormBuilder, 
              private authService: AuthService, 
              private loadingControllerService: LoadingControllerService,
              private userService: UserService, 
              private alertControllerService: AlertControllerService,
              private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      lastname: ['', Validators.required]
    });

    this.loginForm = this.fb.group({
      email: ['nuria@mail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    this.loadingControllerService.presentLoadingWithOptions('Cargando...');

    const user = await this.authService.login(this.loginForm.value);
    this.loadingControllerService.dismissLoading();
 
    if (user) {
      // this.router.navigateByUrl('dashboard/home', { replaceUrl: true });
      this.router.navigateByUrl('register', { replaceUrl: true });
    } else {
      this.alertControllerService.presentAlert('Login failed', null, 'Please try again!');
    }

    // this.authService.signIn(this.loginForm.value).subscribe(user => {
    //   loading.dismiss();
    //   this.router.navigateByUrl('/tabs');
    // },
    // async err => {
    //   loading.dismiss();

    //   let alert = await this.alertCtrl.create({
    //     header: 'Error',
    //     message: err.message,
    //     buttons: ['OK']
    //   });
    //   alert.present();
    // })
  }

  async register() {
    this.loadingControllerService.presentLoadingWithOptions('Cargando...');

    const user = await this.authService.register(this.registerForm.value);
    this.loadingControllerService.dismissLoading();

    if (user) {
      this.userService.updateNameAndLastName(this.registerForm.value.name, this.registerForm.value.lastname);
      this.router.navigateByUrl('register', { replaceUrl: true });
    } else {
      this.alertControllerService.presentAlert('El registro ha fallado', null, 'Por favor ¡intentelo de nuevo!');
    }
    // this.authService.signUp(this.registerForm.value).then(async res => {
    //   await loading.dismiss();

    //   let toast = await this.toastCtrl.create({
    //     duration: 3000,
    //     message: 'Successfully created new Account!'
    //   });
    //   toast.present();

    //   this.router.navigateByUrl('/tabs');
    // }, async err => {
    //   await loading.dismiss();

    //   let alert = await this.alertCtrl.create({
    //     header: 'Error',
    //     message: err.message,
    //     buttons: ['OK']
    //   });
    //   alert.present();
    // });
  }

  async sendPasswordReset() {
    const inputs = [
      {
        name: 'email',
        type: 'text',
        placeholder: 'contacto@mypoppins.com',
        cssClass: 'ion-input'
      }
    ];

    const buttons = [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'button-danger'
      }, {
        text: 'Enviar',
        handler: (data) => {
          // this.authService.sendPasswordReset(data.email).then(async () => {
          //   let alert = await this.alertCtrl.create({
          //     header: 'Success',
          //     message: 'Check your emails to complete your password reset!',
          //     buttons: [ 'OK' ]
          //   });
          //   alert.present();
          // });
        }
      }
    ]
      this.alertControllerService.presentAlertWithInputsAndButtons('Recuperar Contraseña', null, 'Por favor introduzca su email para recuperar su contraseña.', inputs, buttons )
    }

    toggleRegister() {
      this.flipcontainer.nativeElement.classList.toggle('flip');
    }

    // Easy access for form fields
    get loginEmail() {
      return this.loginForm.get('email');
    }
    
    get loginPassword() {
      return this.loginForm.get('password');
    }

    get registerEmail() {
      return this.registerForm.get('email');
    }
    
    get registerPassword() {
      return this.registerForm.get('password');
    }

    get registerName() {
      return this.registerForm.get('name');
    }
}
