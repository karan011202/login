  import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ForgotPage {

  constructor(private http: HttpClient,
              private router: Router
  ) { }

  // ngOnInit() {
  // }

 data ={ email: '',
otp: '',
newPassword: '',
confirmPassword: ''
 };



sendOtp() {

  this.http.post('http://localhost:3000/sendotp', {
    email: this.data.email
  }).subscribe({
    next: () => alert("OTP sent to email"),
    error: () => alert("Failed to send OTP")
  });

}



resetPassword() {

  if (this.data.newPassword !== this.data.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  this.http.patch('http://localhost:3000/resetpassword', {
    email: this.data.email,
    otp: this.data.otp,
    newPassword: this.data.newPassword
  }).subscribe({
    next: () => alert("Password updated successfully"),
    error: () => alert("Invalid OTP or error")
  });

}



}
