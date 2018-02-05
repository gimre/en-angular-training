import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CryptoDetailsComponent } from './components/crypto-details/crypto-details.component';
import { CryptoListComponent } from './components/crypto-list/crypto-list.component';
import { CryptoExchangeService } from './services/crypto-exchange.service';
import { CryptoFavoritesService } from './services/crypto-favorites.service';
import { CryptoAddComponent } from './components/crypto-add/crypto-add.component';


@NgModule({
  declarations: [
    AppComponent,
    CryptoDetailsComponent,
    CryptoListComponent,
    CryptoAddComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CryptoExchangeService,
    CryptoFavoritesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
