import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',

  imports: [
    FormsModule,
    RouterLink
  ],

  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email: string = '';

  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  login(): void {

    if (!this.email || !this.password) {

      alert('Please enter email and password');

      return;
    }

    const user = {
      email: this.email,
      password: this.password
    };

    this.authService.login(user).subscribe({

      next: (response) => {

        console.log(response);

        localStorage.setItem(
          'user',
          JSON.stringify(response)
        );

        alert('Login successful');

        this.router.navigate(['/dashboard']);

      },

      error: (error) => {

        console.log(error);

        if (error.error) {

          alert(error.error);

        }
        else {

          alert('Invalid email or password');

        }

      }

    });

  }

}