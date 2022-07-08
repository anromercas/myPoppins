import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  loginForm: FormGroup;

  @ViewChild('flipcontainer', { static: false }) flipcontainer: ElementRef;

  constructor(private fb: FormBuilder, private authService: AuthService, private loadingCtrl: LoadingController,
    private toastCtrl: ToastController, private alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required]
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * We create a loading spinner, present it, then call the signIn function from the authService, and
   * if the user is successfully logged in, we dismiss the loading spinner and navigate to the tabs
   * page. If there's an error, we dismiss the loading spinner and present an alert with the error
   * message
   */
  async login() {
    let loading = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    await loading.present();

    this.authService.signIn(this.loginForm.value).subscribe(user => {
      loading.dismiss();
      this.router.navigateByUrl('/tabs');
    },
    async err => {
      loading.dismiss();

      let alert = await this.alertCtrl.create({
        header: 'Error',
        message: err.message,
        buttons: ['OK']
      });
      alert.present();
    })
  }

  async register() {
    let loading = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    await loading.present();

    this.authService.signUp(this.registerForm.value).then(async res => {
      await loading.dismiss();

      let toast = await this.toastCtrl.create({
        duration: 3000,
        message: 'Successfully created new Account!'
      });
      toast.present();

      this.router.navigateByUrl('/tabs');
    }, async err => {
      await loading.dismiss();

      let alert = await this.alertCtrl.create({
        header: 'Error',
        message: err.message,
        buttons: ['OK']
      });
      alert.present();
    });
  }

  async sendPasswordReset() {
    const alert = await this.alertCtrl.create({
      header: 'Reset Password',
      message: 'Please enter your email to reset your password',
      inputs: [
        {
          name: 'email',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Reset',
          handler: (data) => {
            this.authService.sendPasswordReset(data.email).then(async () => {
              let alert = await this.alertCtrl.create({
                header: 'Success',
                message: 'Check your emails to complete your password reset!',
                buttons: [ 'OK' ]
              });
              alert.present();
            });
          }
        }
      ]
    });
    await alert.present();
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
