import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CryptoExchangeService } from './services/crypto-exchange.service';
import { CryptoFavoritesService } from './services/crypto-favorites.service';
import { FavoriteCrypto } from './models/favorite-crypto';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/interval';

const EXCHANGE_REFRESH_INTERVAL = 10000;
const RATE_LIMIT_THRESHOLD = 3600 / 5750 * 1000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private cryptos$: Observable<Iterable<FavoriteCrypto>>;

  constructor(
    private exchangeService: CryptoExchangeService,
    private favoritesService: CryptoFavoritesService
  ) {
    const timer$ = Observable.interval( EXCHANGE_REFRESH_INTERVAL )
      .startWith( 0 );

    const favoritesChanges$ = favoritesService.cryptos$;

    const exchangeRateData$ = Observable.combineLatest(
      favoritesChanges$,
      timer$
    )
    .debounceTime( RATE_LIMIT_THRESHOLD )
    .map( ( [ favs ] ) => Array.from( favs ) )
    .map( favs => favs.map( crypto => crypto.symbol ) )
    .filter( favs => favs.length > 0 )
    .switchMap( favs => exchangeService.getExchangeRateBTC( favs ) );

    this.cryptos$ = exchangeRateData$
    .withLatestFrom( favoritesChanges$ )
    .map( ( [ exchange, favs ] ) => Array.from( favs )
      .map( ( crypto: FavoriteCrypto ) => {
        const exchangeInfo = exchange[ crypto.symbol ]
        return {
          ... crypto,
          exchangeRate: exchangeInfo ? exchangeInfo.BTC : 0
        }
      } ) );
  }

  onAddFavorite( crypto: FavoriteCrypto ) {
    this.favoritesService.addCrypto( crypto );
  }

  onRemoveFavorite( crypto: FavoriteCrypto ) {
    this.favoritesService.removeCrypto( crypto );
  }
}
