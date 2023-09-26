import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, map, takeWhile, tap, timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  statusLabel : string = 'PAUSE';
  timerType : string = 'pomodoro'
  minutesConfigPomodoro : number = 25;
  minutesConfigShort : number = 5;
  minutesConfigLong : number = 15;
  secondsRemaing! : number;
  status : string = 'notStarted';


  timerId! : any;


  ngOnInit(): void {
    this.secondsRemaing = this.minutesConfigPomodoro * 60;
  }

  changeTypeTimer(type : string){
    this.timerType = type;
    clearInterval(this.timerId)
    this.status = 'notStarted';
    if (this.timerType=='pomodoro'){
      this.secondsRemaing = this.minutesConfigPomodoro * 60;
    } else{
      if (this.timerType=='short'){
        this.secondsRemaing = this.minutesConfigShort * 60;
      }
      else{
        this.secondsRemaing = this.minutesConfigLong * 60;
      }
    }


  }

  startPauseTimer(){

    if (this.status == 'notStarted'){
      this.status = 'started';
      this.timerId = setInterval(() => {
        this.secondsRemaing = this.secondsRemaing - 1;
      }, 1000);

    }else{
      if(this.status == 'started'){
        this.status = 'paused';
        clearInterval(this.timerId);
      }
      else{
        this.status = 'started';
        this.timerId = setInterval(() => {
          this.secondsRemaing = this.secondsRemaing - 1;
        }, 1000);
      }
    }


  }


}
