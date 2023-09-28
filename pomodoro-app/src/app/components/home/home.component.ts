import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,AfterViewInit {



  statusLabel : string = 'PAUSE';
  timerType : string = 'pomodoro'
  minutesConfigPomodoro : number = 2;
  minutesConfigShort : number = 5;
  minutesConfigLong : number = 15;
  secondsRemaing! : number;
  status : string = 'notStarted';
  dashArrayNumber : number = 0;
  dashOffSetNumber : number = 0;
  modalConfig : boolean = true;

  @ViewChild("circleProgress") circleProgress!: ElementRef;
  @ViewChild("container") container!: ElementRef;


  timerId! : any;


  ngOnInit(): void {
    this.secondsRemaing = this.minutesConfigPomodoro * 60;

  }

  ngAfterViewInit(): void {

    this.dashArrayNumber = this.circleProgress.nativeElement.r.baseVal.value * 3.14 * 2

  }

  changeTypeTimer(type : string){
    this.timerType = type;
    clearInterval(this.timerId)
    this.status = 'notStarted';
    this.dashOffSetNumber = 0;
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
        this.calculateProgress();
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
          this.calculateProgress();
        }, 1000);
      }
    }


  }

  calculateProgress(){
    let total : number = 0;
    if (this.timerType=='pomodoro'){
      total = this.minutesConfigPomodoro * 60;
    } else{
      if (this.timerType=='short'){
        total = this.minutesConfigShort * 60;
      }
      else{
        total = this.minutesConfigLong * 60;
      }
    }

    let percentProgress = this.secondsRemaing / total;

    this.dashOffSetNumber = this.dashArrayNumber *percentProgress;
  }

  openConfig(){
    this.modalConfig = true;
    this.container.nativeElement.style.filter =  "blur(10px)";
  }


}
