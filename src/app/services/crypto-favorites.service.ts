import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Crypto } from '../models/crypto';
import { FavoriteCrypto } from '../models/favorite-crypto';

const cacheStorage = new Proxy( {
  __kv: {
    'BTC': {
        favoritedAt: Date.now( ),
        name: 'Bitcoin',
        symbol: 'btc'
    },
    'XRP': {
        favoritedAt: Date.now( ),
        name: 'Ripple',
        symbol: 'xrp'
    }
  },
  getItem: ( key ) => cacheStorage.__kv[ key ],
  setItem: ( key, value ) => cacheStorage.__kv[ key ] = value
}, {
  ownKeys: ( target ) => Object.keys( target.__kv ),
  getOwnPropertyDescriptor: ( ) => ( {
    enumerable: true,
    configurable: true,
  } )
} );

@Injectable()
export class CryptoFavoritesService {

  public cryptos$: BehaviorSubject<Iterable<FavoriteCrypto>>

  constructor( ) {
    this.cryptos$ = new BehaviorSubject( this.getStoredData( ) );
  }

  addCrypto( crypto: Crypto ) {
    localStorage.setItem( crypto.symbol.toLowerCase( ), JSON.stringify( crypto ) );
    this.cryptos$.next( this.getStoredData( ) );
  }

  removeCrypto( crypto: Crypto ) {
    localStorage.removeItem( crypto.symbol.toLowerCase( ) );
    this.cryptos$.next( this.getStoredData( ) );
  }

  private getStoredData( ) {
    return Object.keys( localStorage )
      .map( key => localStorage.getItem( key ) )
      .map( json => JSON.parse( json ) as FavoriteCrypto );
  }
}
