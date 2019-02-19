import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  vehicle:any;
  nrSelect:string;
  submitted=false;
  submittedText:string;
  username=localStorage.getItem('username');

  constructor(private sl:LoginService) { }

  ngOnInit() {
    this.vehicle={
      year: '',
      plate: '',
      model: '',
      types: '',
      user: localStorage.getItem('id')
    }
  }

  submit(){
    this.vehicle.types=this.nrSelect;
    this.sl.postVehicle(this.vehicle).subscribe(
      response=>{
        console.log(response);
        if(response.id){
          this.submitted=true;
          this.submittedText="Submitted Successfully";
        }
        setTimeout(function(){
          this.submitted=false;
        },2000)
      },
      err=>{
        if(err.error.plate){
          this.submitted=true;
          this.submittedText=err.error.plate;
          console.log(err.error.plate);
        }
      }
    );
  }

}
