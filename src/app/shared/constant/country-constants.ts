export enum countryENUM {
	ARGENTINA = 'ARGENTINA',
	COLOMBIA = 'COLOMBIA',
	ECUADOR = 'ECUADOR',
	PERU = 'PERU',
  OTHER = 'OTHER'
}

export const COUNTRY_CODE = [
  { phoneCode: '+51', name: 'Perú', flagUrl: 'assets/flags/pe.svg' , country: countryENUM.PERU},
  { phoneCode: '+54', name: 'Argentina', flagUrl: './assets/flags/ar.svg', country: countryENUM.ARGENTINA },
  { phoneCode: '+57', name: 'Colombia', flagUrl: 'assets/flags/co.svg', country: countryENUM.COLOMBIA },
  { phoneCode: '+593', name: 'Ecuador', flagUrl: 'assets/flags/ec.svg', country: countryENUM.ECUADOR },
  // { phoneCode: '+55', name: 'Brasil', flagUrl: 'assets/flags/br.svg' },
  // { phoneCode: '+56', name: 'Chile', flagUrl: 'assets/flags/cl.svg' },
  // { phoneCode: '+591', name: 'Bolivia', flagUrl: 'assets/flags/bo.svg' },
  // { phoneCode: '+592', name: 'Guyana', flagUrl: 'assets/flags/gy.svg' },
  // { phoneCode: '+595', name: 'Paraguay', flagUrl: 'assets/flags/py.svg' },
  // { phoneCode: '+597', name: 'Surinam', flagUrl: 'assets/flags/sr.svg' },
  // { phoneCode: '+1', name: 'Trinidad y Tobago', flagUrl: 'assets/flags/tt.svg' },
  // { phoneCode: '+598', name: 'Uruguay', flagUrl: 'assets/flags/uy.svg' },
  // { phoneCode: '+58', name: 'Venezuela', flagUrl: 'assets/flags/ve.svg' },
  // { phoneCode: '+594', name: 'Guyana Francesa', flagUrl: 'assets/flags/gf.svg' },
  // { phoneCode: '+52', name: 'México', flagUrl: 'assets/flags/mx.svg' },
  // { phoneCode: '+501', name: 'Belice', flagUrl: 'assets/flags/bz.svg' },
  // { phoneCode: '+502', name: 'Guatemala', flagUrl: 'assets/flags/gt.svg' },
  // { phoneCode: '+504', name: 'Honduras', flagUrl: 'assets/flags/hn.svg' },
  // { phoneCode: '+503', name: 'El Salvador', flagUrl: 'assets/flags/sv.svg' },
  // { phoneCode: '+505', name: 'Nicaragua', flagUrl: 'assets/flags/ni.svg' },
  // { phoneCode: '+506', name: 'Costa Rica', flagUrl: 'assets/flags/cr.svg' },
  // { phoneCode: '+507', name: 'Panamá', flagUrl: 'assets/flags/pa.svg' },
  { phoneCode: 'Otro', name: 'Otro', country: countryENUM.OTHER },
];

export const COUNTRY_ADDRESS_VALIDATIONS = {
  ARGENTINA: {
    street: {
     required: true,
     pattern: /^[a-zA-Z0-9.\s]+$/,
    },
    number: {
      required: true,
      maxLength: 5,
      pattern: /^[0-9]+$/,
    },
    floor: {
      maxLength: 3,
      pattern: /^[a-zA-Z0-9]+$/,
    },
    apartment: {
      maxLength: 3,
      pattern: /^[a-zA-Z0-9]+$/,
    },
    postalCode: {
      required: true,
      minLength: 3,
      maxLength: 5,
      pattern: /^[0-9]+$/,
    },
    province: {
      required: true,
    },
    locality: {
      required: true,
    },
    observation: {
      maxLength: 250,
    },
  },
  COLOMBIA: {
    street: {
      required: true,
      pattern: /^[a-zA-Z0-9.\s]+$/,
    },
    number: {
      maxLength: 5,
      pattern: /^[a-zA-Z0-9\-#\s]+$/,
    },
    floor: {
      pattern: /^[a-zA-Z0-9]+$/,
      maxLength: 3,
    },
    apartment: {
      pattern: /^[a-zA-Z0-9]+$/,
      maxLength: 3,
    },
    postalCode: {
      required: true,
      minLength: 3,
      maxLength: 5,
      pattern: /^[0-9]+$/,
    },
    province: {
      required: true,
    },
    locality: {
      required: true,
    },
    observation: {
      maxLength: 250,
    },
  },
  ECUADOR: {
    street: {
      required: true,
      pattern: /^[a-zA-Z0-9.\s]+$/,
    },
    number: {
      required: true,
      maxLength: 5,
      pattern: /^[0-9]+$/,
    },
    floor: {
      maxLength: 3,
      pattern: /^[a-zA-Z0-9]+$/,
    },
    apartment: {
      maxLength: 3,
      pattern: /^[a-zA-Z0-9]+$/,
    },
    postalCode: {
      required: true,
      minLength: 3,
      maxLength: 5,
      pattern: /^[0-9]+$/,
    },
    province: {
      required: true,
    },
    locality: {
      required: true,
    },
    observation: {
      maxLength: 250,
    },
  },
  PERU: {
    street: {
      required: true,
      // pattern: /^[a-zA-Z0-9.\-#\s]+$/,
    },
    number: {
      // pattern: /^[a-zA-Z0-9.\-#\s]+$/,
    },
    floor: {
      // pattern: /^[a-zA-Z0-9]+$/,
    },
    apartment: {
      // pattern: /^[a-zA-Z0-9]+$/,
    },
    postalCode: {
      minLength: 5,
      // pattern: /^[0-9]+$/,
    },
    province: {
      required: true,
    },
    locality: {
      required: true,
    },
    observation: {
      maxLength: 250,
    },
  },
  OTHER: {
    street: {
      required: true,
    },
    number: {
    },
    floor: {
    },
    apartment: {
    },
    postalCode: {
    },
    province: {
      required: true,
    },
    locality: {
      required: true,
    },
    observation: {
      maxLength: 250,
    },
  }
}

export const COUNTRY_PHONE_VALIDATIONS = {

  ARGENTINA: {
    code: {
      prefix: '+54',
      minLength: 3,
      maxLength: 4,
    },
    area: {
      prefix: '11',
      minLength: 2,
      maxLength: 4,
    },
    phoneNumber: {
      minLength: 6,
      maxLength: 10,
    },
  },
  COLOMBIA: {
    code: {
      prefix: '+57',
      minLength: 3,
      maxLength: 4,
    },
    area: {
      prefix: '11',
      minLength: 2,
      maxLength: 4,
    },
    phoneNumber: {
      minLength: 6,
      maxLength: 10,
    },
  },
  ECUADOR: {
    code: {
      prefix: '+593',
      minLength: 3,
      maxLength: 4,
    },
    area: {
      prefix: '11',
      minLength: 1,
      maxLength: 2,
    },
    phoneNumber: {
      minLength: 7,
      maxLength: 9,
    },
  },
  PERU: {
    code: {
        prefix: '+51',
        minLength: 3,
        maxLength: 4,
    },
    area: {
        minLength: 1,
        maxLength: 2,
    },
    phoneNumber: {
        minLength: 9,
        maxLength: 9,
    },
  }
}