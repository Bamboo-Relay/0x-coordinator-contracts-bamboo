/// <reference types="node" />
import { SignedZeroExTransaction } from '@0x/types';
export declare const hashUtils: {
    getApprovalHashBuffer(transaction: SignedZeroExTransaction, verifyingContract: string, txOrigin: string): Buffer;
    getApprovalHashHex(transaction: SignedZeroExTransaction, verifyingContract: string, txOrigin: string): string;
};
//# sourceMappingURL=hash_utils.d.ts.map