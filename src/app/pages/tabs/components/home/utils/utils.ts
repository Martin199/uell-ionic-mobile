import moment from "moment";

export class Utils {
static returnSpeechIndice(valueIndice: number) {
    let speech: {
        title: string;
        titleRange: string;
        description1: string;
        description2: string;
        description3: string;
        description4: string;
        descriptionOptions: string;
        options: string[];
      } = {
        title: '',
        titleRange: '',
        description1: '',
        description2: '',
        description3: '',
        description4: '',
        descriptionOptions: '',
        options: [],
      };
      if (valueIndice === null) {
        speech.title = '¡Tenemos una propuesta para vos!',
          speech.description1 = "Te invitamos a completar el Índice de Salud Psicosocial para conocer tu Bienestar.",
          speech.description2 = "En Acciones Saludables encontrarás recomendaciones acordes a tus resultados."
      }
      if (valueIndice >= 0 && valueIndice <= 15 && valueIndice !== null) {
        speech.title = 'Bienestar Óptimo',
          speech.titleRange = '1-15',
          speech.description1 = "¡Qué bien! Estás en un momento de bienestar óptimo, lo que significa que tendrías una gran capacidad para afrontar los retos diarios y disfrutar de relaciones saludables y enriquecedoras. Este estado indica que cuentas con una base bastante sólida en tus dimensiones mental, social y física, lo cual te ayuda a gestionar el estrés de forma efectiva, mantener un estado de ánimo equilibrado y conectarte de manera significativa con los demás.",
          speech.descriptionOptions = "Sugerencia:",
          speech.options = ["¿Hay algún aspecto que te gustaría profundizar en tu vida diaria? Probar una actividad nueva este mes o reflexionar sobre lo que más valoras en tus rutinas de bienestar pueden ayudarte a mantener este equilibrio y abrirte a nuevas experiencias."]
      }
      if (valueIndice >= 16 && valueIndice <= 30) {
        speech.title = 'Bienestar Moderado',
          speech.titleRange = '16-30',
          speech.description1 = "¡Vas por buen camino hacia un mayor bienestar! Posiblemente ya has incorporado algunos hábitos saludables que te están beneficiando, y con algunos ajustes o mejoras, podrías alcanzar un estado de bienestar más alto. Esto significa que, si bien ya estás avanzando, podrías añadir algunas prácticas para sentirte aún mejor y más preparado para los retos diarios.",
          speech.descriptionOptions = "Sugerencia:",
          speech.options = ["¿Sientes que algún aspecto específico podría mejorar tu energía o motivación? Revisar tu rutina de sueño o planificar tiempos de autocuidado pueden ayudarte a reforzar este equilibrio y a sentirte aún más en sintonía."]
      }
      if (valueIndice >= 31 && valueIndice <= 60) {
        speech.title = 'Salud Psicosocial Afectada',
          speech.titleRange = '31-60',
          speech.description1 = "Es posible que estés atravesando un momento en el que tu bienestar necesita más atención. Este estado refleja que podrías estar enfrentando retos que afectan tu salud emocional, tus relaciones o tu bienestar físico. Reconocer este estado es un primer paso crucial para hacer pequeños cambios que te ayuden a sentirte mejor.",
          speech.descriptionOptions = "Sugerencia:",
          speech.options = ["¿Estás sintiendo que el estrés o la ansiedad te están afectando más de lo usual? Tal vez podrías considerar dedicar tiempo a revisar tus hábitos de descanso o alimentación, o sumar breves momentos de actividad física que te ayuden a manejar el estrés."]
      }
      if (valueIndice > 60) {
        speech.title = 'Salud Psicosocial en Riesgo',
          speech.titleRange = '61-100',
          speech.description1 = "Sabemos que atravesar momentos difíciles no es fácil, y queremos que sepas que tienes herramientas y opciones para enfrentar este reto. Este resultado refleja que actualmente estarías enfrentando situaciones que pueden estar afectando tu salud emocional, tus relaciones o tu bienestar físico. Reconocer este momento es un paso importante hacia la recuperación y el equilibrio.",
          speech.descriptionOptions = "Sugerencia:",
          speech.options = ["La ansiedad y el estrés muchas veces nos desconectan de lo que solía hacernos bien. Intentar retomar actividades que alguna vez disfrutaste (aunque sea en pequeñas dosis), como escuchar música, leer, cocinar o ver una serie, puede ser una buena manera de reconectar con sensaciones de calma y satisfacción."]
      }
      return speech
  }

  static returnSpeechIndiceLATAM(valueIndice: number) {
    let speech: {
        title: string;
        titleRange: string;
        description1: string;
        description2: string;
        description3: string;
        description4: string;
        descriptionOptions: string;
        options: string[];
      } = {
        title: '',
        titleRange: '',
        description1: '',
        description2: '',
        description3: '',
        description4: '',
        descriptionOptions: '',
        options: [],
      };
      if (valueIndice === null) {
        speech.title = '¡Tenemos una propuesta para vos!',
          speech.titleRange = '',
          speech.description1 = "Te invitamos a completar el Índice de Salud Psicosocial para conocer tu Bienestar.",
          speech.description2 = "En Acciones Saludables encontrarás recomendaciones acordes a tus resultados."
      }
      if (valueIndice >= 0 && valueIndice <= 15 && valueIndice !== null) {
        speech.title = 'Bienestar Óptimo',
          speech.titleRange = '1-15',
          speech.description1 = "¡Qué bien! Estás en un momento de bienestar óptimo, lo que significa que tendrías una gran capacidad para afrontar los retos diarios y disfrutar de relaciones saludables y enriquecedoras. Este estado indica que cuentas con una base bastante sólida en tus dimensiones mental, social y física, lo cual te ayuda a gestionar el estrés de forma efectiva, mantener un estado de ánimo equilibrado y conectarte de manera significativa con los demás.",
          speech.descriptionOptions = "Sugerencia:",
          speech.options = ["¿Hay algún aspecto que te gustaría profundizar en tu vida diaria? Probar una actividad nueva este mes o reflexionar sobre lo que más valoras en tus rutinas de bienestar pueden ayudarte a mantener este equilibrio y abrirte a nuevas experiencias."]
      }
      if (valueIndice >= 16 && valueIndice <= 30) {
        speech.title = 'Bienestar Moderado',
          speech.titleRange = '16-30',
          speech.description1 = "¡Vas por buen camino hacia un mayor bienestar! Posiblemente ya has incorporado algunos hábitos saludables que te están beneficiando, y con algunos ajustes o mejoras, podrías alcanzar un estado de bienestar más alto. Esto significa que, si bien ya estás avanzando, podrías añadir algunas prácticas para sentirte aún mejor y más preparado para los retos diarios.",
          speech.descriptionOptions = "Sugerencia:",
          speech.options = ["¿Sientes que algún aspecto específico podría mejorar tu energía o motivación? Revisar tu rutina de sueño o planificar tiempos de autocuidado pueden ayudarte a reforzar este equilibrio y a sentirte aún más en sintonía."]
  
      }
      if (valueIndice >= 31 && valueIndice <= 60) {
        speech.title = 'Salud Psicosocial Afectada',
          speech.titleRange = '31-60',
          speech.description1 = "Es posible que estés atravesando un momento en el que tu bienestar necesita más atención. Este estado refleja que podrías estar enfrentando retos que afectan tu salud emocional, tus relaciones o tu bienestar físico. Reconocer este estado es un primer paso crucial para hacer pequeños cambios que te ayuden a sentirte mejor.",
          speech.descriptionOptions = "Sugerencias:",
          speech.options = ["¿Estás sintiendo que el estrés o la ansiedad te están afectando más de lo usual? Tal vez podrías considerar dedicar tiempo a revisar tus hábitos de descanso o alimentación, o sumar breves momentos de actividad física que te ayuden a manejar el estrés."]
      }
      if (valueIndice > 60) {
        speech.title = 'Salud Psicosocial en Riesgo',
          speech.titleRange = '61-100',
          speech.description1 = "Sabemos que atravesar momentos difíciles no es fácil, y queremos que sepas que tienes herramientas y opciones para enfrentar este reto. Este resultado refleja que actualmente estarías enfrentando situaciones que pueden estar afectando tu salud emocional, tus relaciones o tu bienestar físico. Reconocer este momento es un paso importante hacia la recuperación y el equilibrio.",
          speech.descriptionOptions = "Sugerencias:",
          speech.options = ["La ansiedad y el estrés muchas veces nos desconectan de lo que solía hacernos bien. Intentar retomar actividades que alguna vez disfrutaste (aunque sea en pequeñas dosis), como escuchar música, leer, cocinar o ver una serie, puede ser una buena manera de reconectar con sensaciones de calma y satisfacción."]
      }
      return speech
  }

    static addDaysValidator(created: any, day: number): boolean{
    const _date = moment(created).clone().add(day, 'days');
    return moment() >= _date;
  }

    static returnUmbralNutrition(valueIndice: number) {
    let speech = {
      title: '',
      description1: '',
    
    }
    if (valueIndice >= 0 && valueIndice <= 30 && valueIndice !== null) {
      speech.title = 'Saludable';
        speech.description1 = "¡Felicitaciones! Tus hábitos son en su mayoría saludables. Sigue así y añade más movimiento a tu día.";
    }
    if (valueIndice > 30 && valueIndice <= 55) {
      speech.title = 'Medianamente saludable';
        speech.description1 = "Podrías mejorar tus hábitos. Presta atención a tu alimentación y plantea objetivos a corto plazo para corregir esos hábitos. ¡Tú puedes hacerlo!";

    }
    if (valueIndice > 55 && valueIndice <= 80) {
      speech.title = 'Poco saludable';
        speech.description1 = "Tus hábitos alimentarios presentan riesgos para tu salud. Es importante que prestes mayor atención a tus comidas para hacerlas más saludables. ¡No te estreses! Esta situación se puede revertir. ¡Ánimo!";
    }
    if (valueIndice > 80) {
      speech.title = 'Muy poco saludable';
        speech.description1 = "Tus hábitos alimentarios son muy riesgosos para tu salud. Recuerda que cambiar hábitos alimentarios lleva tiempo y esfuerzo, pero con determinación y paciencia, puedes lograr tus objetivos. ¡Ánimo y sigue adelante!";
    }
    return speech
  }

}