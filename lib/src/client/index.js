"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var contract_addresses_1 = require("@0x/contract-addresses");
var contracts_exchange_1 = require("@0x/contracts-exchange");
var contracts_test_utils_1 = require("@0x/contracts-test-utils");
var json_schemas_1 = require("@0x/json-schemas");
var order_utils_1 = require("@0x/order-utils");
var utils_1 = require("@0x/utils");
var web3_wrapper_1 = require("@0x/web3-wrapper");
var HttpStatus = require("http-status-codes");
var lodash_1 = require("lodash");
var artifacts_1 = require("../artifacts");
var wrappers_1 = require("../wrappers");
var assert_1 = require("./utils/assert");
var coordinator_server_types_1 = require("./utils/coordinator_server_types");
exports.CoordinatorServerErrorMsg = coordinator_server_types_1.CoordinatorServerErrorMsg;
var decorators_1 = require("./utils/decorators");
var CoordinatorFillFunctionStep;
(function (CoordinatorFillFunctionStep) {
    CoordinatorFillFunctionStep["RequestTakerSignature"] = "REQUEST_TAKER_SIGNATURE";
    CoordinatorFillFunctionStep["RequestCoordinatorSignature"] = "REQUEST_COORDINATOR_SIGNATURE";
    CoordinatorFillFunctionStep["RequestSubmitTransaction"] = "REQUEST_SUBMIT_TRANSACTION";
})(CoordinatorFillFunctionStep = exports.CoordinatorFillFunctionStep || (exports.CoordinatorFillFunctionStep = {}));
var DEFAULT_TX_DATA = {
    //gas: devConstants.GAS_LIMIT,
    gasPrice: new utils_1.BigNumber(1),
    value: new utils_1.BigNumber(150000),
};
// tx expiration time will be set to (now + default_approval - time_buffer)
var DEFAULT_APPROVAL_EXPIRATION_TIME_SECONDS = 90;
/**
 * This class includes all the functionality related to filling or cancelling orders through
 * the 0x V2 Coordinator extension contract.
 */
var CoordinatorClient = /** @class */ (function () {
    /**
     * Instantiate CoordinatorClient
     * @param web3Wrapper Web3Wrapper instance to use.
     * @param chainId Desired chainId.
     * @param address The address of the Coordinator contract. If undefined, will
     * default to the known address corresponding to the chainId.
     * @param exchangeAddress The address of the Exchange contract. If undefined, will
     * default to the known address corresponding to the chainId.
     * @param registryAddress The address of the CoordinatorRegistry contract. If undefined, will
     * default to the known address corresponding to the chainId.
     */
    function CoordinatorClient(address, provider, chainId, txDefaults, exchangeAddress, registryAddress) {
        this.abi = artifacts_1.artifacts.Coordinator.compilerOutput.abi;
        this._feeRecipientToEndpoint = {};
        this._txDefaults = DEFAULT_TX_DATA;
        this.chainId = chainId;
        var contractAddresses = contract_addresses_1.getContractAddressesForChainOrThrow(this.chainId);
        this.address = address === undefined ? contractAddresses.coordinator : address;
        this.exchangeAddress = exchangeAddress === undefined ? contractAddresses.exchange : exchangeAddress;
        this.registryAddress = registryAddress === undefined ? contractAddresses.coordinatorRegistry : registryAddress;
        this._web3Wrapper = new web3_wrapper_1.Web3Wrapper(provider);
        this._txDefaults = __assign({}, txDefaults, DEFAULT_TX_DATA);
        this._contractInstance = new wrappers_1.CoordinatorContract(this.address, this._web3Wrapper.getProvider(), this._web3Wrapper.getContractDefaults());
        this._registryInstance = new wrappers_1.CoordinatorRegistryContract(this.registryAddress, this._web3Wrapper.getProvider(), this._web3Wrapper.getContractDefaults());
        this._exchangeInstance = new contracts_exchange_1.ExchangeContract(this.exchangeAddress, this._web3Wrapper.getProvider(), this._web3Wrapper.getContractDefaults());
    }
    /**
     * Validates that the 0x transaction has been approved by all of the feeRecipients that correspond to each order in the transaction's Exchange calldata.
     * Throws an error if the transaction approvals are not valid. Will not detect failures that would occur when the transaction is executed on the Exchange contract.
     * @param transaction 0x transaction containing salt, signerAddress, and data.
     * @param txOrigin Required signer of Ethereum transaction calling this function.
     * @param transactionSignature Proof that the transaction has been signed by the signer.
     * @param approvalSignatures Array of signatures that correspond to the feeRecipients of each order in the transaction's Exchange calldata.
     */
    CoordinatorClient.prototype.assertValidCoordinatorApprovalsOrThrowAsync = function (transaction, txOrigin, transactionSignature, approvalSignatures) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, approvalSignatures_1, approvalSignatures_1_1, approvalSignature;
            return __generator(this, function (_b) {
                assert_1.assert.doesConformToSchema('transaction', transaction, json_schemas_1.schemas.zeroExTransactionSchema);
                assert_1.assert.isETHAddressHex('txOrigin', txOrigin);
                assert_1.assert.isHexString('transactionSignature', transactionSignature);
                try {
                    for (approvalSignatures_1 = __values(approvalSignatures), approvalSignatures_1_1 = approvalSignatures_1.next(); !approvalSignatures_1_1.done; approvalSignatures_1_1 = approvalSignatures_1.next()) {
                        approvalSignature = approvalSignatures_1_1.value;
                        assert_1.assert.isHexString('approvalSignature', approvalSignature);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (approvalSignatures_1_1 && !approvalSignatures_1_1.done && (_a = approvalSignatures_1.return)) _a.call(approvalSignatures_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return [2 /*return*/, this._contractInstance
                        .assertValidCoordinatorApprovals(transaction, txOrigin, transactionSignature, approvalSignatures)
                        .callAsync()];
            });
        });
    };
    /**
     * Fills a signed order with an amount denominated in baseUnits of the taker asset. Under-the-hood, this
     * method uses the `feeRecipientAddress` of the order to look up the coordinator server endpoint registered in the
     * coordinator registry contract. It requests an approval from that coordinator server before
     * submitting the order and approval as a 0x transaction to the coordinator extension contract. The coordinator extension
     * contract validates approvals and then fills the order via the Exchange contract.
     * @param   order                   An object that conforms to the Order interface.
     * @param   takerAssetFillAmount    The amount of the order (in taker asset baseUnits) that you wish to fill.
     * @param   signature               Signature corresponding to the order.
     * @param   txData                  Transaction data. The `from` field should be the user Ethereum address who would like
     *                                  to fill these orders. Must be available via the Provider supplied at instantiation.
     * @param   sendTxOpts              Optional arguments for sending the transaction.
     * @return  Transaction hash.
     */
    CoordinatorClient.prototype.fillOrderAsync = function (order, takerAssetFillAmount, signature, callback, timestamp, txData, sendTxOpts) {
        if (sendTxOpts === void 0) { sendTxOpts = { shouldValidate: true }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                assert_1.assert.doesConformToSchema('order', order, json_schemas_1.schemas.orderSchema);
                assert_1.assert.isValidBaseUnitAmount('takerAssetFillAmount', takerAssetFillAmount);
                return [2 /*return*/, this._executeTxThroughCoordinatorAsync(contracts_test_utils_1.ExchangeFunctionName.FillOrder, callback, timestamp, txData, sendTxOpts, [order], order, takerAssetFillAmount, signature)];
            });
        });
    };
    /**
     * Attempts to fill a specific amount of an order. If the entire amount specified cannot be filled,
     * the fill order is abandoned.
     * @param   order                   An object that conforms to the Order interface.
     * @param   takerAssetFillAmount    The amount of the order (in taker asset baseUnits) that you wish to fill.
     * @param   signature               Signature corresponding to the order.
     * @param   txData                  Transaction data. The `from` field should be the user Ethereum address who would like
     *                                  to fill these orders. Must be available via the Provider supplied at instantiation.
     * @param   sendTxOpts              Optional arguments for sending the transaction.
     * @return  Transaction hash.
     */
    CoordinatorClient.prototype.fillOrKillOrderAsync = function (order, takerAssetFillAmount, signature, callback, timestamp, txData, sendTxOpts) {
        if (sendTxOpts === void 0) { sendTxOpts = { shouldValidate: true }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                assert_1.assert.doesConformToSchema('order', order, json_schemas_1.schemas.orderSchema);
                assert_1.assert.isValidBaseUnitAmount('takerAssetFillAmount', takerAssetFillAmount);
                return [2 /*return*/, this._executeTxThroughCoordinatorAsync(contracts_test_utils_1.ExchangeFunctionName.FillOrKillOrder, callback, timestamp, txData, sendTxOpts, [order], order, takerAssetFillAmount, signature)];
            });
        });
    };
    /**
     * Batch version of fillOrderAsync. Executes multiple fills atomically in a single transaction.
     * If any `feeRecipientAddress` in the batch is not registered to a coordinator server through the CoordinatorRegistryContract, the whole batch fails.
     * @param   orders                  An array of orders to fill.
     * @param   takerAssetFillAmounts   The amounts of the orders (in taker asset baseUnits) that you wish to fill.
     * @param   signatures              Signatures corresponding to the orders.
     * @param   txData                  Transaction data. The `from` field should be the user Ethereum address who would like
     *                                  to fill these orders. Must be available via the Provider supplied at instantiation.
     * @param   sendTxOpts              Optional arguments for sending the transaction.
     * @return  Transaction hash.
     */
    CoordinatorClient.prototype.batchFillOrdersAsync = function (orders, takerAssetFillAmounts, signatures, callback, timestamp, txData, sendTxOpts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._batchFillAsync(contracts_test_utils_1.ExchangeFunctionName.BatchFillOrders, orders, takerAssetFillAmounts, signatures, callback, timestamp, txData, sendTxOpts)];
            });
        });
    };
    /**
     * No throw version of batchFillOrdersAsync
     * @param   orders                  An array of orders to fill.
     * @param   takerAssetFillAmounts   The amounts of the orders (in taker asset baseUnits) that you wish to fill.
     * @param   signatures              Signatures corresponding to the orders.
     * @param   txData                  Transaction data. The `from` field should be the user Ethereum address who would like
     *                                  to fill these orders. Must be available via the Provider supplied at instantiation.
     * @param   sendTxOpts              Optional arguments for sending the transaction.
     * @return  Transaction hash.
     */
    CoordinatorClient.prototype.batchFillOrdersNoThrowAsync = function (orders, takerAssetFillAmounts, signatures, callback, timestamp, txData, sendTxOpts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._batchFillAsync(contracts_test_utils_1.ExchangeFunctionName.BatchFillOrdersNoThrow, orders, takerAssetFillAmounts, signatures, callback, timestamp, txData, sendTxOpts)];
            });
        });
    };
    /**
     * Batch version of fillOrKillOrderAsync. Executes multiple fills atomically in a single transaction.
     * @param   orders                  An array of orders to fill.
     * @param   takerAssetFillAmounts   The amounts of the orders (in taker asset baseUnits) that you wish to fill.
     * @param   signatures              Signatures corresponding to the orders.
     * @param   txData                  Transaction data. The `from` field should be the user Ethereum address who would like
     *                                  to fill these orders. Must be available via the Provider supplied at instantiation.
     * @param   sendTxOpts              Optional arguments for sending the transaction.
     * @return  Transaction hash.
     */
    CoordinatorClient.prototype.batchFillOrKillOrdersAsync = function (orders, takerAssetFillAmounts, signatures, callback, timestamp, txData, sendTxOpts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._batchFillAsync(contracts_test_utils_1.ExchangeFunctionName.BatchFillOrKillOrders, orders, takerAssetFillAmounts, signatures, callback, timestamp, txData, sendTxOpts)];
            });
        });
    };
    /**
     * Executes multiple calls of fillOrder until total amount of makerAsset is bought by taker.
     * If any fill reverts, the error is caught and ignored. Finally, reverts if < makerAssetFillAmount has been bought.
     * NOTE: This function does not enforce that the makerAsset is the same for each order.
     * @param orders                Array of order specifications.
     * @param makerAssetFillAmount  Desired amount of makerAsset to buy.
     * @param signatures            Proofs that orders have been signed by makers.
     * @param txData                Transaction data. The `from` field should be the user Ethereum address who would like
     *                              to fill these orders. Must be available via the Provider supplied at instantiation.
     * @param sendTxOpts            Optional arguments for sending the transaction.
     * @return  Transaction hash.
     */
    CoordinatorClient.prototype.marketBuyOrdersFillOrKillAsync = function (orders, makerAssetFillAmount, signatures, callback, timestamp, txData, sendTxOpts) {
        if (sendTxOpts === void 0) { sendTxOpts = { shouldValidate: true }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._marketBuySellOrdersAsync(contracts_test_utils_1.ExchangeFunctionName.MarketBuyOrdersFillOrKill, orders, makerAssetFillAmount, signatures, callback, timestamp, txData, sendTxOpts)];
            });
        });
    };
    /**
     * No throw version of marketBuyOrdersFillOrKillAsync
     * @param   orders               An array of orders to fill.
     * @param   makerAssetFillAmount Maker asset fill amount.
     * @param   signatures           Signatures corresponding to the orders.
     * @param   txData               Transaction data. The `from` field should be the user Ethereum address who would like
     *                               to fill these orders. Must be available via the Provider supplied at instantiation.
     * @param   sendTxOpts           Optional arguments for sending the transaction.
     * @return  Transaction hash.
     */
    CoordinatorClient.prototype.marketBuyOrdersNoThrowAsync = function (orders, makerAssetFillAmount, signatures, callback, timestamp, txData, sendTxOpts) {
        if (sendTxOpts === void 0) { sendTxOpts = { shouldValidate: true }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._marketBuySellOrdersAsync(contracts_test_utils_1.ExchangeFunctionName.MarketBuyOrdersNoThrow, orders, makerAssetFillAmount, signatures, callback, timestamp, txData, sendTxOpts)];
            });
        });
    };
    /**
     * Executes multiple calls of fillOrder until total amount of takerAsset is sold by taker.
     * If any fill reverts, the error is caught and ignored. Finally, reverts if < takerAssetFillAmount has been sold.
     * NOTE: This function does not enforce that the takerAsset is the same for each order.
     * @param orders                 Array of order specifications.
     * @param takerAssetFillAmount   Desired amount of takerAsset to sell.
     * @param signatures             Proofs that orders have been signed by makers.
     * @param txData                 Transaction data. The `from` field should be the user Ethereum address who would like
     *                               to fill these orders. Must be available via the Provider supplied at instantiation.
     * @param sendTxOpts             Optional arguments for sending the transaction.
     * @return  Transaction hash.
     */
    CoordinatorClient.prototype.marketSellOrdersFillOrKillAsync = function (orders, takerAssetFillAmount, signatures, callback, timestamp, txData, sendTxOpts) {
        if (sendTxOpts === void 0) { sendTxOpts = { shouldValidate: true }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._marketBuySellOrdersAsync(contracts_test_utils_1.ExchangeFunctionName.MarketSellOrdersFillOrKill, orders, takerAssetFillAmount, signatures, callback, timestamp, txData, sendTxOpts)];
            });
        });
    };
    /**
     * No throw version of marketSellOrdersAsync
     * @param   orders               An array of orders to fill.
     * @param   takerAssetFillAmount Taker asset fill amount.
     * @param   signatures           Signatures corresponding to the orders.
     * @param   txData               Transaction data. The `from` field should be the user Ethereum address who would like
     *                               to fill these orders. Must be available via the Provider supplied at instantiation.
     * @param   sendTxOpts           Optional arguments for sending the transaction.
     * @return  Transaction hash.
     */
    CoordinatorClient.prototype.marketSellOrdersNoThrowAsync = function (orders, takerAssetFillAmount, signatures, callback, timestamp, txData, sendTxOpts) {
        if (sendTxOpts === void 0) { sendTxOpts = { shouldValidate: true }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._marketBuySellOrdersAsync(contracts_test_utils_1.ExchangeFunctionName.MarketSellOrdersNoThrow, orders, takerAssetFillAmount, signatures, callback, timestamp, txData, sendTxOpts)];
            });
        });
    };
    /**
     * No throw version of marketSellOrdersAsync
     * @param   orders               An array of orders to fill.
     * @param   takerAssetFillAmount Taker asset fill amount.
     * @param   signatures           Signatures corresponding to the orders.
     * @param   txData               Transaction data. The `from` field should be the user Ethereum address who would like
     *                               to fill these orders. Must be available via the Provider supplied at instantiation.
     * @param   sendTxOpts           Optional arguments for sending the transaction.
     * @return  Transaction hash.
     */
    CoordinatorClient.prototype.matchOrdersAsync = function (leftOrder, rightOrder, leftSignature, rightSignature, callback, timestamp, txData, sendTxOpts) {
        if (sendTxOpts === void 0) { sendTxOpts = { shouldValidate: true }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                assert_1.assert.doesConformToSchema('leftOrder', leftOrder, json_schemas_1.schemas.orderSchema);
                assert_1.assert.doesConformToSchema('rightOrder', rightOrder, json_schemas_1.schemas.orderSchema);
                return [2 /*return*/, this._executeTxThroughCoordinatorAsync(contracts_test_utils_1.ExchangeFunctionName.MatchOrders, callback, timestamp, txData, sendTxOpts, [leftOrder, rightOrder], leftOrder, rightOrder, leftSignature, rightSignature)];
            });
        });
    };
    /**
     * Cancels an order on-chain by submitting an Ethereum transaction.
     * @param   order       An object that conforms to the Order interface. The order you would like to cancel.
     * @param   txData      Transaction data. The `from` field should be the maker's Ethereum address. Must be available
     *                      via the Provider supplied at instantiation.
     * @param   sendTxOpts  Optional arguments for sending the transaction.
     * @return  Transaction hash.
     */
    CoordinatorClient.prototype.hardCancelOrderAsync = function (order, timestamp, txData, sendTxOpts) {
        if (sendTxOpts === void 0) { sendTxOpts = { shouldValidate: true }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                assert_1.assert.doesConformToSchema('order', order, json_schemas_1.schemas.orderSchema);
                return [2 /*return*/, this._executeTxThroughCoordinatorAsync(contracts_test_utils_1.ExchangeFunctionName.CancelOrder, function () { }, timestamp, txData, sendTxOpts, [order], order)];
            });
        });
    };
    /**
     * Batch version of hardCancelOrderAsync. Cancels orders on-chain by submitting an Ethereum transaction.
     * Executes multiple cancels atomically in a single transaction.
     * @param   orders      An array of orders to cancel.
     * @param   txData      Transaction data. The `from` field should be the maker's Ethereum address. Must be available
     *                      via the Provider supplied at instantiation.
     * @param   sendTxOpts  Optional arguments for sending the transaction.
     * @return  Transaction hash.
     */
    CoordinatorClient.prototype.batchHardCancelOrdersAsync = function (orders, timestamp, txData, sendTxOpts) {
        if (sendTxOpts === void 0) { sendTxOpts = { shouldValidate: true }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                assert_1.assert.doesConformToSchema('orders', orders, json_schemas_1.schemas.ordersSchema);
                return [2 /*return*/, this._executeTxThroughCoordinatorAsync(contracts_test_utils_1.ExchangeFunctionName.BatchCancelOrders, function () { }, timestamp, txData, sendTxOpts, orders, orders)];
            });
        });
    };
    /**
     * Cancels orders on-chain by submitting an Ethereum transaction.
     * Cancels all orders created by makerAddress with a salt less than or equal to the targetOrderEpoch
     * and senderAddress equal to coordinator extension contract address.
     * @param   targetOrderEpoch    Target order epoch.
     * @param   txData              Transaction data. The `from` field should be the maker's Ethereum address. Must be available
     *                              via the Provider supplied at instantiation.
     * @param   sendTxOpts          Optional arguments for sending the transaction.
     * @return  Transaction hash.
     */
    CoordinatorClient.prototype.hardCancelOrdersUpToAsync = function (targetOrderEpoch, timestamp, txData, sendTxOpts) {
        if (sendTxOpts === void 0) { sendTxOpts = { shouldValidate: true }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                assert_1.assert.isBigNumber('targetOrderEpoch', targetOrderEpoch);
                return [2 /*return*/, this._executeTxThroughCoordinatorAsync(contracts_test_utils_1.ExchangeFunctionName.CancelOrdersUpTo, function () { }, timestamp, txData, sendTxOpts, [], targetOrderEpoch)];
            });
        });
    };
    /**
     * Soft cancel a given order.
     * Soft cancels are recorded only on coordinator operator servers and do not involve an Ethereum transaction.
     * See [soft cancels](https://github.com/0xProject/0x-protocol-specification/blob/master/v2/coordinator-specification.md#soft-cancels).
     * @param   order           An object that conforms to the Order or SignedOrder interface. The order you would like to cancel.
     * @return  CoordinatorServerCancellationResponse. See [Cancellation Response](https://github.com/0xProject/0x-protocol-specification/blob/master/v2/coordinator-specification.md#response).
     */
    CoordinatorClient.prototype.softCancelAsync = function (order, timestamp) {
        return __awaiter(this, void 0, void 0, function () {
            var data, transaction, endpoint, response, approvedOrders, cancellations, errors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.doesConformToSchema('order', order, json_schemas_1.schemas.orderSchema);
                        assert_1.assert.isETHAddressHex('feeRecipientAddress', order.feeRecipientAddress);
                        assert_1.assert.isSenderAddressAsync('makerAddress', order.makerAddress, this._web3Wrapper);
                        data = this._exchangeInstance.cancelOrder(order).getABIEncodedTransactionData();
                        return [4 /*yield*/, this._generateSignedZeroExTransactionAsync(data, order.makerAddress, timestamp)];
                    case 1:
                        transaction = _a.sent();
                        return [4 /*yield*/, this._getServerEndpointOrThrowAsync(order)];
                    case 2:
                        endpoint = _a.sent();
                        return [4 /*yield*/, this._executeServerRequestAsync(transaction, order.makerAddress, endpoint)];
                    case 3:
                        response = _a.sent();
                        if (response.isError) {
                            approvedOrders = new Array();
                            cancellations = new Array();
                            errors = [
                                __assign({}, response, { orders: [order] }),
                            ];
                            throw new coordinator_server_types_1.CoordinatorServerError(coordinator_server_types_1.CoordinatorServerErrorMsg.CancellationFailed, approvedOrders, cancellations, errors);
                        }
                        else {
                            return [2 /*return*/, response.body];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Batch version of softCancelOrderAsync. Requests multiple soft cancels
     * @param   orders                An array of orders to cancel.
     * @return  CoordinatorServerCancellationResponse. See [Cancellation Response](https://github.com/0xProject/0x-protocol-specification/blob/master/v2/coordinator-specification.md#response).
     */
    CoordinatorClient.prototype.batchSoftCancelAsync = function (orders, timestamp) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2, _a, makerAddress, data, transaction, errorResponses, successResponses, serverEndpointsToOrders, _b, _c, endpoint, response, e_2_1, errorsWithOrders, approvedOrders, cancellations;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        assert_1.assert.doesConformToSchema('orders', orders, json_schemas_1.schemas.ordersSchema);
                        makerAddress = getMakerAddressOrThrow(orders);
                        assert_1.assert.isSenderAddressAsync('makerAddress', makerAddress, this._web3Wrapper);
                        data = this._exchangeInstance.batchCancelOrders(orders).getABIEncodedTransactionData();
                        return [4 /*yield*/, this._generateSignedZeroExTransactionAsync(data, makerAddress, timestamp)];
                    case 1:
                        transaction = _d.sent();
                        errorResponses = [];
                        successResponses = [];
                        return [4 /*yield*/, this._mapServerEndpointsToOrdersAsync(orders)];
                    case 2:
                        serverEndpointsToOrders = _d.sent();
                        _d.label = 3;
                    case 3:
                        _d.trys.push([3, 8, 9, 10]);
                        _b = __values(Object.keys(serverEndpointsToOrders)), _c = _b.next();
                        _d.label = 4;
                    case 4:
                        if (!!_c.done) return [3 /*break*/, 7];
                        endpoint = _c.value;
                        return [4 /*yield*/, this._executeServerRequestAsync(transaction, makerAddress, endpoint)];
                    case 5:
                        response = _d.sent();
                        if (response.isError) {
                            errorResponses.push(response);
                        }
                        else {
                            successResponses.push(response.body);
                        }
                        _d.label = 6;
                    case 6:
                        _c = _b.next();
                        return [3 /*break*/, 4];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 10:
                        // if no errors
                        if (errorResponses.length === 0) {
                            return [2 /*return*/, successResponses];
                        }
                        else {
                            errorsWithOrders = errorResponses.map(function (resp) {
                                var endpoint = resp.coordinatorOperator;
                                var _orders = serverEndpointsToOrders[endpoint];
                                return __assign({}, resp, { orders: _orders });
                            });
                            approvedOrders = new Array();
                            cancellations = successResponses;
                            // return errors and approvals
                            throw new coordinator_server_types_1.CoordinatorServerError(coordinator_server_types_1.CoordinatorServerErrorMsg.CancellationFailed, approvedOrders, cancellations, errorsWithOrders);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Recovers the address of a signer given a hash and signature.
     * @param hash Any 32 byte hash.
     * @param signature Proof that the hash has been signed by signer.
     * @returns Signer address.
     */
    CoordinatorClient.prototype.getSignerAddressAsync = function (hash, signature) {
        return __awaiter(this, void 0, void 0, function () {
            var signerAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.isHexString('hash', hash);
                        assert_1.assert.isHexString('signature', signature);
                        return [4 /*yield*/, this._contractInstance.getSignerAddress(hash, signature).callAsync()];
                    case 1:
                        signerAddress = _a.sent();
                        return [2 /*return*/, signerAddress];
                }
            });
        });
    };
    CoordinatorClient.prototype._marketBuySellOrdersAsync = function (exchangeFn, orders, assetFillAmount, signatures, callback, timestamp, txData, sendTxOpts) {
        if (sendTxOpts === void 0) { sendTxOpts = { shouldValidate: true }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                assert_1.assert.doesConformToSchema('orders', orders, json_schemas_1.schemas.ordersSchema);
                assert_1.assert.isBigNumber('assetFillAmount', assetFillAmount);
                return [2 /*return*/, this._executeTxThroughCoordinatorAsync(exchangeFn, callback, timestamp, txData, sendTxOpts, orders, orders, assetFillAmount, signatures)];
            });
        });
    };
    CoordinatorClient.prototype._batchFillAsync = function (exchangeFn, orders, takerAssetFillAmounts, signatures, callback, timestamp, txData, sendTxOpts) {
        if (sendTxOpts === void 0) { sendTxOpts = { shouldValidate: true }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                assert_1.assert.doesConformToSchema('orders', orders, json_schemas_1.schemas.ordersSchema);
                takerAssetFillAmounts.forEach(function (takerAssetFillAmount) {
                    return assert_1.assert.isValidBaseUnitAmount('takerAssetFillAmount', takerAssetFillAmount);
                });
                return [2 /*return*/, this._executeTxThroughCoordinatorAsync(exchangeFn, callback, timestamp, txData, sendTxOpts, orders, orders, takerAssetFillAmounts, signatures)];
            });
        });
    };
    CoordinatorClient.prototype._executeTxThroughCoordinatorAsync = function (exchangeFn, callback, timestamp, txData, sendTxOpts, ordersNeedingApprovals) {
        var args = []; // tslint:disable-line:trailing-comma
        for (var _i = 6 // tslint:disable-line:trailing-comma
        ; _i < arguments.length // tslint:disable-line:trailing-comma
        ; _i++ // tslint:disable-line:trailing-comma
        ) {
            args[_i - 6] = arguments[_i]; // tslint:disable-line:trailing-comma
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, signedZrxTx, approvalSignatures, txDataWithDefaults, txHash;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        assert_1.assert.isETHAddressHex('takerAddress', txData.from);
                        return [4 /*yield*/, assert_1.assert.isSenderAddressAsync('takerAddress', txData.from, this._web3Wrapper)];
                    case 1:
                        _b.sent();
                        data = (_a = this._exchangeInstance)[exchangeFn].apply(_a, __spread(args)).getABIEncodedTransactionData();
                        callback(CoordinatorFillFunctionStep.RequestTakerSignature);
                        return [4 /*yield*/, this._generateSignedZeroExTransactionAsync(data, txData.from, txData.gasPrice, timestamp)];
                    case 2:
                        signedZrxTx = _b.sent();
                        callback(CoordinatorFillFunctionStep.RequestCoordinatorSignature);
                        return [4 /*yield*/, this._getApprovalsAsync(signedZrxTx, ordersNeedingApprovals, txData.from)];
                    case 3:
                        approvalSignatures = _b.sent();
                        callback(CoordinatorFillFunctionStep.RequestSubmitTransaction);
                        txDataWithDefaults = __assign({}, this._txDefaults, txData);
                        txHash = this._contractInstance
                            .executeTransaction(signedZrxTx, txData.from, signedZrxTx.signature, approvalSignatures)
                            .sendTransactionAsync(txDataWithDefaults, sendTxOpts);
                        return [2 /*return*/, txHash];
                }
            });
        });
    };
    CoordinatorClient.prototype._generateSignedZeroExTransactionAsync = function (data, signerAddress, gasPrice, timestamp) {
        return __awaiter(this, void 0, void 0, function () {
            var now, transaction, _a, _b, signedZrxTx;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        now = timestamp ? timestamp : Math.floor(Date.now() / 1000);
                        _a = {
                            salt: order_utils_1.generatePseudoRandomSalt(),
                            signerAddress: signerAddress,
                            data: data
                        };
                        _b = {
                            verifyingContract: this.exchangeAddress
                        };
                        return [4 /*yield*/, this._web3Wrapper.getChainIdAsync()];
                    case 1:
                        transaction = (_a.domain = (_b.chainId = _c.sent(),
                            _b),
                            _a.expirationTimeSeconds = new utils_1.BigNumber(now + DEFAULT_APPROVAL_EXPIRATION_TIME_SECONDS),
                            _a.gasPrice = gasPrice ? new utils_1.BigNumber(gasPrice) : new utils_1.BigNumber(1),
                            _a);
                        return [4 /*yield*/, order_utils_1.signatureUtils.ecSignTransactionAsync(this._web3Wrapper.getProvider(), transaction, transaction.signerAddress)];
                    case 2:
                        signedZrxTx = _c.sent();
                        return [2 /*return*/, signedZrxTx];
                }
            });
        });
    };
    CoordinatorClient.prototype._getApprovalsAsync = function (transaction, orders, txOrigin) {
        return __awaiter(this, void 0, void 0, function () {
            var e_3, _a, coordinatorOrders, serverEndpointsToOrders, errorResponses, approvalResponses, _b, _c, endpoint, response, e_3_1, notCoordinatorOrders, approvedOrdersNested, approvedOrders, errorsWithOrders, cancellations;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        coordinatorOrders = orders.filter(function (o) { return o.senderAddress === _this.address; });
                        if (coordinatorOrders.length === 0) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, this._mapServerEndpointsToOrdersAsync(coordinatorOrders)];
                    case 1:
                        serverEndpointsToOrders = _d.sent();
                        errorResponses = [];
                        approvalResponses = [];
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 7, 8, 9]);
                        _b = __values(Object.keys(serverEndpointsToOrders)), _c = _b.next();
                        _d.label = 3;
                    case 3:
                        if (!!_c.done) return [3 /*break*/, 6];
                        endpoint = _c.value;
                        return [4 /*yield*/, this._executeServerRequestAsync(transaction, txOrigin, endpoint)];
                    case 4:
                        response = _d.sent();
                        if (response.isError) {
                            errorResponses.push(response);
                        }
                        else {
                            approvalResponses.push(response);
                        }
                        _d.label = 5;
                    case 5:
                        _c = _b.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_3_1 = _d.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 9:
                        // if no errors
                        if (errorResponses.length === 0) {
                            // concatenate all approval responses
                            return [2 /*return*/, approvalResponses.reduce(function (accumulator, response) {
                                    return accumulator.concat(response.body.signatures);
                                }, [])];
                        }
                        else {
                            notCoordinatorOrders = orders.filter(function (o) { return o.senderAddress !== _this.address; });
                            approvedOrdersNested = approvalResponses.map(function (resp) {
                                var endpoint = resp.coordinatorOperator;
                                return serverEndpointsToOrders[endpoint];
                            });
                            approvedOrders = lodash_1.flatten(approvedOrdersNested.concat(notCoordinatorOrders));
                            errorsWithOrders = errorResponses.map(function (resp) {
                                var endpoint = resp.coordinatorOperator;
                                return __assign({}, resp, { orders: serverEndpointsToOrders[endpoint] });
                            });
                            cancellations = new Array();
                            throw new coordinator_server_types_1.CoordinatorServerError(coordinator_server_types_1.CoordinatorServerErrorMsg.FillFailed, approvedOrders, cancellations, errorsWithOrders);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CoordinatorClient.prototype._getServerEndpointOrThrowAsync = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            function _fetchServerEndpointOrThrowAsync(feeRecipient, registryInstance) {
                return __awaiter(this, void 0, void 0, function () {
                    var coordinatorOperatorEndpoint;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, registryInstance.getCoordinatorEndpoint(feeRecipient).callAsync()];
                            case 1:
                                coordinatorOperatorEndpoint = _a.sent();
                                if (coordinatorOperatorEndpoint === '' || coordinatorOperatorEndpoint === undefined) {
                                    throw new Error("No Coordinator server endpoint found in Coordinator Registry for feeRecipientAddress: " + feeRecipient + ". Registry contract address: [" + registryInstance.address + "] Order: [" + JSON.stringify(order) + "]");
                                }
                                return [2 /*return*/, coordinatorOperatorEndpoint];
                        }
                    });
                });
            }
            var cached, endpoint, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cached = this._feeRecipientToEndpoint[order.feeRecipientAddress];
                        if (!(cached !== undefined)) return [3 /*break*/, 1];
                        _a = cached;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, _fetchServerEndpointOrThrowAsync(order.feeRecipientAddress, this._registryInstance)];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        endpoint = _a;
                        return [2 /*return*/, endpoint];
                }
            });
        });
    };
    CoordinatorClient.prototype._executeServerRequestAsync = function (signedTransaction, txOrigin, endpoint) {
        return __awaiter(this, void 0, void 0, function () {
            var requestPayload, response, isError, isValidationError, json, _a, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        requestPayload = {
                            signedTransaction: signedTransaction,
                            txOrigin: txOrigin,
                        };
                        return [4 /*yield*/, utils_1.fetchAsync(endpoint + "/v2/request_transaction?chainId=" + this.chainId, {
                                body: JSON.stringify(requestPayload),
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json; charset=utf-8',
                                },
                            })];
                    case 1:
                        response = _b.sent();
                        isError = response.status !== HttpStatus.OK;
                        isValidationError = response.status === HttpStatus.BAD_REQUEST;
                        if (!(isError && !isValidationError)) return [3 /*break*/, 2];
                        _a = undefined;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, response.json()];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        json = _a;
                        result = {
                            isError: isError,
                            status: response.status,
                            body: isError ? undefined : json,
                            error: isError ? json : undefined,
                            request: requestPayload,
                            coordinatorOperator: endpoint,
                        };
                        return [2 /*return*/, result];
                }
            });
        });
    };
    CoordinatorClient.prototype._mapServerEndpointsToOrdersAsync = function (coordinatorOrders) {
        return __awaiter(this, void 0, void 0, function () {
            var e_4, _a, e_5, _b, groupByFeeRecipient, coordinatorOrders_1, coordinatorOrders_1_1, order, feeRecipient, serverEndpointsToOrders, _c, _d, orders, endpoint, e_5_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        groupByFeeRecipient = {};
                        try {
                            for (coordinatorOrders_1 = __values(coordinatorOrders), coordinatorOrders_1_1 = coordinatorOrders_1.next(); !coordinatorOrders_1_1.done; coordinatorOrders_1_1 = coordinatorOrders_1.next()) {
                                order = coordinatorOrders_1_1.value;
                                feeRecipient = order.feeRecipientAddress;
                                if (groupByFeeRecipient[feeRecipient] === undefined) {
                                    groupByFeeRecipient[feeRecipient] = [];
                                }
                                groupByFeeRecipient[feeRecipient].push(order);
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (coordinatorOrders_1_1 && !coordinatorOrders_1_1.done && (_a = coordinatorOrders_1.return)) _a.call(coordinatorOrders_1);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        serverEndpointsToOrders = {};
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 6, 7, 8]);
                        _c = __values(Object.values(groupByFeeRecipient)), _d = _c.next();
                        _e.label = 2;
                    case 2:
                        if (!!_d.done) return [3 /*break*/, 5];
                        orders = _d.value;
                        return [4 /*yield*/, this._getServerEndpointOrThrowAsync(orders[0])];
                    case 3:
                        endpoint = _e.sent();
                        if (serverEndpointsToOrders[endpoint] === undefined) {
                            serverEndpointsToOrders[endpoint] = [];
                        }
                        serverEndpointsToOrders[endpoint] = serverEndpointsToOrders[endpoint].concat(orders);
                        _e.label = 4;
                    case 4:
                        _d = _c.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_5_1 = _e.sent();
                        e_5 = { error: e_5_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_5) throw e_5.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, serverEndpointsToOrders];
                }
            });
        });
    };
    __decorate([
        decorators_1.decorators.asyncZeroExErrorHandler
    ], CoordinatorClient.prototype, "assertValidCoordinatorApprovalsOrThrowAsync", null);
    __decorate([
        decorators_1.decorators.asyncZeroExErrorHandler
    ], CoordinatorClient.prototype, "fillOrderAsync", null);
    __decorate([
        decorators_1.decorators.asyncZeroExErrorHandler
    ], CoordinatorClient.prototype, "fillOrKillOrderAsync", null);
    __decorate([
        decorators_1.decorators.asyncZeroExErrorHandler
    ], CoordinatorClient.prototype, "batchFillOrdersAsync", null);
    __decorate([
        decorators_1.decorators.asyncZeroExErrorHandler
    ], CoordinatorClient.prototype, "batchFillOrKillOrdersAsync", null);
    __decorate([
        decorators_1.decorators.asyncZeroExErrorHandler
    ], CoordinatorClient.prototype, "marketBuyOrdersFillOrKillAsync", null);
    __decorate([
        decorators_1.decorators.asyncZeroExErrorHandler
    ], CoordinatorClient.prototype, "marketBuyOrdersNoThrowAsync", null);
    __decorate([
        decorators_1.decorators.asyncZeroExErrorHandler
    ], CoordinatorClient.prototype, "marketSellOrdersFillOrKillAsync", null);
    __decorate([
        decorators_1.decorators.asyncZeroExErrorHandler
    ], CoordinatorClient.prototype, "marketSellOrdersNoThrowAsync", null);
    __decorate([
        decorators_1.decorators.asyncZeroExErrorHandler
    ], CoordinatorClient.prototype, "matchOrdersAsync", null);
    __decorate([
        decorators_1.decorators.asyncZeroExErrorHandler
    ], CoordinatorClient.prototype, "hardCancelOrderAsync", null);
    __decorate([
        decorators_1.decorators.asyncZeroExErrorHandler
    ], CoordinatorClient.prototype, "batchHardCancelOrdersAsync", null);
    __decorate([
        decorators_1.decorators.asyncZeroExErrorHandler
    ], CoordinatorClient.prototype, "hardCancelOrdersUpToAsync", null);
    __decorate([
        decorators_1.decorators.asyncZeroExErrorHandler
    ], CoordinatorClient.prototype, "softCancelAsync", null);
    __decorate([
        decorators_1.decorators.asyncZeroExErrorHandler
    ], CoordinatorClient.prototype, "batchSoftCancelAsync", null);
    __decorate([
        decorators_1.decorators.asyncZeroExErrorHandler
    ], CoordinatorClient.prototype, "getSignerAddressAsync", null);
    return CoordinatorClient;
}());
exports.CoordinatorClient = CoordinatorClient;
function getMakerAddressOrThrow(orders) {
    var uniqueMakerAddresses = new Set(orders.map(function (o) { return o.makerAddress; }));
    if (uniqueMakerAddresses.size > 1) {
        throw new Error("All orders in a batch must have the same makerAddress");
    }
    return orders[0].makerAddress;
}
// tslint:disable:max-file-line-count
//# sourceMappingURL=index.js.map