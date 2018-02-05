
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Crypto } from '../../models/crypto';
import { FavoriteCrypto } from '../../models/favorite-crypto';
import { CryptoFavoritesService } from '../../services/crypto-favorites.service';

@Component({
  selector: 'crypto-add',
  templateUrl: './crypto-add.component.html',
  styleUrls: ['./crypto-add.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CryptoAddComponent implements AfterViewInit {

  @Output( ) addedFavorite = new EventEmitter<FavoriteCrypto>( );
  @ViewChild( 'symbol' ) firstInput: ElementRef;

  private form: FormGroup

  constructor(
    private fb: FormBuilder
  ) {
    this.form = fb.group( {
      name: [ null ],
      symbol: [ null ]
    } );
  }

  addFavorite( ) {
    const raw = this.form.getRawValue( );
    this.addedFavorite.emit( {
      ... raw,
      favoritedAt: new Date,
      symbol: raw.symbol.toUpperCase( )
    } );

    this.form.reset( );
    this.firstInput.nativeElement.focus( );
  }

  ngAfterViewInit( ) {
    this.firstInput.nativeElement.focus( );
  }
}
