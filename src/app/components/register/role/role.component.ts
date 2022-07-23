import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {

  @Output() nextStep: EventEmitter<null> = new EventEmitter();

  constructor(private userService: UserService) { }

  ngOnInit() {}

  onClickParents() {
    this.userService.updateRole('parents');
    this.nextStep.emit();
  }

  onClickBabySyster() {
    this.userService.updateRole('babysyster');
    this.nextStep.emit();
  }

}
