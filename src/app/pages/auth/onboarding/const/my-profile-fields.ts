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
