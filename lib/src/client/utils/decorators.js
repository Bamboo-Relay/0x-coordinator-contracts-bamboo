"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var ContractError;
(function (ContractError) {
    ContractError["ContractNotDeployedOnChain"] = "CONTRACT_NOT_DEPLOYED_ON_CHAIN";
    ContractError["InsufficientAllowanceForTransfer"] = "INSUFFICIENT_ALLOWANCE_FOR_TRANSFER";
    ContractError["InsufficientBalanceForTransfer"] = "INSUFFICIENT_BALANCE_FOR_TRANSFER";
    ContractError["InsufficientEthBalanceForDeposit"] = "INSUFFICIENT_ETH_BALANCE_FOR_DEPOSIT";
    ContractError["InsufficientWEthBalanceForWithdrawal"] = "INSUFFICIENT_WETH_BALANCE_FOR_WITHDRAWAL";
    ContractError["InvalidJump"] = "INVALID_JUMP";
    ContractError["OutOfGas"] = "OUT_OF_GAS";
    ContractError["SubscriptionNotFound"] = "SUBSCRIPTION_NOT_FOUND";
    ContractError["SubscriptionAlreadyPresent"] = "SUBSCRIPTION_ALREADY_PRESENT";
    ContractError["ERC721OwnerNotFound"] = "ERC_721_OWNER_NOT_FOUND";
    ContractError["ERC721NoApproval"] = "ERC_721_NO_APPROVAL";
    ContractError["SignatureRequestDenied"] = "SIGNATURE_REQUEST_DENIED";
})(ContractError = exports.ContractError || (exports.ContractError = {}));
var constants = {
    INVALID_JUMP_PATTERN: 'invalid JUMP at',
    REVERT: 'revert',
    OUT_OF_GAS_PATTERN: 'out of gas',
    INVALID_TAKER_FORMAT: 'instance.taker is not of a type(s) string',
    METAMASK_USER_DENIED_SIGNATURE_PATTERN: 'User denied transaction signature',
    TRUST_WALLET_USER_DENIED_SIGNATURE_PATTERN: 'cancelled',
};
var contractCallErrorTransformer = function (error) {
    if (_.includes(error.message, constants.INVALID_JUMP_PATTERN)) {
        return new Error(ContractError.InvalidJump);
    }
    if (_.includes(error.message, constants.OUT_OF_GAS_PATTERN)) {
        return new Error(ContractError.OutOfGas);
    }
    if (_.includes(error.message, constants.REVERT)) {
        var revertReason = error.message.split(constants.REVERT)[1].trim();
        return new Error(revertReason);
    }
    return error;
};
var schemaErrorTransformer = function (error) {
    if (_.includes(error.message, constants.INVALID_TAKER_FORMAT)) {
        var errMsg = 'Order taker must be of type string. If you want anyone to be able to fill an order - pass NULL_ADDRESS';
        return new Error(errMsg);
    }
    return error;
};
var signatureRequestErrorTransformer = function (error) {
    if (_.includes(error.message, constants.METAMASK_USER_DENIED_SIGNATURE_PATTERN) ||
        _.includes(error.message, constants.TRUST_WALLET_USER_DENIED_SIGNATURE_PATTERN)) {
        var errMsg = ContractError.SignatureRequestDenied;
        return new Error(errMsg);
    }
    return error;
};
/**
 * Source: https://stackoverflow.com/a/29837695/3546986
 */
var asyncErrorHandlerFactory = function (errorTransformer) {
    var asyncErrorHandlingDecorator = function (_target, _key, descriptor) {
        var originalMethod = descriptor.value;
        // Do not use arrow syntax here. Use a function expression in
        // order to use the correct value of `this` in this method
        // tslint:disable-next-line:only-arrow-functions
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var result, error_1, transformedError;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, originalMethod.apply(this, args)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                        case 2:
                            error_1 = _a.sent();
                            transformedError = errorTransformer(error_1);
                            throw transformedError;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return descriptor;
    };
    return asyncErrorHandlingDecorator;
};
var syncErrorHandlerFactory = function (errorTransformer) {
    var syncErrorHandlingDecorator = function (_target, _key, descriptor) {
        var originalMethod = descriptor.value;
        // Do not use arrow syntax here. Use a function expression in
        // order to use the correct value of `this` in this method
        // tslint:disable-next-line:only-arrow-functions
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            try {
                var result = originalMethod.apply(this, args); // tslint:disable-line:no-invalid-this
                return result;
            }
            catch (error) {
                var transformedError = errorTransformer(error);
                throw transformedError;
            }
        };
        return descriptor;
    };
    return syncErrorHandlingDecorator;
};
// _.flow(f, g) = f ∘ g
var zeroExErrorTransformer = _.flow(schemaErrorTransformer, contractCallErrorTransformer, signatureRequestErrorTransformer);
exports.decorators = {
    asyncZeroExErrorHandler: asyncErrorHandlerFactory(zeroExErrorTransformer),
    syncZeroExErrorHandler: syncErrorHandlerFactory(zeroExErrorTransformer),
};
//# sourceMappingURL=decorators.js.map