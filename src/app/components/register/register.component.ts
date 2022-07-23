import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  step = 4;
  @Output() stepEmit: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  nextStep() {
    this.step += 1;
    this.stepEmit.emit(this.step);
  }

  backStep() {
      this.step -= 1;
      this.stepEmit.emit(this.step);
  }


}
