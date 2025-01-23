import { Component, inject, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { FormsIspsComponent } from 'src/app/shared/componentes/forms-isps/forms-isps.component';

@Component({
  selector: 'app-psychosocial-health',
  templateUrl: './psychosocial-health.page.html',
  styleUrls: ['./psychosocial-health.page.scss'],
})
export class PsychosocialHealthPage implements OnInit {

  utilService = inject(UtilsService);

  ngOnInit() {
  }

  async onClick() {
    console.log('Button clicked');
      const modal = await this.utilService.modalCtrl.create({
        component: FormsIspsComponent,
        //componentProps: { termsText: }
      });
      await modal.present();
  }	

}
