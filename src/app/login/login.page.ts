import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import {auth} from 'firebase/app'
import * as firebase from 'firebase/app';
import { AlertController } from '@ionic/angular'
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username : string = ""
  password : string = ""
 

  

  constructor( public afAuth : AngularFireAuth,public AlertCon: AlertController,public user: UserService,public router: Router) { }

  ngOnInit() {
  }

  async login() {
		const { username, password } = this
		try {
	
			const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@gmail.com', password)
			
			if(res.user) {
				this.user.setUser({
					username,
					uid: res.user.uid
				})
				this.router.navigate(['/tabs'])
			}
		
		} catch(err) {
			console.dir(err)
			if(err.code === "auth/user-not-found") {
				console.log("User not found")
			}
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
    this.router.navigate(['/tabs'])
  }

  logingoogle(){
   const asd = this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(res=> {
      console.log(res);
    })

      this.router.navigate(['/tabs'])
  }
}
