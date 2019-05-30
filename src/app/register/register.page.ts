import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'

import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string =""
  password: string =""
  conpassword: string =""


  constructor(
		public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
		public user: UserService,
		public AlertCon: AlertController,
		public router: Router
		) { }

  ngOnInit() {
  }

  async alertshow(header:string,message:string) {
    const alert=await this.AlertCon.create({
        header,message,buttons: ["OK"]

    })
        await alert.present()
  }

  async register(){
    const {username,password,conpassword} =this
    if(password == conpassword){

      try {
        const res=await this.afAuth.auth.createUserWithEmailAndPassword(username + '@gmail.com',password)
        this.afstore.doc(`users/${res.user.uid}`).set({
          username
        })
  
        this.user.setUser({
          username,
          uid: res.user.uid
        })
  
        this.alertshow("Success","Succesful")
        this.router.navigate(['/tabs'])
        
      } catch (error) {
        this.alertshow("Error",error.message)
      }
        
    }
    else
    this.alertshow("Error","passwords don't match")

   


  }

}
