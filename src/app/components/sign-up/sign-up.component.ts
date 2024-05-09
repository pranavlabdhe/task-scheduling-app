import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder,private router: Router) {
    this.signUpForm = this.fb.group({
      id: [this.generateId()],
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      // Store user details in localStorage
      const user = {
        id: this.signUpForm.value.id,
        username: this.signUpForm.value.username,
        password: this.signUpForm.value.password
      };
      localStorage.setItem('users', JSON.stringify(user));

      // Navigate user to main-view/tasks (You need to implement the navigation logic here)
      this.router.navigate(['/main-view/tasks'])
    }
  }
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9); // Generate a random string of 9 characters
  }
}

