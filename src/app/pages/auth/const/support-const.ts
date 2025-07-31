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
    validators: ['required', 'maxLength:50', 'pattern'],
  },
  {
    key: 'surname',
    label: 'Apellido',
    type: 'text',
    required: true,
    validators: ['required', 'maxLength:50', 'pattern'],
  },
  {
    key: 'cuil',
    label: 'Usuario',
    type: 'text',
    required: true,
    validators: ['required', 'minLength:11', 'maxLength:11'],
    popOver: 'Introduce tu numero de identificacion de usuario',
  },
  {
    key: 'email',
    label: 'Correo electrónico',
    type: 'email',
    required: true,
    validators: ['required', 'email'],
  },
  {
    key: 'telephone',
    label: 'Teléfono',
    type: 'tel',
    required: false,
    validators: ['pattern'],
  },
  {
    key: 'reason',
    label: 'Motivo',
    type: 'select',
    required: true,
    validators: ['required'],
    options: SUPPORT_OPTIONS,
    popOver: 'Selecciona un motivo',
  },
  {
    key: 'comment',
    label: 'Comentario',
    type: 'textarea',
    required: false,
    validators: [],
  },
];
