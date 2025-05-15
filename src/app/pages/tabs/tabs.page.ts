import { Component, inject, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import { UtilsService } from '../../services/utils.service';
import { addIcons } from "ionicons";
import { home, personOutline } from "ionicons/icons";

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.page.html',
    styleUrls: ['./tabs.page.scss'],
    standalone: false
})
export class TabsPage implements OnInit {

    selectedTab: string = 'home';
    platform: string = '';
    utilsService = inject(UtilsService);

    constructor() {
        addIcons({ home, personOutline });
    }

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
