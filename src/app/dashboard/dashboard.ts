import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { StudentService } from '../services/student';
import { AuthService } from '../services/auth';
import { Student } from '../models/student';

@Component({
  selector: 'app-dashboard',

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  students: Student[] = [];

  searchText: string = '';

  isEditMode: boolean = false;

  selectedId: number = 0;

  student: Student = {

    id: 0,

    name: '',

    email: '',

    age: 0,

    course: ''

  };


  constructor(

    private studentService: StudentService,

    private authService: AuthService,

    private router: Router

  ) {
  }


  ngOnInit(): void {

    this.getStudents();

  }


  getStudents(): void {

    this.studentService.getStudents().subscribe({

      next: (data) => {

        this.students = data;

      },

      error: (error) => {

        console.log(error);

        alert('Unable to load students');

      }

    });

  }


  addStudent(): void {

    if (
      !this.student.name ||
      !this.student.email ||
      !this.student.course ||
      this.student.age <= 0
    ) {

      alert('Please enter all student details');

      return;

    }


    this.studentService
      .addStudent(this.student)
      .subscribe({

        next: () => {

          alert('Student added successfully');

          this.clearForm();

          this.getStudents();

        },

        error: (error) => {

          console.log(error);

          alert('Unable to add student');

        }

      });

  }


  editStudent(student: Student): void {

    this.isEditMode = true;

    this.selectedId = student.id;

    this.student = {
      ...student
    };

  }


  updateStudent(): void {

    this.studentService
      .updateStudent(
        this.selectedId,
        this.student
      )
      .subscribe({

        next: () => {

          alert('Student updated successfully');

          this.clearForm();

          this.getStudents();

        },

        error: (error) => {

          console.log(error);

          alert('Unable to update student');

        }

      });

  }


  deleteStudent(id: number): void {

    if (
      !confirm(
        'Are you sure you want to delete this student?'
      )
    ) {

      return;

    }


    this.studentService
      .deleteStudent(id)
      .subscribe({

        next: () => {

          alert('Student deleted successfully');

          this.getStudents();

        },

        error: (error) => {

          console.log(error);

          alert('Unable to delete student');

        }

      });

  }


  clearForm(): void {

    this.student = {

      id: 0,

      name: '',

      email: '',

      age: 0,

      course: ''

    };

    this.isEditMode = false;

    this.selectedId = 0;

  }


  get filteredStudents(): Student[] {

    if (!this.searchText) {

      return this.students;

    }


    const search =
      this.searchText.toLowerCase();


    return this.students.filter(student =>

      student.name
        .toLowerCase()
        .includes(search)

      ||

      student.email
        .toLowerCase()
        .includes(search)

      ||

      student.course
        .toLowerCase()
        .includes(search)

    );

  }


  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);

  }

}