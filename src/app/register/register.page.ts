import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import {auth} from 'firebase/app'
import { AlertController } from '@ionic/angular'
import {Router} from '@angular/router' 

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string =""
  password: string =""
  conpassword: string =""


  constructor(public afAuth: AngularFireAuth,public AlertCon: AlertController,public router: Router) { }

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
        this.alertshow("Success","Succesful")
        this.router.navigate(['/login'])
      } catch (error) {
        this.alertshow("Error",error.message)
      }
        
    }
    else
    this.alertshow("Error","passwords don't match")

   


  }

}
