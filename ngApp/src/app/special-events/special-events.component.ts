import { HttpErrorResponse } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent {

  specialEvents = [{name:'',description:'',date:''}];
  constructor(private _specialService: EventService,
    private _router: Router){

  }

  ngOnInit(){
    this._specialService.getSpecialEvents()
    .subscribe(
      (res:any)=> this.specialEvents = res,
      (err:any)=> {
        if(err instanceof HttpErrorResponse){
          if(err.status===401){
            this._router.navigate(['/login']);
          }
        }
      }
    )
  }
}
