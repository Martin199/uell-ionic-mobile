import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { interval } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-isps-circle',
  templateUrl: './isps-circle.component.html',
  styleUrls: ['./isps-circle.component.scss']
})
export class IspsCircleComponent implements OnChanges, OnInit {

  @ViewChild('progress', {read: ElementRef, static: true}) progressCircle!: ElementRef<HTMLDivElement>;

  @Input() score: number = 0;
  private progress = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['score'].currentValue) {
      this.animate();
    } 
  }

  ngOnInit(): void {
    this.scoreLower()
  }

  scoreLower(){
    const progressCircle = this.progressCircle.nativeElement;
    if (!this.score) {
      progressCircle.style.background = `#F2F6FA` ;
    }
  }

  animate(): void {
    const progressCircle = this.progressCircle.nativeElement;
    this.progress = 0
    interval(15).pipe(
      takeWhile(() => this.progress < this.score),
      tap(() => {
        this.progress++;
        if (this.score < 16){
          progressCircle.style.background = `conic-gradient(
            #7ce1b14d ${this.progress * 1.2}deg, #63e4a7 ${this.progress * 3.6}deg,
            #F2F6FA ${this.progress * 3.6}deg
          )`;
        }
        if (this.score >= 16 && this.score <= 30){
          progressCircle.style.background = `conic-gradient(
            #c9a7de70 ${this.progress * 1.2}deg, #b982de ${this.progress * 3.6}deg,
            #F2F6FA ${this.progress * 3.6}deg
          )`;
        }
        if (this.score > 30 && this.score <= 60){
          progressCircle.style.background = `conic-gradient(
            #fcd88580 ${this.progress * 1.2}deg, #fcd885 ${this.progress * 3.6}deg,
            #F2F6FA ${this.progress * 3.6}deg
          )`;
        }
        if (this.score > 60){
          progressCircle.style.background = `conic-gradient(
            #ec66664f ${this.progress * 1.2}deg, #ec6666 ${this.progress * 3.6}deg,
            #F2F6FA ${this.progress * 3.6}deg
          )`;
        }
      })
    ).subscribe()
  }
}
