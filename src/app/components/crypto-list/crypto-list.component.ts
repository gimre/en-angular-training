
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Crypto } from '../../models/crypto';

@Component({
  selector: 'crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CryptoListComponent {
  @Input( ) items: Observable<Iterable<Crypto>>;
  @Output( ) removedFavorite = new EventEmitter<Crypto>( );

  removeFavorite( crypto: Crypto ) {
    this.removedFavorite.emit( crypto );
  }
}
