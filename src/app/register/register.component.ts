import { Component, OnInit } from '@angular/core';
import { JwtService } from '../services/jwt.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  selectedFile: File | undefined;

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      mail: ['', [Validators.required]],
      telNumber: ['', [Validators.required]],
      birthDay: ['', [Validators.required]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required]],
      niveau: ['', [Validators.required]],
      imageFile: [null, [Validators.required]], // Initialize imageFile field with null
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.registerForm.patchValue({
        imageFile: this.selectedFile, // Update imageFile field in form
      });
    }
  }

  submitForm() {
    if (this.registerForm.valid) {
      const formData = new FormData();
      formData.append('firstName', this.registerForm.get('firstName')?.value);
      formData.append('lastName', this.registerForm.get('lastName')?.value);
      formData.append('mail', this.registerForm.get('mail')?.value);
      formData.append('telNumber', this.registerForm.get('telNumber')?.value);
      formData.append('address', this.registerForm.get('address')?.value);
      formData.append('password', this.registerForm.get('password')?.value);
      formData.append('niveau', this.registerForm.get('niveau')?.value);

      // Formatage de la date de naissance
      const birthDayValue = this.registerForm.get('birthDay')?.value;
      if (birthDayValue instanceof Date) {
        const formattedBirthDay = new Date(birthDayValue).toISOString();
        formData.append('birthDay', formattedBirthDay);
      } else {
        console.error('birthDay is not an instance of Date');
      }

      // Ajout du fichier image s'il est sélectionné
      if (this.selectedFile) {
        formData.append('imageFile', this.selectedFile);
      }

      this.service.register(formData).subscribe(
        (response) => {
          //alert("User Added Successfully");
          console.log(response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error registering user:', error);
          // Gérer l'erreur, par exemple afficher un message d'erreur à l'utilisateur
        }
      );
    } else {
      alert('Please fill out all required fields and select an image.');
    }
  }
}
