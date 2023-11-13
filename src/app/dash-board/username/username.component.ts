import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { UserManager } from 'src/app/shared/services/restcontroller/bizservice/user.service';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent implements OnInit {
  submitted = false;
  userNameForm: FormGroup | any;
  user001mb: User001mb = new User001mb();
  username: string = "";
  newusername: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  constructor(private authManager: AuthManager, private formBuilder: FormBuilder, private calloutService: CalloutService, private userManager: UserManager) { }

  ngOnInit(): void {
    this.user001mb = this.authManager.getcurrentUser;
    this.userNameForm = this.formBuilder.group({
      username: [''],
      newusername: ['', [Validators.required, Validators.minLength(4)]]
    });
    this.f.username.value = this.user001mb.username ? this.user001mb.username : "";
  }

  get f() { return this.userNameForm.controls; }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onUserFormClick() {
    this.markFormGroupTouched(this.userNameForm);
    this.submitted = true;
    if (!this.userNameForm.invalid) {

      let userName: any = {};
      userName.personId = this.user001mb.personId;
      userName.username = this.f.newusername.value;
      // let userName :any = this.user001mb.username;
      this.userManager.updateUserName(userName).subscribe((response: any) => {
        this.calloutService.showSuccess("New User Name Updated Successfully");
        this.userNameForm.controls.newusername.reset();
      });
    } else {
      this.calloutService.showError("New User Name Should Not Be Empty");
    }
  }

  onReset() {
    this.submitted = false;
    this.userNameForm.controls.newusername.reset();
  }

}
