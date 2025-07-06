import { Component, inject, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import { UtilsService } from '../../services/utils.service';
import { addIcons } from "ionicons";
import { home, personOutline } from "ionicons/icons";
import { StatusBar, Style } from '@capacitor/status-bar';
import { EdgeToEdge } from '@capawesome/capacitor-android-edge-to-edge-support';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { Capacitor } from '@capacitor/core';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.page.html',
    styleUrls: ['./tabs.page.scss'],
    standalone: false
})
export class TabsPage implements OnInit {

    selectedTab: string = 'home';
    hasIsps: boolean = false;
    hasWellnessBlog: boolean = false;
    platform: string = '';
    utilsService = inject(UtilsService);
    private userState = inject(UserStateService);

    constructor() {
        const tenantP: string[] = this.userState.activeModules() ?? [];

        this.hasIsps = tenantP.includes('isps');
        this.hasWellnessBlog = tenantP.includes('wellness')
        addIcons({ home, personOutline });
    }

    ngOnInit() {
        this.detectPlatform();
        this.statusBarColor();
    }

    async detectPlatform() {
        const info = await Device.getInfo();
        this.platform = info.platform; // 'ios', 'android', 'web', etc.
    }

    selectTab(tab: string) {
        this.selectedTab = tab;
        this.utilsService.goTo(`/tabs/${this.selectedTab}`);
    }

  statusBarColor() {
    if (!Capacitor.isNativePlatform()) return;
    StatusBar.setBackgroundColor({ color: '#1DA4B1' });
    StatusBar.setStyle({ style: Style.Dark });
    EdgeToEdge.setBackgroundColor({ color: '#1DA4B1' });
  }

}
