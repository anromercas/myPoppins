import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {

  @Output() nextStep: EventEmitter<null> = new EventEmitter();
  @Output() backStep: EventEmitter<null> = new EventEmitter();
  addressForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.addressForm = this.fb.group({
      city: ['', [Validators.required, Validators.minLength(3)]],
      street: ['', [Validators.required, Validators.minLength(3)]],
      streetNumber: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  onClickNext() {
    this.userService.updateAddress(this.addressForm.value);
    this.nextStep.emit();
  }

  onClickPrev() {
    this.backStep.emit();
  }

}
