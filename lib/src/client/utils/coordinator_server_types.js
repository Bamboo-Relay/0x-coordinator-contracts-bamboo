"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CoordinatorServerError = /** @class */ (function (_super) {
    __extends(CoordinatorServerError, _super);
    function CoordinatorServerError(message, approvedOrders, cancellations, errors) {
        var _this = _super.call(this) || this;
        _this.approvedOrders = [];
        _this.cancellations = [];
        _this.message = message;
        _this.approvedOrders = approvedOrders;
        _this.cancellations = cancellations;
        _this.errors = errors;
        return _this;
    }
    return CoordinatorServerError;
}(Error));
exports.CoordinatorServerError = CoordinatorServerError;
var CoordinatorServerErrorMsg;
(function (CoordinatorServerErrorMsg) {
    CoordinatorServerErrorMsg["CancellationFailed"] = "Failed to cancel with some coordinator server(s). See errors for more info. See cancellations for successful cancellations.";
    CoordinatorServerErrorMsg["FillFailed"] = "Failed to obtain approval signatures from some coordinator server(s). See errors for more info. Current transaction has been abandoned but you may resubmit with only approvedOrders (a new ZeroEx transaction will have to be signed).";
})(CoordinatorServerErrorMsg = exports.CoordinatorServerErrorMsg || (exports.CoordinatorServerErrorMsg = {}));
//# sourceMappingURL=coordinator_server_types.js.map