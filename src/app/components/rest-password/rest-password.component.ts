import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rest-password',
  templateUrl: './rest-password.component.html',
  styleUrls: ['./rest-password.component.css'],
})
export class RestPasswordComponent {
  resetPasswordForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      token: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
    });
  }

  sendResetPassword() {
    const token = this.resetPasswordForm.value.token; // Assuming the form control name for email is 'email'
    const newPassword = this.resetPasswordForm.value.newPassword;
    console.log(token);
    console.log(newPassword);

    this.userService.resetPassword(token, newPassword).subscribe(
      (response) => {
        console.log(response);
        this.router.navigateByUrl('/login');
      },
      (error) => {
        // Handle error
        console.error('Error:', error);
        // Alert the user about the error
        alert('Please verify your token.');
      }
    );
  }
}
