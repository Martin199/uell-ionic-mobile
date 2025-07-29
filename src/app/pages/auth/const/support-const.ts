export const SUPPORT_OPTIONS = [
  'No me llego el código a mi email.',
  'Mis datos son correctos, pero no puedo ingresar.',
  'Otro',
];

export const SUPPORT_FIELDS = [
  {
    key: 'name',
    label: 'Nombre',
    type: 'text',
    required: true,
    validators: ['required'],
  },
  {
    key: 'surename',
    label: 'Apellido',
    type: 'text',
    required: true,
    validators: ['required'],
  },
  {
    key: 'cuil',
    label: 'CUIL',
    type: 'text',
    required: true,
    validators: ['required', 'minLength:11', 'maxLength:11'],
  },
  {
    key: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    validators: ['required', 'email'],
  },
  {
    key: 'telephone',
    label: 'Teléfono',
    type: 'tel',
    required: false,
    validators: [],
  },
  {
    key: 'reason',
    label: 'Motivo',
    type: 'select',
    required: true,
    validators: ['required'],
    options: SUPPORT_OPTIONS,
  },
  {
    key: 'comment',
    label: 'Comentario',
    type: 'textarea',
    required: false,
    validators: [],
  },
];
