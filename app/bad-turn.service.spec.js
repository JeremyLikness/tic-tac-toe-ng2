"use strict";
var testing_1 = require('@angular/core/testing');
var bad_turn_service_1 = require('./bad-turn.service');
testing_1.describe('Bad Turn Service', function () {
    testing_1.beforeEachProviders(function () { return [bad_turn_service_1.BadTurnService]; });
    testing_1.it('should return a quote when getBadTurn is called', testing_1.inject([bad_turn_service_1.BadTurnService], function (service) {
        var quote = service.getBadTurn();
        testing_1.expect(quote).toBeDefined();
        testing_1.expect(quote.length).toBeTruthy();
        testing_1.expect(typeof quote).toBe("string");
    }));
    testing_1.it('should return all quotes', testing_1.inject([bad_turn_service_1.BadTurnService], function (service) {
        var test = {};
        for (var idx = 0; idx < service.quotes.length; idx += 1) {
            test[service.quotes[idx]] = false;
        }
        var i = 1000, done = false;
        while (i > 0 && !done) {
            test[service.getBadTurn()] = true;
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
//# sourceMappingURL=bad-turn.service.spec.js.map