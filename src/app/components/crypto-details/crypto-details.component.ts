
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Crypto } from '../../models/crypto';

@Component({
  selector: 'crypto-details',
  templateUrl: './crypto-details.component.html',
  styleUrls: ['./crypto-details.component.css']
})
export class CryptoDetailsComponent {
  @Input() crypto: Crypto;

  getLogoUrl = ( ) => `./assets/icons/${ this.crypto.symbol.toLowerCase( ) }.svg`
}
