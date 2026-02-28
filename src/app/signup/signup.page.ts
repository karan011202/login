import { Component } from '@angular/core';
import { IonicModule, IonToast } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-signin',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class SignupPage {
 showpassword = true;
//  signinData = {
//   email: '',
//   password: ''
// };

signupData = {
  firstname: 'karam',
  lastname: '',
  email: 'karan123@gmail.com',
  password: 'Ka@12345',
  confirmpassword: 'Ka@12345'
};
// authMode:any = 'signin'; 

 private baseUrl = 'http://localhost:3000';
 private checkEmailUrl = 'http://localhost:3000/check-email';

  constructor(private http: HttpClient,
              private router: Router,
            private toast: ToastController) { addIcons({ closeOutline });}
              
  submit() {

    // if (this.authMode === 'signin') {

    //   const data = {
    //     ud_email: this.signinData.email,
    //     ud_password: this.signinData.password
    //   };

    //   this.http.post(`${this.baseUrl}/signin`, data)
    //     .subscribe({
    //       next: (res: any) => {
    //         console.log("Login Success", res);
    //         localStorage.setItem('token', res.token);
    //         this.router.navigate(['/dashboard']);
    //       },
    //       error: (err) => {
    //         console.log("Login Error", err);
    //       }
    //     });

    // } else {
      if(!this.signupData.email){
        alert("enter email");
        return;
      }

      if (!this.signupData.password ||
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
      .test(this.signupData.password)) {

  alert("password invalid format");
  return;
}
if (!this.signupData.confirmpassword)
    {

  alert("enter confirmpassword");
  return;
}
if (this.signupData.confirmpassword !== this.signupData.password)
    {

  alert("password didn't match");
  return;
}
      if(!this.signupData.firstname){
        alert("enter firstname");
        return;
      }
      

      


      const data = {
        ud_firstname: this.signupData.firstname,
        ud_email: this.signupData.email,
        ud_password: this.signupData.password,
        ud_lastname: this.signupData.lastname
      };

      this.http.post(`${this.baseUrl}/signup`, data)
        .subscribe({
          next: (res) => {
            console.log("Signup Success", res);
            this.reset();
            alert('signup successful')
            this.router.navigate(['/signin']);
            
          },
          error: (err) => {
            console.log("Signup Error", err);
            this.showToast('SignUp Failed','Danger');
            // this.reset();
          }
        });
    }
   
   
    reset() {

  

  this.signupData = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword:''
  };

}
home(){
  this.router.navigate(["/signin"])
}

async showToast(message:string ,color:string){
  const toast = await this.toast.create({
    message,
    duration:4000,
    position:'top',
    color: 'danger'
  });
  await toast.present();
}
checkemail(){ 
  const ud_email = this.checkemail
  this.http.post(this.checkEmailUrl, ud_email)
  .subscribe({
          next: (res:any) => {
            if(res.exits){
            console.log("email registered", res.exists);
            }
            },
          // error: (err) => {
          //   console.log("Signup Error", err);
          //   this.showToast('SignUp Failed','Danger');
          //   // this.reset();
          // }
        });
  


}



  }

