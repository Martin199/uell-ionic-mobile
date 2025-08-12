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
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  imports: [IonButton, IonContent, ProfileCardComponent, ProfilePicOnboardingComponent],
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent {
  private utilsService = inject(UtilsService);
  private userStateService = inject(UserStateService);
  private userService = inject(UserService);
  
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

  // Nueva validación para el botón "Siguiente"
  isNextButtonDisabled = computed(() => {
    const userData = this.userStateService.userData();
    
    if (!userData) {
      return true; // Deshabilitado si no hay datos de usuario
    }

    // Validar información de contacto
    const hasValidContact = this.hasValidContactInfo(userData);
    
    // Validar dirección
    const hasValidAddress = this.hasValidAddressInfo(userData);
    
    // El botón está habilitado solo si tiene contacto y dirección válidos
    return !(hasValidContact && hasValidAddress);
  });

  // Método auxiliar para validar información de contacto
  private hasValidContactInfo(userData: any): boolean {
    // Validar email
    const hasValidEmail = userData.email && 
                         typeof userData.email === 'string' && 
                         userData.email.trim() !== '' &&
                         userData.email.includes('@');

    // Validar teléfono (puede ser telephoneNumber o cellphoneNumber)
    const hasValidPhone = this.hasValidPhoneNumber(userData.telephoneNumber) || 
                         this.hasValidPhoneNumber(userData.cellphoneNumber);

    return hasValidEmail && hasValidPhone;
  }

  // Método auxiliar para validar número de teléfono
  private hasValidPhoneNumber(phoneData: any): boolean {
    if (!phoneData) return false;
    
    return phoneData.countryCode && 
           phoneData.areaCode && 
           phoneData.phoneNumber &&
           typeof phoneData.countryCode === 'string' && 
           typeof phoneData.areaCode === 'string' && 
           typeof phoneData.phoneNumber === 'string' &&
           phoneData.countryCode.trim() !== '' &&
           phoneData.areaCode.trim() !== '' &&
           phoneData.phoneNumber.trim() !== '';
  }

  // Método auxiliar para validar información de dirección
  private hasValidAddressInfo(userData: any): boolean {
    if (!userData.address || !Array.isArray(userData.address) || userData.address.length === 0) {
      return false;
    }

    // Buscar la dirección primaria o usar la primera disponible
    const primaryAddress = userData.address.find((addr: any) => addr.isPrimary) || userData.address[0];
    
    if (!primaryAddress) {
      return false;
    }

    // Validar que tenga al menos la dirección principal
    return primaryAddress.addressName && 
           typeof primaryAddress.addressName === 'string' && 
           primaryAddress.addressName.trim() !== '';
  }

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
            description: this.formatFullName(userData()?.name, userData()?.surname),
          },
          {
            field: 'Alias',
            description: this.getSafeValue(userData()?.userAlias),
          },
          {
            field: 'Fecha de nacimiento',
            description: userData()?.bornDate ? this.formatDate(userData()?.bornDate!) : '-',
          },
          {
            field: 'DNI',
            description: this.getSafeValue(userData()?.documentNumber),
          },
        ],
      },
      {
        title: 'Información de contacto',
        type: 'contact',
        fields: [
          {
            field: 'Correo electrónico',
            description: this.getSafeValue(userData()?.email),
          },
          {
            field: 'Teléfono',
            description: userData()?.telephoneNumber
              ? `${this.getSafeValue(userData()?.telephoneNumber.countryCode)} ${this.getSafeValue(userData()?.telephoneNumber.areaCode)} ${
                  this.getSafeValue(userData()?.telephoneNumber.phoneNumber)
                }`
              : '-',
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
            description: this.getSafeValue(userData()?.area),
          },
          {
            field: 'Segmento',
            description: this.getSafeValue(userData()?.segmentationUnit?.segDescription),
          },
          {
            field: 'Área',
            description: this.getSafeValue(userData()?.workstation),
          },
          {
            field: 'Puesto',
            description: this.getSafeValue(userData()?.workstation),
          },
        ],
      },
    ];
  });

  private formatDate(date: Date | string): string {
    if (!date) return '-';

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
          return '-';
        }
        day = dateObj.getDate().toString().padStart(2, '0');
        month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        year = dateObj.getFullYear().toString();
      }
    } else {
      // Handle Date object
      if (isNaN(date.getTime())) {
        return '-';
      }
      day = date.getDate().toString().padStart(2, '0');
      month = (date.getMonth() + 1).toString().padStart(2, '0');
      year = date.getFullYear().toString();
    }

    return `${day}/${month}/${year}`;
  }

  private getSafeValue(value: any): string {
    if (value === null || value === undefined || value === '') {
      return '-';
    }
    if (typeof value === 'string' && value.trim() === '') {
      return '-';
    }
    return String(value);
  }

  private formatFullName(name: string | null | undefined, surname: string | null | undefined): string {
    const nameValue = this.getSafeValue(name);
    const surnameValue = this.getSafeValue(surname);
    
    if (nameValue === '-' && surnameValue === '-') {
      return '-';
    }
    
    const fullName = `${nameValue !== '-' ? nameValue : ''} ${surnameValue !== '-' ? surnameValue : ''}`.trim();
    return fullName || '-';
  }

  private formatAddress(addresses: any[] | undefined): string {
    if (!addresses || addresses.length === 0) {
      return '-';
    }

    const primaryAddress = addresses.find(addr => addr.isPrimary) || addresses[0];
    const addressParts = [
      this.getSafeValue(primaryAddress.addressName),
      this.getSafeValue(primaryAddress.addressNumber),
      this.getSafeValue(primaryAddress.addressFloor),
      this.getSafeValue(primaryAddress.addressDepartment),
      this.getSafeValue(primaryAddress.locality?.name),
      this.getSafeValue(primaryAddress.locality?.state?.name),
      this.getSafeValue(primaryAddress.addressCodePostal),
    ].filter(part => part !== '-');

    return addressParts.length > 0 ? addressParts.join(', ') : '-';
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
        const modalData = {
          address: primaryAddress,
        };
        const addressId = primaryAddress?.id || 0;
        this.utilsService.presentModal(AddressInfoComponent, undefined, modalData);
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
    if (this.error()) {
      return;
    }
    const activeModules = this.userStateService.tenantParameters()?.activeModules;
    if (activeModules?.includes('hc_onboarding')) {
      this.utilsService.navigateTo('/auth/onboarding/clinical-history');
    } else if (activeModules?.includes('isps')) {
      this.utilsService.navigateTo('/auth/onboarding/wellness-onboarding');
    } else {
      this.postOnboarding()
    }  
  }

  public async postOnboarding() {
    const body = {onboarded: true};
    this.userService.postOnBoarding(body).subscribe(() => {
        this.utilsService.navigateTo('/tabs/home');
    });
  }
}
