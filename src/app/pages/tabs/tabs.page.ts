import { Component, inject, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  selectedTab: string = 'home';
  platform: string = '';
  utilsService = inject (UtilsService);

  constructor() { }

  ngOnInit() {
    this.detectPlatform();
  }

  async detectPlatform() {
    const info = await Device.getInfo();
    this.platform = info.platform; // 'ios', 'android', 'web', etc.
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
    this.utilsService.goTo(`/tabs/${this.selectedTab}`);
  }

}
