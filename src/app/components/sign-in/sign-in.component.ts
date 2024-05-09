import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  signInForm: FormGroup;
  users: any[] = JSON.parse(localStorage.getItem('users') || '[]');

  constructor(private fb: FormBuilder,private router: Router) {
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const username = this.signInForm.value.username;
      const password = this.signInForm.value.password;

      // Check if user with the username exists
      const user = this.users.find(u => u.username === username);

      if (user && user.password === password) {
        // User found and password matches, sign them in
        // You can navigate the user to main-view/tasks or perform any other actions here
        console.log('Sign in successful');
        this.router.navigate(['/main-view/tasks'])
      } else {
        // User not found or password does not match
        console.log('Invalid username or password');
      }
    }
  }
}
