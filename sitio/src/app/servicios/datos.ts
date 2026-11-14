import menuJson from '../../datos/menu.json';
export * from './sucursal';

export type Etiqueta = 'favorito' | 'nuevo' | 'picante' | 'crudo' | 'ninos' | 'artesanal';

export interface Precio { t: string; v: number; }

export interface Platillo {
  id: string;
  nombre: string;
  desc?: string;
  precios: Precio[];
  tags: Etiqueta[];
  foto?: string;
  favoritaBebida?: boolean;
}

export interface Seccion { titulo?: string; nota?: string; items: Platillo[]; }

export interface Categoria {
  id: string;
  nombre: string;
  titulo: string;
  nota?: string;
  secciones: Seccion[];
}

/** `evidencia` es nota interna para el restaurante; en pantalla solo va la `cita` corta con su fuente. */
export interface Favorito { id: string; rango: number; evidencia: string; cita?: { texto: string; fuente: string } }

interface MenuDatos {
  favoritos: Favorito[];
  categorias: Categoria[];
  enCasa: { nota: string; grupos: { titulo: string; items: { nombre: string; desc?: string; v: number }[] }[] };
}

const menu = menuJson as unknown as MenuDatos;
const favIds = new Set(menu.favoritos.map((f) => f.id));

/** Categorías con la etiqueta "favorito" añadida a los platillos que la merecen. */
export const CATEGORIAS: Categoria[] = menu.categorias.map((c) => ({
  ...c,
  secciones: c.secciones.map((s) => ({
    ...s,
    items: s.items.map((p) => (favIds.has(p.id) ? { ...p, tags: ['favorito', ...p.tags] as Etiqueta[] } : p)),
  })),
}));

export const PLATILLOS: Platillo[] = CATEGORIAS.flatMap((c) => c.secciones.flatMap((s) => s.items));
const porId = new Map(PLATILLOS.map((p) => [p.id, p]));
export const platillo = (id: string): Platillo => porId.get(id)!;

export const FAVORITOS = menu.favoritos
  .slice()
  .sort((a, b) => a.rango - b.rango)
  .map((f) => ({ ...f, platillo: platillo(f.id) }));

export const NOVEDADES = PLATILLOS.filter((p) => p.tags.includes('nuevo')).sort((a, b) => Number(!!b.foto) - Number(!!a.foto));
export const EN_CASA = menu.enCasa;


export const NOMBRE_ETIQUETA: Record<Etiqueta, string> = {
  favorito: 'Favorito',
  nuevo: 'Nuevo',
  picante: 'Picante',
  crudo: 'Curado en limón',
  ninos: 'Para niños',
  artesanal: 'Artesanal',
};

export const pesos = (v: number) => `$${v.toLocaleString('es-MX')}`;

