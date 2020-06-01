"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contracts_test_utils_1 = require("@0x/contracts-test-utils");
var types_1 = require("@0x/types");
var utils_1 = require("@0x/utils");
var hash_utils_1 = require("./hash_utils");
var ApprovalFactory = /** @class */ (function () {
    function ApprovalFactory(privateKey, verifyingContract) {
        this._privateKey = privateKey;
        this._verifyingContractAddress = verifyingContract;
    }
    ApprovalFactory.prototype.newSignedApproval = function (transaction, txOrigin, signatureType) {
        if (signatureType === void 0) { signatureType = types_1.SignatureType.EthSign; }
        var approvalHashBuff = hash_utils_1.hashUtils.getApprovalHashBuffer(transaction, this._verifyingContractAddress, txOrigin);
        var signatureBuff = contracts_test_utils_1.signingUtils.signMessage(approvalHashBuff, this._privateKey, signatureType);
        var signedApproval = {
            txOrigin: txOrigin,
            transaction: transaction,
            signature: utils_1.hexUtils.concat(signatureBuff),
        };
        return signedApproval;
    };
    return ApprovalFactory;
}());
exports.ApprovalFactory = ApprovalFactory;
//# sourceMappingURL=approval_factory.js.map