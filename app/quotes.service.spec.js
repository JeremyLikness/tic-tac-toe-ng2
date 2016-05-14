"use strict";
var testing_1 = require('@angular/core/testing');
var quotes_service_1 = require('./quotes.service');
testing_1.describe('Quotes Service', function () {
    testing_1.beforeEachProviders(function () { return [quotes_service_1.QuotesService]; });
    testing_1.it('should return a quote when getQuotes is called', testing_1.inject([quotes_service_1.QuotesService], function (service) {
        var quote = service.getQuote();
        testing_1.expect(quote).toBeDefined();
        testing_1.expect(quote.length).toBeTruthy();
        testing_1.expect(typeof quote).toBe("string");
    }));
    testing_1.it('should return all quotes', testing_1.inject([quotes_service_1.QuotesService], function (service) {
        var test = {};
        for (var idx = 0; idx < service.quotes.length; idx += 1) {
            test[service.quotes[idx]] = false;
        }
        var i = 1000, done = false;
        while (i > 0 && !done) {
            test[service.getQuote()] = true;
            done = true;
            for (var quoteTest in test) {
                done = done && test[quoteTest];
            }
            i -= 1;
        }
        for (var quoteTest in test) {
            testing_1.expect(test[quoteTest]).toBe(true);
        }
    }));
});
//# sourceMappingURL=quotes.service.spec.js.map