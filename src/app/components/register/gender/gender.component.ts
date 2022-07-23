import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../services/auth.service';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.scss'],
})
export class GenderComponent implements OnInit {

  @Output() nextStep: EventEmitter<null> = new EventEmitter();
  @Output() backStep: EventEmitter<null> = new EventEmitter();
  checkFather: boolean = false;
  checkMother: boolean = false;
  button1Text: string = 'Padre';
  button2Text: string = 'Madre';

  constructor(private userService: UserService) {
    this.userService.getUserProfile().subscribe((profile: User) => {
      const role = profile.role;
      if (role === 'babysyster') {
        this.button1Text = 'Hombre';
        this.button2Text = 'Mujer';
      } 
    });
   }

  ngOnInit() {
  }

  onClickFather() {
    this.checkFather = this.checkFather ? false : true;
    this.checkMother = false;
  }

  onClickBabyMother() {
    this.checkMother = this.checkMother ? false : true;
    this.checkFather = false; 
  }

  onClickNext() {
    this.checkFather ? this.userService.updateGender(this.button1Text) : this.userService.updateGender(this.button2Text);
    this.nextStep.emit();
  }

  onClickPrev() {
    this.backStep.emit();
  }

}
