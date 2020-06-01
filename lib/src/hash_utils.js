"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_utils_1 = require("@0x/order-utils");
var utils_1 = require("@0x/utils");
exports.hashUtils = {
    getApprovalHashBuffer: function (transaction, verifyingContract, txOrigin) {
        var typedData = order_utils_1.eip712Utils.createCoordinatorApprovalTypedData(transaction, verifyingContract, txOrigin);
        var hashBuffer = utils_1.signTypedDataUtils.generateTypedDataHash(typedData);
        return hashBuffer;
    },
    getApprovalHashHex: function (transaction, verifyingContract, txOrigin) {
        var hashHex = utils_1.hexUtils.toHex(exports.hashUtils.getApprovalHashBuffer(transaction, verifyingContract, txOrigin));
        return hashHex;
    },
};
//# sourceMappingURL=hash_utils.js.map