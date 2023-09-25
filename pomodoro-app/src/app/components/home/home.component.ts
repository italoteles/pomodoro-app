import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  statusLabel : string = 'PAUSE';
  timeLeft : string = '17:59'
  timerType : string = 'pomodoro'


  changeTypeTimer(type : string){
    this.timerType = type;
  }
}
