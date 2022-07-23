import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { RoleComponent } from './register/role/role.component';
import { AddChildrenComponent } from './register/add-children/add-children.component';
import { AddImageProfileComponent } from './register/add-image-profile/add-image-profile.component';
import { AdditionalTasksComponent } from './register/additional-tasks/additional-tasks.component';
import { AddressComponent } from './register/address/address.component';
import { AfterSchoolComponent } from './register/after-school/after-school.component';
import { CareDaysComponent } from './register/care-days/care-days.component';
import { GenderComponent } from './register/gender/gender.component';
import { NanySalaryComponent } from './register/nany-salary/nany-salary.component';
import { UserDescriptionComponent } from './register/user-description/user-description.component';


@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    RoleComponent,
    AddChildrenComponent,
    AddImageProfileComponent,
    AdditionalTasksComponent,
    AddressComponent,
    AfterSchoolComponent,
    CareDaysComponent,
    GenderComponent,
    NanySalaryComponent,
    UserDescriptionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    RoleComponent,
    AddChildrenComponent,
    AddImageProfileComponent,
    AdditionalTasksComponent,
    AddressComponent,
    AfterSchoolComponent,
    CareDaysComponent,
    GenderComponent,
    NanySalaryComponent,
    UserDescriptionComponent
  ]
})
export class ComponentsModule { }
