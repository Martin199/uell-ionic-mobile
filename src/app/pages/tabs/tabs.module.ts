import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonContent, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonImg } from "@ionic/angular/standalone";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TabsPageRoutingModule,
        SharedModule,
        IonContent,
        IonTabs,
        IonTabBar,
        IonTabButton,
        IonIcon,
        IonLabel,
        IonImg
    ],
    declarations: [TabsPage],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabsPageModule { }
