"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var _1 = require('./app/');
var matrix_service_1 = require('./app/matrix.service');
if (_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.bootstrap(_1.TicTacToeNg2AppComponent, [matrix_service_1.MatrixService]);
//# sourceMappingURL=main.js.map