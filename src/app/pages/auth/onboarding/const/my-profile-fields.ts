export interface ProfileCard {
  title: string;
  type: string;
  fields: Array<CardField>;
}
export interface CardField {
  field: string;
  description: string;
}

export const profileCardsData: ProfileCard[] = [
  {
    title: 'Información básica',
    type: 'basic',
    fields: [
      {
        field: 'Nombre completo',
        description: 'Marielvis Rosenny Martinez Bellorin',
      },
      {
        field: 'Alias',
        description: 'Elvis',
      },
      {
        field: 'Fecha de nacimiento',
        description: '21/11/1986',
      },
      {
        field: 'DNI',
        description: '32456987',
      },
    ],
  },
  {
    title: 'Información de contacto',
    type: 'contact',
    fields: [
      {
        field: 'Correo electrónico',
        description: 'mbellorin@emergencias.com',
      },
      {
        field: 'Teléfono',
        description: '+54 11 2345-6789',
      },
    ],
  },
  {
    title: 'Dirección',
    type: 'address',
    fields: [
      {
        field: 'Dirección',
        description: 'Av. Melián 2752, CABA, Argentina - CP 1430',
      },
    ],
  },
  {
    title: 'Información laboral',
    type: 'work',
    fields: [
      {
        field: 'Empresa',
        description: 'Emergencias',
      },
      {
        field: 'Segmento',
        description: 'Área Metropolitana',
      },
      {
        field: 'Área',
        description: 'Dto. médico operativo',
      },
      {
        field: 'Puesto',
        description: 'Coordinador médico',
      },
    ],
  },
];

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

export const baseNumberCountry: Base = {
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
          },
        },
        addressValidations: {
          addressNumber: {
            required: true,
            enable: true,
          },
          addressFloor: {
            maxLength: 4,
            enable: true,
          },
          addressDepartment: {
            maxLength: 4,
            enable: true,
          },
          addressCodePostal: {
            required: true,
            maxLength: 5,
            minLength: 3,
            enable: true,
          },
          requiredLocalization: true,
        },
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
          },
        },
        addressValidations: {
          addressNumber: {
            required: true,
            enable: true,
          },
          addressFloor: {
            maxLength: 4,
            enable: true,
          },
          addressDepartment: {
            maxLength: 4,
            enable: true,
          },
          addressCodePostal: {
            required: false,
            maxLength: 6,
            minLength: 6,
            enable: true,
          },
          requiredLocalization: false,
        },
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
            enable: false,
          },
          addressFloor: {
            maxLength: 4,
            enable: false,
          },
          addressDepartment: {
            maxLength: 4,
            enable: false,
          },
          addressCodePostal: {
            required: false,
            enable: false,
          },
          requiredLocalization: false,
        },
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
            enable: true,
          },
          addressFloor: {
            maxLength: 4,
            enable: true,
          },
          addressDepartment: {
            maxLength: 4,
            enable: true,
          },
          addressCodePostal: {
            required: false,
            maxLength: 5,
            minLength: 5,
            enable: true,
          },
          requiredLocalization: true,
        },
      },
      Other: {
        phoneValidations: {
          phoneNumber: {
            required: true,
            minLength: 5,
            maxLength: 15,
          },
          code: {
            prefix: '0',
            maxLength: 1,
            minLength: 1,
          },
          area: {
            required: false,
            minLength: 1,
            maxLength: 1,
          },
        },
        addressValidations: {
          addressNumber: {
            required: true,
            enable: true,
          },
          addressFloor: {
            maxLength: 4,
            enable: true,
          },
          addressDepartment: {
            maxLength: 4,
            enable: true,
          },
          addressCodePostal: {
            required: false,
            maxLength: 5,
            minLength: 5,
            enable: true,
          },
          requiredLocalization: false,
        },
      },
    },
  },
};