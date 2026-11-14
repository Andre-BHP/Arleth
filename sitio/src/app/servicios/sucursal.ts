import sucursalesJson from '../../datos/sucursales.json';
import { NUMEROS } from '../../entornos/numeros';

export interface Horario { dias: number[]; abre: string; cierra: string; }

export interface Sucursal {
  id: string;
  nombre: string;
  direccion: string;
  cp: string;
  ciudad: string;
  estado: string;
  telefono: string;
  whatsapp: string | null;
  horario: Horario[] | null;
  horarioTexto: string;
  mapa: string;
}

export const SUCURSAL: Sucursal = {
  ...(sucursalesJson as unknown as { sucursales: Omit<Sucursal, 'telefono' | 'whatsapp'>[] }).sucursales[0],
  telefono: NUMEROS.telefono,
  whatsapp: NUMEROS.whatsapp,
};
export const CONTACTO: Record<string, string> = {
  ...(sucursalesJson as unknown as { contacto: Record<string, string> }).contacto,
  correo: NUMEROS.correo,
  whatsappEnCasa: NUMEROS.whatsappEnCasa,
};

/** Enlace de WhatsApp con mensaje prellenado. */
export function whatsapp(numero: string, mensaje: string): string {
  return `https://wa.me/52${numero}?text=${encodeURIComponent(mensaje)}`;
}

export const telefonoLegible = (t: string) => `${t.slice(0, 2)} ${t.slice(2, 6)} ${t.slice(6)}`;
