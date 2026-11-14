import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icono } from './icono';
import { CONTACTO, SUCURSAL } from '../servicios/sucursal';
import { Contacto } from '../servicios/contacto';
import { Ola } from './ola';
import { Concha } from './concha';

@Component({
  selector: 'app-pie',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icono, Ola, Concha],
  template: `
    <app-ola color="var(--azul-hondo)" [volteada]="true" />
    <footer class="madera">
      <div class="envoltura rejilla">
        <div class="firma">
          <app-concha class="concha-pie" />
          <p class="nombre">Boca del Cielo</p>
          <p class="lema pincel">antojitos del mar</p>
          <p class="aviso">Prototipo no oficial de rediseño. No es el sitio de Boca del Cielo ni recibe pedidos. Fotos y marca pertenecen al restaurante.</p>
        </div>

        <div>
          <h2>Chapultepec</h2>
          <address>
            {{ s.direccion }}<br />
            C.P. {{ s.cp }}, {{ s.ciudad }}, {{ s.estado }}
          </address>
          <p class="dato">{{ s.horarioTexto }}</p>
        </div>

        <div>
          <h2>Contacto</h2>
          <ul class="enlaces">
            <li><a [href]="k.hrefTelefono(s.telefono)" (click)="k.alClicTelefono($event)"><app-icono nombre="telefono" /><span class="dato">{{ k.telefonoVisible(s.telefono) }}</span></a></li>
            <li><a [href]="k.hrefWhatsapp(s.whatsapp!, mensaje)" (click)="k.alClicWhatsapp($event, mensaje)" target="_blank" rel="noopener"><app-icono nombre="whatsapp" /><span class="dato">{{ k.demo ? 'WhatsApp' : k.telefonoVisible(s.whatsapp!) }}</span></a></li>
            @if (!k.demo) {
              <li><a [href]="'mailto:' + c['correo']"><app-icono nombre="correo" /><span>{{ c['correo'] }}</span></a></li>
            }
          </ul>
        </div>

        <div>
          <h2>Síguenos</h2>
          <ul class="enlaces">
            <li><a [href]="c['instagram']" target="_blank" rel="noopener"><app-icono nombre="instagram" /><span>Instagram</span></a></li>
            <li><a [href]="c['facebook']" target="_blank" rel="noopener"><app-icono nombre="facebook" /><span>Facebook</span></a></li>
          </ul>
          <ul class="enlaces menor">
            <li><a routerLink="/menu">Menú completo</a></li>
          </ul>
        </div>
      </div>
      <div class="envoltura base dato">
        <span>© Boca del Cielo</span>
        <span>Precios en pesos mexicanos, en el local. Pueden cambiar sin aviso.</span>
      </div>
    </footer>
  `,
  styles: `
    :host { display: block; }
    footer { background-color: var(--azul-hondo); padding: var(--e-7) 0 var(--e-4); }
    .rejilla { display: grid; gap: var(--e-6) var(--e-5); grid-template-columns: 1.4fr repeat(3, 1fr); }
    .concha-pie { --concha: 2.75rem; color: var(--azul-texto); margin-bottom: var(--e-3); }
    .nombre { font: 400 clamp(2.5rem, 2rem + 2vw, 3.5rem)/0.9 var(--f-nombre); }
    .lema { font-size: 1.6rem; color: var(--azul-texto); margin-top: 0.1em; }
    .aviso { margin-top: var(--e-4); font-size: var(--t-xs); color: var(--azul-texto); max-width: 32ch; }
    h2 { font: 400 1.35rem/1 var(--f-nombre); letter-spacing: 0.04em; margin-bottom: var(--e-3); color: var(--azul-texto); }
    address { font-style: normal; color: var(--azul-texto); margin-bottom: var(--e-2); }
    p.dato { font-size: var(--t-xs); color: var(--azul-texto); }
    .enlaces { display: grid; gap: var(--e-2); }
    .enlaces a { display: inline-flex; align-items: center; gap: 0.55rem; text-decoration: none; color: var(--papel); }
    .enlaces a:hover span { text-decoration: underline; }
    .menor { margin-top: var(--e-4); font-size: var(--t-s); }
    .menor a { color: var(--azul-texto); }
    .base {
      display: flex; flex-wrap: wrap; justify-content: space-between; gap: var(--e-2) var(--e-4);
      margin-top: var(--e-7); padding-top: var(--e-4); border-top: 1px solid rgb(246 239 227 / 0.12);
      font-size: var(--t-xs); color: var(--azul-texto);
    }
    @media (max-width: 60rem) { .rejilla { grid-template-columns: 1fr 1fr; } .firma { grid-column: 1 / -1; } }
    @media (max-width: 34rem) { .rejilla { grid-template-columns: 1fr; } }
  `,
})
export class Pie {
  protected readonly s = SUCURSAL;
  protected readonly c = CONTACTO;
  protected readonly k = inject(Contacto);
  protected readonly mensaje = 'Hola, tengo una pregunta.';
}
