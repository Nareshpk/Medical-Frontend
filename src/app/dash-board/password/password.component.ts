import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { UserManager } from 'src/app/shared/services/restcontroller/bizservice/user.service';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
	pwdForm: FormGroup | any;
	submitted = false;
	user001mb: User001mb = new User001mb();
	username: string = "";
	password: string = "";
	insertUser: string = "";
	insertDatetime: Date | any;

	constructor( private userManager: UserManager, private authManager: AuthManager, private calloutService: CalloutService, private formBuilder: FormBuilder) { }

	ngOnInit() {
		this.user001mb = this.authManager.getcurrentUser;
		this.pwdForm = this.formBuilder.group({
			username: [''],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
		this.f.username.value = this.user001mb.username;
	}

	get f() { return this.pwdForm.controls; }

	private markFormGroupTouched(formGroup: FormGroup) {
		(<any>Object).values(formGroup.controls).forEach((control: any) => {
			control.markAsTouched();
			if (control.controls) {
				this.markFormGroupTouched(control);
			}
		});
	}

	onPwdFormClick(pwdForm: any) {
		this.markFormGroupTouched(this.pwdForm);
		this.submitted = true;
		if (!this.pwdForm.invalid) {
			this.user001mb.password = this.f.password.value;
			this.user001mb.insertUser = "insertUser";
			this.user001mb.insertDatetime = new Date();
			this.userManager.updatePassword(this.user001mb).subscribe((response: any) => {
				if (response) {
					this.calloutService.showSuccess("New Password Updated Successfully");
					this.pwdForm.controls.password.reset();
				}
			});
		} else {
			this.calloutService.showError("Password Should Not Be Empty (or) Min Length Should Be 6");
		}
	}

	onReset() {
		this.submitted = false;
		this.pwdForm.controls.password.reset();
	}
}

