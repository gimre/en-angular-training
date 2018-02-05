import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const BASE_URI = 'https://min-api.cryptocompare.com/data/pricemulti';

@Injectable()
export class CryptoExchangeService {
  constructor(
    private http: HttpClient
  ) { }

  getExchangeRateBTC( symbols: Array<string> ): Observable<any> {
    return this.http.get( `${ BASE_URI }?fsyms=${ symbols.join( ) }&tsyms=BTC`);
  }
}
