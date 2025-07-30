// form-config.ts
export interface FormField {
  id: string;
  key?: string;
  questionKey?: string;
  type: 'radio' | 'checkbox' | 'text' | 'select' | 'textarea';
  label: string;
  required?: boolean;
  options?: FormOption[];
  subFields?: FormField[];
  validation?: any;
}

export interface FormOption {
  value: string | boolean | number;
  label: string;
  labelKey?: string;
  subOptions?: FormOption[];
}

export interface FormStep {
  id: string;
  title: string;
  subtitle?: string;
  fields: FormField[];
}

export interface FormConfig {
  id: string;
  title: string;
  steps: FormStep[];
}

export const OCCUPATIONAL_HEALTH_FORM: FormConfig = {
  id: 'occupational-health',
  title: 'Historia clínica ocupacional',
  steps: [
    {
      id: 'general-info',
      title: 'Información general',
      fields: [
        {
          id: 'current_medication',
          type: 'radio',
          label: '¿Estás tomando algún medicamento actualmente?',
          required: true,
          options: [
            { value: true, label: 'Sí' },
            { value: false, label: 'No' },
          ],
        },
        {
          id: 'work_accident',
          type: 'radio',
          label: '¿Has tenido algún accidente de trabajo en el pasado?',
          required: true,
          options: [
            { value: true, label: 'Sí' },
            { value: false, label: 'No' },
          ],
        },
        {
          id: 'professional_disease',
          type: 'radio',
          label: '¿Has sufrido alguna enfermedad profesional en algún momento?',
          required: true,
          options: [
            { value: true, label: 'Sí' },
            { value: false, label: 'No' },
          ],
        },
        {
          id: 'previous_work',
          type: 'radio',
          label: '¿Has tenido algún otro trabajo anteriormente?',
          required: true,
          options: [
            { value: true, label: 'Sí' },
            { value: false, label: 'No' },
          ],
        },
        {
          id: 'recent_vaccines',
          type: 'radio',
          label: '¿Has recibido alguna vacuna relevante para tu salud en los últimos años?',
          required: true,
          options: [
            { value: true, label: 'Sí' },
            { value: false, label: 'No' },
          ],
        },
      ],
    },
    {
      id: 'medical-conditions',
      title: 'Enfermedades de base',
      subtitle: 'Indica si padeces o padeciste alguna de las siguientes patologías:',
      fields: [
        {
          id: 'hypertension',
          type: 'radio',
          label: 'Hipertensión arterial',
          required: true,
          options: [
            { value: true, label: 'Sí' },
            { value: false, label: 'No' },
          ],
        },
        {
          id: 'diabetes',
          type: 'radio',
          label: 'Diabetes',
          required: true,
          options: [
            { value: true, label: 'Sí' },
            { value: false, label: 'No' },
          ],
        },
        {
          id: 'diabetes_type',
          type: 'radio',
          label: 'Tipo de diabetes:',
          required: true,
          options: [
            { value: 'DIABETES_TYPE_1', label: 'Tipo 1' },
            { value: 'DIABETES_TYPE_2', label: 'Tipo 2' },
          ],
        },
        {
          id: 'respiratory',
          type: 'radio',
          label: 'Respiratorias',
          required: true,
          options: [
            { value: true, label: 'Sí' },
            { value: false, label: 'No' },
          ],
        },
        {
          id: 'cardiovascular',
          type: 'radio',
          label: 'Cardiovasculares',
          required: true,
          options: [
            { value: true, label: 'Sí' },
            { value: false, label: 'No' },
          ],
        },
        {
          id: 'neurological',
          type: 'radio',
          label: 'Neurológicas',
          required: true,
          options: [
            { value: true, label: 'Sí' },
            { value: false, label: 'No' },
          ],
        },
        {
          id: 'metabolic',
          type: 'radio',
          label: 'Metabólicas',
          required: true,
          options: [
            { value: true, label: 'Sí' },
            { value: false, label: 'No' },
          ],
        },
        {
          id: 'psychiatric',
          type: 'radio',
          label: 'Psiquiátricas',
          required: true,
          options: [
            { value: true, label: 'Sí' },
            { value: false, label: 'No' },
          ],
        },
        {
          id: 'oncological',
          type: 'radio',
          label: 'Oncológicas',
          required: true,
          options: [
            { value: true, label: 'Sí' },
            { value: false, label: 'No' },
          ],
          subFields: [
            {
              id: 'oncological_types',
              type: 'checkbox',
              label: 'Tipos de cáncer:',
              required: true,
              options: [
                { value: 'respiratory', label: 'Respiratorio' },
                { value: 'gynecological', label: 'Ginecológico' },
                { value: 'nephro_urological', label: 'Nefro-urológico' },
                { value: 'gastrointestinal', label: 'Gastrointestinal' },
                { value: 'endocrine', label: 'Endocrino' },
                { value: 'neurological', label: 'Neurológico' },
              ],
            },
          ],
        },
        {
          id: 'gastrointestinal',
          type: 'radio',
          label: 'Gastrointestinales',
          required: true,
          options: [
            { value: true, label: 'Sí' },
            { value: false, label: 'No' },
          ],
        },
        {
          id: 'spinal_column',
          type: 'radio',
          label: 'Columna vertebral',
          required: true,
          options: [
            { value: true, label: 'Sí' },
            { value: false, label: 'No' },
          ],
        },
        {
          id: 'endocrinological',
          type: 'radio',
          label: 'Endocrinológicas',
          required: true,
          options: [
            { value: true, label: 'Sí' },
            { value: false, label: 'No' },
          ],
        },
        {
          id: 'infectious',
          type: 'radio',
          label: 'Infecciosas',
          required: true,
          options: [
            { value: true, label: 'Sí' },
            { value: false, label: 'No' },
          ],
        },
        {
          id: 'surgical',
          type: 'radio',
          label: 'Cirugías',
          required: true,
          options: [
            { value: true, label: 'Sí' },
            { value: false, label: 'No' },
          ],
          subFields: [
            {
              id: 'surgical_observations',
              type: 'textarea',
              label: 'Observaciones sobre las cirugías:',
              required: true,
              validation: { maxLength: 500 },
            },
          ],
        },
      ],
    },
  ],
};
