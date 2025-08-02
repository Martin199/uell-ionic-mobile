import { Component, inject, computed } from '@angular/core';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { ProfileCardComponent } from '../profile-card/profile-card.component';
import { profileCardsData } from '../../const/my-profile-fields';
import { UtilsService } from 'src/app/services/utils.service';
import { BasicModalComponent, BasicModalData } from '../modals/basic-modal/basic-modal.component';
import { ContactModalComponent } from '../modals/contact-modal/contact-modal.component';
// import { AddressModalComponent } from '../modals/address-modal/address-modal.component';
import { WorkModalComponent } from '../modals/work-modal/work-modal.component';
import { ProfilePicOnboardingComponent } from '../profile-pic-onboarding/profile-pic-onboarding.component';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { AddressInfoComponent } from '../../steps/user-address-info/address-info/address-info.component';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  imports: [IonButton, IonContent, ProfileCardComponent, ProfilePicOnboardingComponent],
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent {
  private utilsService = inject(UtilsService);
  private userStateService = inject(UserStateService);
  error = computed(() => {
    const userData = this.userStateService.userData();
    if (!userData) return null;
    if (
      userData.email &&
      userData.telephoneNumber.areaCode &&
      userData.telephoneNumber.phoneNumber &&
      userData.telephoneNumber.countryCode
    )
      return false;
    return 'Complete los datos de contacto para continuar';
  });
  profileCards = computed(() => {
    const userData = this.userStateService.userData;

    if (!userData) {
      return profileCardsData; // Return default data if no user data
    }

    return [
      {
        title: 'Información básica',
        type: 'basic',
        fields: [
          {
            field: 'Nombre completo',
            description: `${userData()?.name || ''} ${userData()?.surname || ''}`.trim() || 'No disponible',
          },
          {
            field: 'Alias',
            description: userData()?.userAlias || '-',
          },
          {
            field: 'Fecha de nacimiento',
            description: userData()?.bornDate ? this.formatDate(userData()?.bornDate!) : 'No disponible',
          },
          {
            field: 'DNI',
            description: userData()?.documentNumber || 'No disponible',
          },
        ],
      },
      {
        title: 'Información de contacto',
        type: 'contact',
        fields: [
          {
            field: 'Correo electrónico',
            description: userData()?.email || 'No disponible',
          },
          {
            field: 'Teléfono',
            description: userData()?.telephoneNumber
              ? `${userData()?.telephoneNumber.countryCode} ${userData()?.telephoneNumber.areaCode} ${
                  userData()?.telephoneNumber.phoneNumber
                }`
              : 'No disponible',
          },
        ],
      },
      {
        title: 'Dirección',
        type: 'address',
        fields: [
          {
            field: 'Dirección',
            description: this.formatAddress(userData()?.address),
          },
        ],
      },
      {
        title: 'Información laboral',
        type: 'work',
        fields: [
          {
            field: 'Empresa',
            description: userData()?.area || 'No disponible',
          },
          {
            field: 'Segmento',
            description: userData()?.segmentationUnit?.segDescription || 'No disponible',
          },
          {
            field: 'Área',
            description: userData()?.workstation || 'No disponible',
          },
          {
            field: 'Puesto',
            description: userData()?.workstation || 'No disponible',
          },
        ],
      },
    ];
  });

  private formatDate(date: Date | string): string {
    if (!date) return 'No disponible';

    let day: string, month: string, year: string;

    if (typeof date === 'string') {
      // Handle ISO date string format (YYYY-MM-DD)
      if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const parts = date.split('-');
        year = parts[0];
        month = parts[1];
        day = parts[2];
      } else {
        // Fallback to Date object for other formats
        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) {
          return 'No disponible';
        }
        day = dateObj.getDate().toString().padStart(2, '0');
        month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        year = dateObj.getFullYear().toString();
      }
    } else {
      // Handle Date object
      if (isNaN(date.getTime())) {
        return 'No disponible';
      }
      day = date.getDate().toString().padStart(2, '0');
      month = (date.getMonth() + 1).toString().padStart(2, '0');
      year = date.getFullYear().toString();
    }

    return `${day}/${month}/${year}`;
  }

  private formatAddress(addresses: any[] | undefined): string {
    if (!addresses || addresses.length === 0) {
      return 'No disponible';
    }

    const primaryAddress = addresses.find(addr => addr.isPrimary) || addresses[0];
    const addressParts = [
      primaryAddress.addressName,
      primaryAddress.addressNumber,
      primaryAddress.addressFloor,
      primaryAddress.addressDepartment,
      primaryAddress.locality?.name,
      primaryAddress.locality?.state?.name,
      primaryAddress.addressCodePostal,
    ].filter(part => part && part.trim());

    return addressParts.length > 0 ? addressParts.join(', ') : 'No disponible';
  }

  openEditModal(type: string) {
    const userData = this.userStateService.userData();

    if (!userData) {
      console.warn('No user data available my profile');
      return;
    }

    switch (type) {
      case 'basic':
        const data: BasicModalData = {
          name: userData.name || '',
          surname: userData.surname || '',
          alias: userData.userAlias || '',
          birthDate: userData.bornDate ? new Date(userData.bornDate).toISOString().split('T')[0] : '',
          docType: userData.documentType || '',
          docNumber: userData.documentNumber || '',
        };
        this.utilsService.presentModal(BasicModalComponent, undefined, data);
        break;
      case 'contact':
        const modalDataContact = {
          email: userData.email || '',
          phone: userData.telephoneNumber
            ? `${userData.telephoneNumber.countryCode}${userData.telephoneNumber.areaCode}${userData.telephoneNumber.phoneNumber}`
            : '',
        };
        this.utilsService.presentModal(ContactModalComponent, undefined, modalDataContact);
        break;
      case 'address':
        const primaryAddress = userData.address?.find(addr => addr.isPrimary) || userData.address?.[0];
        const addressId = primaryAddress?.id || 0;
        this.utilsService.presentModal(AddressInfoComponent, undefined, { addressId: addressId });
        break;
      case 'work':
        const modalDataWork = {
          company: userData.area || '',
          position: userData.workstation || '',
          startDate: userData.entryDate ? new Date(userData.entryDate).toISOString().split('T')[0] : '',
          endDate: '', // No end date in user data, leaving empty
        };
        this.utilsService.presentModal(WorkModalComponent, undefined, modalDataWork);
        break;
      default:
        break;
    }
  }

  next() {
    // if (this.error()) {
    //   return;
    // }

    this.utilsService.navigateTo('/auth/onboarding/clinical-history');
  }
}
