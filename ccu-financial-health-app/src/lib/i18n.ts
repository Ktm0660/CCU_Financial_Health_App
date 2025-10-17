export type Locale = "en" | "es";
type Dict = Record<string, string>;

const en: Dict = {
  "app.title": "Connections Financial Wellness",
  "nav.home": "Home",
  "nav.assess": "Assessment",
  "nav.products": "Products",
  "nav.resources": "Resources",
  "nav.language": "Español",
  "hero.title": "Feel confident with your money.",
  "hero.subtitle": "Simple steps, transparent options, and caring guidance.",
  "cta.start": "Start your 3-minute checkup",
  "products.title": "Products & Services",
  "products.card.learn": "Learn more",
  "assess.title": "Quick Wellness Check",
  "assess.start": "Begin",
  "assess.next": "Next",
  "assess.submit": "See my plan",
  "assess.result.title": "Your Starting Point",
  "assess.result.cta": "See suggested steps",
  "footer.rights": "All rights reserved."
};

const es: Dict = {
  "app.title": "Bienestar Financiero de Connections",
  "nav.home": "Inicio",
  "nav.assess": "Evaluación",
  "nav.products": "Productos",
  "nav.resources": "Recursos",
  "nav.language": "English",
  "hero.title": "Siéntete con confianza con tu dinero.",
  "hero.subtitle": "Pasos sencillos, opciones transparentes y ayuda genuina.",
  "cta.start": "Comienza tu revisión de 3 minutos",
  "products.title": "Productos y Servicios",
  "products.card.learn": "Más información",
  "assess.title": "Chequeo Rápido",
  "assess.start": "Comenzar",
  "assess.next": "Siguiente",
  "assess.submit": "Ver mi plan",
  "assess.result.title": "Tu Punto de Partida",
  "assess.result.cta": "Ver pasos sugeridos",
  "footer.rights": "Todos los derechos reservados."
};

let current: Locale = "en";
export function setLocale(l: Locale) { current = l; }
export function getLocale(): Locale { return current; }
export function t(key: string): string {
  const dict = current === "es" ? es : en;
  return dict[key] ?? key;
}
