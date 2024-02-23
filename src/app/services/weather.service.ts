import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environments } from 'src/environments/environments';


@Injectable({providedIn: 'root'})
export class WeatherService {

  private baseUrlLocal: string = environments.baseUrlLocalhost;
  private baseUrlRemote: string = environments.baseUrlOnline;
  private apiKey: string = environments.apiKey;

  constructor(private httpClient: HttpClient){}

    getDatosTiempoActual<T>(ciudad:string ): Observable<T[]>{
      return this.httpClient.get<T[]>(`${this.baseUrlRemote}/weather?q=${ciudad}&units=metric&APPID=${this.apiKey}`).pipe(
      tap((value) => {console.log(value);
      })
      );
    }
    getDatosTiempo3h5d<T>(ciudad:string ): Observable<T[]>{
      return this.httpClient.get<T[]>(`${this.baseUrlRemote}/forecast?q=${ciudad}&units=metric&APPID=${this.apiKey}`).pipe(
      tap((value) => {console.log(value);
      })
      );
    }
    getDatosTiempo1d16d<T>(ciudad:string ): Observable<T[]>{
      return this.httpClient.get<T[]>(`${this.baseUrlRemote}/forecast/daily?q=${ciudad}&units=metric&APPID=${this.apiKey}`).pipe(
      tap((value) => {console.log(value);
      })
      );
    }
    getDatosTiempo1h4d<T>(ciudad:string ): Observable<T[]>{
      return this.httpClient.get<T[]>(`${this.baseUrlRemote}/forecast/hourly?q=${ciudad}&units=metric&APPID=${this.apiKey}`).pipe(
      tap((value) => {console.log(value);
      })
      );
    }
  }
