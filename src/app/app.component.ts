import { Component, OnInit } from '@angular/core';
import { Observable, interval, map, startWith } from 'rxjs';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'weatherApp';
  horaActual$!: Observable<string> ;
  proximosDias: string[] = [];
  inputValue: string = '';

  constructor(
    private weatherService:WeatherService,
  ){}

ngOnInit(): void {

  this.horaActual$ = interval(60000).pipe(
    // Emite un valor inicial para que se cargue al inicio de la aplicación
      startWith(0),
      map(() => {
        const fecha = new Date();
        const horas = fecha.getHours().toString().padStart(2, '0');
        const minutos = fecha.getMinutes().toString().padStart(2, '0');
        return `${horas}:${minutos}`;
      })
    );
    this.calcularProximosDias();
    console.log(this.proximosDias);

}
onEnterKeyPress(): void {
  if (this.inputValue.length >= 2) {
    this.weatherService.getDatosTiempo1d16d('Cáceres')
    .subscribe((datos) => {
      console.log(datos);
    });
  }
}
calcularProximosDias(): void {
  for (let i = 0; i < 7; i++) {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + i);
    this.proximosDias.push(fecha.toLocaleDateString('es-ES', { weekday: 'long' }));
  }
}
}
