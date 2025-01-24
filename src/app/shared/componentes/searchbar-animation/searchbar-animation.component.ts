import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-searchbar-animation',
  templateUrl: './searchbar-animation.component.html',
  styleUrls: ['./searchbar-animation.component.scss'],
  animations: [
    trigger('inputAnimation', [
      transition(':enter', [
        style({ width: 0, opacity: 0 }),
        animate('500ms', style({ width: '100%', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ width: '100%', opacity: 1 }),
        animate('2ms', style({ width: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class SearchbarAnimationComponent  implements OnInit {

  @Input() placeholder: string = '';
  @Input() dataFindPost: any[] = [];
  @Output() clickEvent = new EventEmitter<any>();

  searchValue: string = '';
  viewInput: boolean = false;
  viewSearchResults: boolean = false;
  spinner: boolean = false;
  timeoutId: any;
  filteredResults: { title: string; id: number }[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.dataFindPost);
  }

  toogleView() {
    this.searchValue = '';
    this.viewInput = !this.viewInput;
    this.viewSearchResults = this.viewInput && this.searchValue.trim().length ? true : false;
  }

  openSearchResults(event: string) {
    clearTimeout(this.timeoutId);
    if(event.trim().length >= 3) {
      this.spinner = true;
      this.viewSearchResults = true;
      this.timeoutId = this.filteredResults = this.dataFindPost
      .filter(post =>post.title.toLowerCase().includes(event.toLowerCase()))
      .slice(0, 10);
      setTimeout(() => {
        this.spinner = false;
      }, 2000);
    } else {
      this.viewSearchResults = false;
      this.filteredResults = [];
      this.spinner = false;
    }
  }

  selectItem(value: any) {
    this.clickEvent.emit(value)
  }
  
}
