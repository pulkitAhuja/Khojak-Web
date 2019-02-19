import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Journey } from '../Journey';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  gaugeType = "arch";
  gaugeValue=2;
  gaugeLabel = "E-Meter";
  size="150";
  thick="20";
  round="round";
  append="Emission";
  username=localStorage.getItem('username');
  points:number;
  boolvehicle=false;

  vehicleList:any;

  allJourney:Journey[];
  totalJour:number;


  constructor(public ll:LoginService) { }

  ngOnInit() {
    this.vehicleList={
        year: '',
        plate: '',
        model: '',
        types: '',
        user: localStorage.getItem('id')
    }
    this.funct();
    this.allJourney=[];
    
  }
  funct(){
    
    this.ll.getUser().subscribe(
      response=>{
        this.allJourney=response;
        this.totalJour=this.allJourney.length;
        this.gaugeValue=0;
        this.allJourney.forEach(element => {
          this.gaugeValue+=Math.round(Number(element.escore));
        });
        this.gaugeValue=this.gaugeValue/this.totalJour;
        this.points=this.gaugeValue*40;
        console.log(response);
        
      },
      error=>{
        console.log("fail");
      }
    );
    console.log("Login Done");
    this.ll.vehicleList().subscribe(
      response=>{
        this.vehicleList=response;
        console.log(this.vehicleList);
      }
    )
  }
  logout(){
    localStorage.clear();
    console.log(localStorage.getItem('access'));
  }

}
