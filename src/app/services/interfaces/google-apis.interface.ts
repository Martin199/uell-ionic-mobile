export interface IAddressValidationResult {
  isValid: boolean; // Indica si la dirección es válida
  userAddress: string; // La dirección ingresada por el usuario
  suggestedAddress?: string; // La dirección sugerida por Google (si existe)
  locationType?: string; // Tipo de ubicación (ROOFTOP, APPROXIMATE, RANGE_INTERPOLATED, etc.)
  coordinates?: { lat: number; lng: number }; // Coordenadas geográficas
  addressComponents?: IAddressComponent[]; // Componentes de la dirección (calle, número, ciudad, etc.)
  message?: string; // Mensaje para el usuario (por ejemplo, "Dirección no encontrada")
}
interface IAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}