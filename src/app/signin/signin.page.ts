import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class SigninPage {
 showPassword = true;
 signinData = {
  email: '',
  password: ''
};

signupData = {
  firstname: '',
  lastname: '',
  email: '',
  password: ''
};

// const={
//   email: 'karan2002@gmail.com',
//   password:'1234'
// };
// authMode:any = 'signin'; 

 private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient,
              private router: Router) {}

  submit() {

    // if (this.authMode === 'signin') {
       if(!this.signinData.email || !this.signinData.password){
        
        alert("please enter email or password");
        return;
       }
      const data = {
        ud_email: this.signinData.email,
        ud_password: this.signinData.password
      };

      this.http.post(`${this.baseUrl}/signin`, data)
        .subscribe({
          next: (res: any) => {
            console.log("Full Response:", res);
           if(res?.success==true){
            console.log("Login Success", res);
            this.resetForms();
            localStorage.setItem('token', res.data.accesstoken);
            // localStorage.setItem('rtoken', res.data.refreshtoken);
            console.log(localStorage.getItem('token'));
            // console.log(localStorage.getItem('rtoken'));

            this.router.navigate(['/dashboard']);
          }
           else{
           
              alert("invalid email or password");
              this.resetForms();
            }
          },
          error: (err) => {
            console.log("Login Error", err);
          }
        });

    // } else {

    //   const data = {
    //     ud_firstname: this.signupData.firstname,
    //     ud_email: this.signupData.email,
    //     ud_password: this.signupData.password,
    //     ud_lastname: this.signupData.lastname
    //   };

    //   this.http.post(`${this.baseUrl}/signup`, data)
    //     .subscribe({
    //       next: (res) => {
    //         console.log("Signup Success", res);
    //       },
    //       error: (err) => {
    //         console.log("Signup Error", err);
    //       }
    //     });
    // }
   



  }
  signup1() {
    this.router.navigate(['/signup']);
   }

   goToForgot(){
    this.router.navigate(['/forgot'])
   }

   resetForms() {

  this.signinData = {
    email: '',
    password: ''
  };

  this.signupData = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  };

}

}


