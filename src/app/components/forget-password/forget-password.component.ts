import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  forgetPasswordForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.forgetPasswordForm = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],
    });
  }

  sendForgetPassword() {
    const mail = this.forgetPasswordForm.value.mail; // Assuming the form control name for email is 'email'

    this.userService.forgetPassword(mail).subscribe(
      (response) => {
        this.router.navigateByUrl('/resetpassword');
      },
      (error) => {
        // Handle error
        console.error('Error:', error);
        // Alert the user about the error
        alert('Invalid mail.');
      }
    );
  }
}
