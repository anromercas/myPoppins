import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-children',
  templateUrl: './add-children.component.html',
  styleUrls: ['./add-children.component.scss'],
})
export class AddChildrenComponent implements OnInit {

  @Output() nextStep: EventEmitter<null> = new EventEmitter();
  @Output() backStep: EventEmitter<null> = new EventEmitter();
  @ViewChild('open-modal') openModal!: ModalController;
  dateValue = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z';
  formattedString = '';
  checkBoy = false;
  checkGirl = false;
  expectingChild = false;

  constructor(private modalController: ModalController, private userService: UserService) { }

  ngOnInit() {
    this.setToday();
  }

  setToday() {
    this.formattedString = format(parseISO(format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z'), 'd MMM, yyyy');
  }

  dateChanged(value) {
    this.dateValue = value;
    this.formattedString = format(parseISO(value), 'd MMM, yyyy');
    this.modalController.dismiss();
  }

  onClickBoy() {
    this.checkBoy = this.checkBoy ? false : true;
    this.checkGirl = false;
  }

  onClickGirl() {
    this.checkGirl = this.checkGirl ? false : true;
    this.checkBoy = false; 
  }

  onClickNext() {
    this.checkBoy ? this.userService.updateChildren('boy',this.dateValue, this.expectingChild) : this.userService.updateChildren('girl',this.dateValue, this.expectingChild);
    this.nextStep.emit();
  }

  onClickPrev() {
    this.backStep.emit();
  }

}
