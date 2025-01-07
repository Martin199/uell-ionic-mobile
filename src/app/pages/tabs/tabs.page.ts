import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  selectedTab: string = 'home';

  constructor() { }

  ngOnInit() {
  }


  selectTab(tab: string) {
    this.selectedTab = tab;
  }

}
