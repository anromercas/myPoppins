import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingControllerService } from '../../../services/loading-controller.service';
import { AvatarService } from '../../../services/avatar.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertControllerService } from 'src/app/services/alert-controller.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  profile = null;

  constructor(private authService: AuthService,
              private loadingControllerService: LoadingControllerService,
              private router: Router,
              private avatarService: AvatarService,
              private alertControllerService: AlertControllerService, ) { 
                this.avatarService.getUserProfile().subscribe(profile => {
                  this.profile = profile;
                });
              }

  ngOnInit() {
  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos, // Camera, Photos or Prompt!
    });
 
    if (image) {
      await this.loadingControllerService.presentLoadingWithOptions('Cargando...');
 
      const result = await this.avatarService.uploadImage(image);
      this.loadingControllerService.dismissLoading();
 
      if (!result) {
        this.alertControllerService.presentAlert('La subida ha fallado', null, 'Ha habido un problema al subir la imagen. Por favor, inténtelo de nuevo.');
      }
    }
  
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  deleteProfile() { }

}
