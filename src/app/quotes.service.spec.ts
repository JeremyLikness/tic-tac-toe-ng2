import {beforeEachProviders, it, describe, expect, inject} from '@angular/core/testing';
import {QuotesService} from './quotes.service';

describe('Quotes Service', () => {
  beforeEachProviders(() => [QuotesService]);

  it('should return a quote when getQuotes is called',
     inject([QuotesService], (service: QuotesService) => {

       var quote = service.getQuote();

       expect(quote).toBeDefined();
       expect(quote.length).toBeTruthy();
       expect(typeof quote).toBe("string");

     }));

  it('should return all quotes', inject([QuotesService], (service: QuotesService) => {

       var test: {[quote: string]: boolean} = {};

       for (let idx = 0; idx < service.quotes.length; idx += 1) {
         test[service.quotes[idx]] = false;
       }

       let i = 1000, done = false;
       while (i > 0 && !done) {
         test[service.getQuote()] = true;
         done = true;
         for (let quoteTest in test) {
           done = done && test[quoteTest];
         }
         i -= 1;
       }

       for (let quoteTest in test) {
         expect(test[quoteTest]).toBe(true);
       }

     }));
});
