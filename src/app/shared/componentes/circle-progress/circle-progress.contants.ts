export interface CircleTheme {
  colors: string[];
  ranges: number[];
}

//AGREGAR ACÁ LOS RANGOS Y COLORES PARA UTILIZAR CIRCLEPROGRESS
export const CIRCLE_THEMES: Record<string, CircleTheme> = {
  isps: {
    colors: ['#63e4a7', '#b982de', '#fcd885', '#ec6666'],
    ranges: [16, 30, 60, 100],
  },
  nutrition: {
    colors: ['#63e4a7', '#fbd06d', '#ECA666', '#ec6666'],
    ranges: [30, 55, 80, 100],
  },
};