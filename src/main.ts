import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {TicTacToeNg2AppComponent, environment} from './app/';
import {MatrixService} from './app/matrix.service';

if (environment.production) {
  enableProdMode();
}

bootstrap(TicTacToeNg2AppComponent, [MatrixService]);
