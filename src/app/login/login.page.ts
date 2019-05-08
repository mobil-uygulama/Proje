import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import {auth} from 'firebase/app'
import * as firebase from 'firebase/app';
import { AlertController } from '@ionic/angular'
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username : string = ""
  password : string = ""
 

  

  constructor( public afAuth : AngularFireAuth,public AlertCon: AlertController) { }

  ngOnInit() {
  }

  async login(){
    const {username , password} = this
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@gmail.com',password)
    } catch (error) {
      console.dir(error)
    }
  }

  async forgotpassword(){
    const alert = await this.AlertCon.create({
      header: 'Password Reset',
      message: 'Your new password will sent to your email',
      inputs:[
        {
          name:"email",
          type:"text"
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
            console.log('Cancel Clicked');
          }
        }, {
          text: 'Okay',
          handler: data => {
            console.log('Confirm Okay');
            var auth =firebase.auth();
            auth.sendPasswordResetEmail(data.email);
          }
        }
      ]
  });
  await alert.present();
}

  loginfacebook(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(res=> {
      console.log(res);
    })
  }

  logingoogle(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(res=> {
      console.log(res);
    })
  }
}
