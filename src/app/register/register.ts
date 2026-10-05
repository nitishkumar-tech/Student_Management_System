import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../services/auth';

@Component({
  selector: 'app-register',

  imports: [
    FormsModule,
    RouterLink
  ],

  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  name: string = '';

  email: string = '';

  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  register(): void {

    if (!this.name || !this.email || !this.password) {

      alert('Please fill all fields');

      return;
    }

    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.authService.register(user).subscribe({

      next: (response) => {

        console.log(response);

        alert('Registration successful');

        this.router.navigate(['/login']);

      },

      error: (error) => {

        console.log(error);

        if (error.error) {

          alert(error.error);

        }
        else {

          alert('Registration failed');

        }

      }

    });

  }

}