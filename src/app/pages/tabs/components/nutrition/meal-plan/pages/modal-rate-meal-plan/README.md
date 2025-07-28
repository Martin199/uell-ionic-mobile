# Modal Rate Meal Plan Component

Este componente permite a los usuarios valorar su plan de nutrición con estrellas y comentarios.

## Características

- Sistema de valoración con 5 estrellas
- Campo de comentarios opcional (máximo 500 caracteres)
- Validación de formulario
- Integración con el servicio de meal plan
- Diseño responsive y accesible

## Uso

### Importar el componente

```typescript
import { ModalRateMealPlanComponent } from './pages/modal-rate-meal-plan/modal-rate-meal-plan.component';
```

### Abrir el modal

```typescript
async openRatingModal() {
  await this.utilsService.presentModal(ModalRateMealPlanComponent, 'ion-modal-default', {
    data: {
      nutUserPlanId: this.mealPlanService.planId(),
    },
  }).then((res: any) => {
    if (res.data) {
      // La valoración se envió exitosamente
      console.log('Valoración enviada');
    }
  });
}
```

### Estructura de datos

```typescript
interface IRateMealPlanPayload {
  nutUserPlanId: number;
  valoration: number;
  comment: string;
}
```

## API

El componente utiliza el método `postNutritionPlanFeedback` del `MealPlanService` para enviar la valoración al backend.

### Endpoint
```
POST /nutrition-plan/feedback
```

### Payload
```json
{
  "userId": number,
  "nutUserPlanId": number,
  "valoration": number,
  "comment": string
}
```

## Estilos

El componente utiliza las variables CSS del tema de la aplicación:
- `--Neutral-GreyMedium`: Color del texto principal
- `--Neutral-GreyDark`: Color del texto secundario
- `--Primary-Blue`: Color del botón principal
- `--Neutral-GreyLight`: Color de bordes y elementos deshabilitados
- `--Neutral-White`: Color de fondo

## Dependencias

- `StarsRateComponent`: Componente de estrellas para valoración
- `MealPlanService`: Servicio para comunicación con el backend
- `UtilsService`: Servicio de utilidades para modales y toasts
- `ModalController`: Controlador de modales de Ionic 