import {beforeEachProviders, it, describe, expect, inject} from '@angular/core/testing';
import {BadTurnService} from './bad-turn.service';

describe('Bad Turn Service', () => {
  beforeEachProviders(() => [BadTurnService]);

  it('should return a quote when getBadTurn is called',
     inject([BadTurnService], (service: BadTurnService) => {
       var quote = service.getBadTurn();
       expect(quote).toBeDefined();
       expect(quote.length).toBeTruthy();
       expect(typeof quote).toBe("string");
     }));

  it('should return all quotes', inject([BadTurnService], (service: BadTurnService) => {
       var test: {[quote: string]: boolean} = {};
       for (let idx = 0; idx < service.quotes.length; idx += 1) {
         test[service.quotes[idx]] = false;
       }
       let i = 100;
       while (i > 0) {
         test[service.getBadTurn()] = true;
         i -= 1;
       }
       for (let quoteTest in test) {
         expect(test[quoteTest]).toBe(true);
       }
     }));
});
