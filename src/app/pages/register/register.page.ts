import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  step:number = 1;

  constructor() { }

  ngOnInit() {
  }

  handleChangeStep(newStep: number) {
    this.step = newStep;
  }


}
