import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface PhoneValidations {
  code: {
    prefix: string;
    minLength: number;
    maxLength: number;
  };
  area?: {
    prefix?: string;
    minLength: number;
    maxLength: number;
    required?: boolean;
  };
  phoneNumber: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
}

export interface AddressValidations {
  addressNumber: {
    required: boolean;
    enable: boolean;
  };
  addressFloor?: {
    maxLength: number;
    enable: boolean;
  };
  addressDepartment?: {
    maxLength: number;
    enable: boolean;
  };
  addressCodePostal?: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
    enable: boolean;
  };
  requiredLocalization: boolean;
}

export interface CountryValidations {
  [countryName: string]: {
    phoneValidations?: PhoneValidations;
    addressValidations: AddressValidations;
  };
}

export interface Base {
  validations: {
    country: CountryValidations;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProfileValidationsService {

  public globals: Array<any> = [];
  private base: Base = {
    validations: {
      country: {
        ARGENTINA: {
          phoneValidations: {
            code: {
              prefix: '+54',
              minLength: 3,
              maxLength: 4,
            },
            area: {
              prefix: '11',
              minLength: 2,
              maxLength: 4,
              required: true,
            },
            phoneNumber: {
              minLength: 6,
              maxLength: 10,
              required: true,
            }
          },
          addressValidations: {
            addressNumber: {
              required: true,
              enable: true
            },
            addressFloor: {
              maxLength: 4,
              enable: true
            },
            addressDepartment: {
              maxLength: 4,
              enable: true
            },
            addressCodePostal: {
              required: true,
              maxLength: 5,
              minLength: 3,
              enable: true
            },
            requiredLocalization: true
          }
        },
        COLOMBIA: {
          phoneValidations: {
            code: {
              prefix: '+57',
              minLength: 3,
              maxLength: 4,
            },
            area: {
              minLength: 2,
              maxLength: 4,
              required: false,
            },
            phoneNumber: {
              minLength: 7,
              maxLength: 11,
              required: true,
            }
          },
          addressValidations: {
            addressNumber: {
              required: true,
              enable: true
            },
            addressFloor: {
              maxLength: 4,
              enable: true
            },
            addressDepartment: {
              maxLength: 4,
              enable: true
            },
            addressCodePostal: {
              required: false,
              maxLength: 6,
              minLength: 6,
              enable: true
            },
            requiredLocalization: false
          }
        },
        ECUADOR: {
          phoneValidations: {
            code: {
              prefix: '+593',
              minLength: 3,
              maxLength: 4,
            },
            area: {
              minLength: 1,
              maxLength: 2,
              required: true,
            },
            phoneNumber: {
              minLength: 7,
              maxLength: 9,
              required: true,
            },
          },
          addressValidations: {
            addressNumber: {
              required: false,
              enable: false
            },
            addressFloor: {
              maxLength: 4,
              enable: false
            },
            addressDepartment: {
              maxLength: 4,
              enable: false
            },
            addressCodePostal: {
              required: false,
              enable: false
            },
            requiredLocalization: false
          }
        },
        PERU: {
          phoneValidations: {
            code: {
              prefix: '+51',
              minLength: 3,
              maxLength: 4,
            },
            area: {
              minLength: 1,
              maxLength: 2,
              required: false,
            },
            phoneNumber: {
              minLength: 9,
              maxLength: 9,
              required: true,
            },
          },
          addressValidations: {
            addressNumber: {
              required: true,
              enable: true
            },
            addressFloor: {
              maxLength: 4,
              enable: true
            },
            addressDepartment: {
              maxLength: 4,
              enable: true
            },
            addressCodePostal: {
              required: false,
              maxLength: 5,
              minLength: 5,
              enable: true
            },
            requiredLocalization: true
          }
        },
        Other: {
          phoneValidations: {
            phoneNumber: {
              required: true,
              minLength: 5,
              maxLength: 15
            },
            code: {
              prefix: '0',
              maxLength: 1,
              minLength: 1
            },
            area: {
              required: false,
              minLength: 1,
              maxLength: 1
            }
          },
          addressValidations: {
            addressNumber: {
              required: true,
              enable: true
            },
            addressFloor: {
              maxLength: 4,
              enable: true
            },
            addressDepartment: {
              maxLength: 4,
              enable: true
            },
            addressCodePostal: {
              required: false,
              maxLength: 5,
              minLength: 5,
              enable: true
            },
            requiredLocalization: false
          }
        }
      }
    },
  };

  constructor() {

    this.globals = [
      {
        name: 'local',
        validations: this.base.validations,
      },
      {
        name: 'dev',
        validations: this.base.validations,
      },
      {
        name: 'qa',
        validations: this.base.validations,
      },
      {
        name: 'stage',
        validations: this.base.validations,
      },
      {
        name: 'prod',
        validations: this.base.validations,
      },
    ];
  }

  returnGlobalsConfig(): any {
    return this.globals.find((e: any) => e.name === environment.env)
      ? this.globals.find((e: any) => e.name === environment.env)
      : this.globals[0];
  }
}
