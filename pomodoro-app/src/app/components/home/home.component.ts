import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ThemesService } from 'src/app/services/themes.service';



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
  modalConfig : boolean = false;
  minValue : number = 1;
  maxValue : number = 120;
  fontSelected : string = 'kumbh';
  colorThemeSelected : string = 'orange';


  @ViewChild("circleProgress") circleProgress!: ElementRef;
  @ViewChild("container") container!: ElementRef;


  timerId! : any;


  constructor(private theme: ThemesService){}

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

  increaseNumber(type : string){
    if (type=='pomodoro'){
      if (((this.minutesConfigPomodoro+1) >= this.minValue) && ((this.minutesConfigPomodoro+1) <= this.maxValue)) {
        this.minutesConfigPomodoro = this.minutesConfigPomodoro + 1;
      }
    } else{
      if (type=='short'){
        if (((this.minutesConfigShort+1) >= this.minValue) && ((this.minutesConfigShort+1) <= this.maxValue)) {
          this.minutesConfigShort = this.minutesConfigShort + 1;
        }
      }
      else{
        if (((this.minutesConfigLong+1) >= this.minValue) && ((this.minutesConfigLong+1) <= this.maxValue)) {
          this.minutesConfigLong = this.minutesConfigLong + 1;
        }
      }
    }
  }
  decreaseNumber(type : string){
    if (type=='pomodoro'){
      if (((this.minutesConfigPomodoro-1) >= this.minValue) && ((this.minutesConfigPomodoro-1) <= this.maxValue)) {
        this.minutesConfigPomodoro = this.minutesConfigPomodoro - 1;
      }
    } else{
      if (type=='short'){
        if (((this.minutesConfigShort-1) >= this.minValue) && ((this.minutesConfigShort-1) <= this.maxValue)) {
          this.minutesConfigShort = this.minutesConfigShort - 1;
        }
      }
      else{
        if (((this.minutesConfigLong-1) >= this.minValue) && ((this.minutesConfigLong-1) <= this.maxValue)) {
          this.minutesConfigLong = this.minutesConfigLong - 1;
        }
      }
    }
  }

  changeFont(font : string){
    this.fontSelected = font;
    let fontTheme : string = this.colorThemeSelected + '-' + this.fontSelected;
    this.theme.loadTheme(fontTheme);
  }

  changeColor(color : string){
    this.colorThemeSelected = color;
    let fontTheme : string = this.colorThemeSelected + '-' + this.fontSelected;
    this.theme.loadTheme(fontTheme);
  }

  close(){
    this.modalConfig = false;
    this.container.nativeElement.style.filter =  "blur(0px)";
  }


}
