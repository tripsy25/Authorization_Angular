import { Component,OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {

 events = [{name:'', description:'', date:''}]
 constructor(private _event:EventService){

 }

 ngOnInit(){
    this._event.getEvents().subscribe(
      (res:any) => {this.events = res},
      (err:any) => {console.log(err)}
 )
 }


}
