import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {  OnInit } from '@angular/core';
import { IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { exitOutline } from 'ionicons/icons';
import { TableModule } from 'ngx-easy-table';
import { Columns, Config } from 'ngx-easy-table';




import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {  Token } from '@angular/compiler';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TableModule]
  
  
})
export class DashboardPage implements OnInit {
 allUsers:any[] = [];
 searchedTerm:string = '';
 users:any[] =[];
 columns: Columns[] = [
  { key: 'ud_code', title: 'ID' },
  { key: 'ud_firstname', title: 'First Name' },
  { key: 'ud_lastname', title: 'Last Name' },
  { key: 'ud_email', title: 'Email' }
];
// configuration: Config = {
//   searchEnabled: true,
//   paginationEnabled: true,
//   rows: 5,
//   resizeColumn: true,
  
// };

 

  constructor(private http: HttpClient,
            private router: Router ){addIcons({ exitOutline });}

  ngOnInit(): void {
    console.log("Dashboard Loaded");
    this.getUsers();
  }
 
getUsers(){
  console.log("Calling GET API...");
 const Token = localStorage.getItem('token');
 if (!Token) {
    console.error("No token found!");
    return;
  }

 console.log('hello' , Token);
 
  this.http.get<any[]>('http://localhost:3000/users',{
    headers: {
      Authorization:`Bearer ${Token}`
    }
  }

  )
  .subscribe({
    next: (res) =>{
      console.log("response", res)
      this.allUsers =res;
      this.users=res;
    },
  })

}
home(){

  localStorage.removeItem('token');

  this.router.navigate(['/signin'])
}

filterUsers(){

  console.log("Search term:", this.searchedTerm);

    if (!this.searchedTerm) {
    this.users = this.allUsers;
    return;
    }



  const search = this.searchedTerm.toLowerCase();
  this.users = this.allUsers.filter(user =>
    user.ud_firstname.toLowerCase().includes(search) ||
    user.ud_lastname.toLowerCase().includes(search) ||
    user.ud_email.toLowerCase().includes(search)
  );
    console.log("Filtered users:", this.users);

}






}
