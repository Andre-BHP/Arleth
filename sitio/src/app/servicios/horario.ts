import { Injectable, PLATFORM_ID, afterNextRender, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Horario, SUCURSAL } from './sucursal';

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

interface Ahora { dia: number; minutos: number; }

function ahoraEnGuadalajara(): Ahora {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Mexico_City',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const v = (t: string) => partes.find((p) => p.type === t)?.value ?? '0';
  const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(v('weekday'));
  return { dia, minutos: Number(v('hour')) * 60 + Number(v('minute')) };
}

const aMin = (h: string) => Number(h.slice(0, 2)) * 60 + Number(h.slice(3));

export interface EstadoHorario {
  abierto: boolean;
  texto: string;
}

/** Calcula "abierto ahora" solo en el navegador; en el prerender devuelve null. */
@Injectable({ providedIn: 'root' })
export class HorarioServicio {
  private readonly ahora = signal<Ahora | null>(null);

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      afterNextRender(() => {
        this.ahora.set(ahoraEnGuadalajara());
        setInterval(() => this.ahora.set(ahoraEnGuadalajara()), 60_000);
      });
    }
  }

  readonly estado = computed<EstadoHorario | null>(() => {
    const a = this.ahora();
    const horario = SUCURSAL.horario;
    if (!a || !horario) return null;
    return calcular(horario, a);
  });
}

function turno(horario: Horario[], dia: number) {
  return horario.find((h) => h.dias.includes(dia));
}

function calcular(horario: Horario[], a: Ahora): EstadoHorario {
  const hoy = turno(horario, a.dia);
  if (hoy && a.minutos >= aMin(hoy.abre) && a.minutos < aMin(hoy.cierra)) {
    return { abierto: true, texto: `Abierto hoy ${hoy.abre}–${hoy.cierra}` };
  }
  if (hoy && a.minutos < aMin(hoy.abre)) {
    return { abierto: false, texto: `Cerrado · abre hoy a las ${hoy.abre}` };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (a.dia + i) % 7;
    const t = turno(horario, d);
    if (t) {
      const cuando = i === 1 ? 'mañana' : `el ${DIAS[d]}`;
      return { abierto: false, texto: `Cerrado · abre ${cuando} a las ${t.abre}` };
    }
  }
  return { abierto: false, texto: 'Cerrado' };
}
