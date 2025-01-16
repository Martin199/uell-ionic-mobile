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
        speech.description1 = "¡Felicitaciones por tus fortalezas!",
        speech.description2 = "Es un gran logro que gracias a tu flexibilidad y positividad te hayas adaptado tan bien en esta época llena de cambios.",
        speech.descriptionOptions = "No te olvides de seguir:",
        speech.options = ["Trabajando tu autoestima.", "Mejorando el manejo del estrés.", "Fortaleciendo tus relaciones sociales.", "Dedica tiempo a las actividades que te relajan y te hacen sentir bien."],
        speech.description3 = "¡Continua así y vamos por más!"
    }
    if (valueIndice >= 16 && valueIndice <= 30) {
      speech.title = 'Bienestar Moderado',
        speech.titleRange = '16-30',
        speech.description1 = "Ya incorporaste algunos hábitos saludables, ¡Siempre podés crecer y mejorar tu calidad de vida!",
        speech.description2 = "Desde el equipo Uell Bienestar te animamos a fortalecer algunas áreas para vivir mejor cada día.",
        speech.descriptionOptions = "No te olvides de seguir:",
        speech.options = ["Ejercitándote con regularidad.", "Limitando el consumo de alimentos procesados, azúcares y grasas saturadas.", "Mejorando el manejo del estrés.", "Fortaleciendo tus relaciones sociales."],
        speech.description3 = "¡Sigamos trabajando juntos!"
    }
    if (valueIndice >= 31 && valueIndice <= 60) {
      speech.title = 'Salud Psicosocial Afectada',
        speech.titleRange = '31-60',
        speech.description1 = "Entendemos que estás atravesando un momento en el que tu bienestar necesita más atención. Queremos ayudarte a transformar y mejorar tu calidad de vida.",
        speech.description2 = "Nuestros Nuestras Gestoras de Bienestar te acompañan a realizar cambios hacia una vida más feliz.",
        speech.descriptionOptions = "No te olvides de seguir:",
        speech.options = ["Encuentra un ejercicio que te guste y que puedas incorporar a tu rutina diaria.", "Dormí lo suficiente.", "Sigue una dieta saludable.", "Encuentra actividades que te relajen y te hagan sentir bien."],
        speech.description3 = "¡Es el principio del cambio! ¡Comencemos!"
    }
    if (valueIndice > 60) {
      speech.title = 'Salud Psicosocial en Riesgo',
        speech.titleRange = '61-100',
        speech.description1 = "Sabemos que atravesar momentos difíciles no es sencillo, estamos aquí para ayudarte a mejorar tu calidad de vida.",
        speech.description2 = "Nuestro equipo de profesionales está listo para brindarte nuevas herramientas y apoyo.",
        speech.description3 = "¡No dudes en contactarnos, nunca es tarde para ocuparnos de nosotros mismos!"
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
        speech.description1 = "¡Felicidades por tus fortalezas!",
        speech.description2 = "Es un gran logro que, gracias a tu flexibilidad y positividad, te hayas adaptado tan bien en esta época llena de cambios.",
        speech.descriptionOptions = "No olvides seguir:",
        speech.options = ["Trabajando en tu autoestima.", "Mejorando el manejo del estrés.", "Fortaleciendo tus relaciones sociales.", "Dedicando tiempo a las actividades que te relajan y te hacen sentir bien."],
        speech.description3 = "¡Continúa así y vamos por más!"
    }
    if (valueIndice >= 16 && valueIndice <= 30) {
      speech.title = 'Bienestar Moderado',
        speech.titleRange = '16-30',
        speech.description1 = "¡Felicidades por haber incorporado ya algunos hábitos saludables! Recuerda que siempre hay espacio para crecer y mejorar tu calidad de vida.",
        speech.descriptionOptions = "El equipo de Uell Bienestar te anima a fortalecer algunas áreas para que puedas vivir mejor cada día. Te recomendamos:",
        speech.options = ["Realizar ejercicio con regularidad.", "Limitar el consumo de alimentos procesados, azúcares y grasas saturadas.", "Mejorar el manejo del estrés.", "Fortalecer tus relaciones sociales."],
        speech.description3 = "¡Sigamos trabajando juntos por tu bienestar!"

    }
    if (valueIndice >= 31 && valueIndice <= 60) {
      speech.title = 'Salud Psicosocial Afectada',
        speech.titleRange = '31-60',
        speech.description1 = "Comprendemos que estás atravesando un momento en el que tu bienestar requiere mayor atención. Nos encontramos aquí para ayudarte a transformar y mejorar tu calidad de vida.",
        speech.description2 = "Nuestras Gestoras de Bienesta te acompañarán en el proceso de realizar cambios para alcanzar una vida más plena y feliz.",
        speech.descriptionOptions = "Con el objetivo de seguir impulsando tu bienestar, te sugerimos:",
        speech.options = ["Identificar un ejercicio que te motive y puedas integrar a tu rutina diaria.", "Lograr un descanso adecuado.", "Mantener una dieta saludable.", "Descubrir actividades que te proporcionen relajación y bienestar."],
        speech.description3 = "¡Este es el inicio del cambio! ¡Comencemos juntos!"
    }
    if (valueIndice > 60) {
      speech.title = 'Salud Psicosocial en Riesgo',
        speech.titleRange = '61-100',
        speech.description1 = "Somos conscientes de que atravesar momentos difíciles no es sencillo. Por eso, estamos aquí para ayudarte a mejorar tu calidad de vida.",
        speech.description2 = "Nuestro equipo de Gestoras de Bienestar está dispuesto a brindarte apoyo y nuevas herramientas que te permitirán alcanzar el mejor estado de bienestar posible.",
        speech.description3 = "No dudes en contactarnos. ¡Nunca es tarde para ocuparnos de nosotros mismos!"
    }
    return speech
  }

}