import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  reg;
  reg1;
  signup=true;
  display:string;
  warning:string;
  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
  constructor(public router:Router,private ll:LoginService) { }

  ngOnInit() {
    this.reg={
      username: '',
      email:'',
      password: ''
    };
    this.reg1={
      username: '',
      password: ''
    };
  }
   
  
  LoginFunct(){
    
    this.ll.loginUser(this.reg1).subscribe(
      response=>{
        console.log(response);
        var info=this.getDecodedAccessToken(response.access);
        console.log(info.username);
        console.log(info.user_id);
        localStorage.setItem('access', response.access);
        localStorage.setItem('username', info.username);
        localStorage.setItem('id', info.user_id);

        this.ll.loginDone=true;
        this.router.navigateByUrl('/dashboard');
      },
      error=>{
        console.log("fail");
        this.display="wrong credentials"
      }
    );
    console.log("Login Done");
  }

  RegisterFunct(){
    this.ll.regUser(this.reg).subscribe(
      response=>{
        console.log('response');
        if(response.error.username){
          this.warning="username exists";
          console.log('err')
        }
        // else if(response.status>=400){
        //   this.warning="Invalid Credentials";
        // }
      },
      err=>{
        console.log(err);
        if(err.error.username){
          this.warning="username exists";
          console.log('err')
        }
      }
    );
  }

  fakeLogin(){
    this.ll.loginDone=true;
    this.router.navigateByUrl('/dashboard');
  }

}
