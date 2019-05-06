import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import {auth} from 'firebase/app'
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username : string = ""
  password : string = ""


  constructor( public afAuth : AngularFireAuth) { }

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
