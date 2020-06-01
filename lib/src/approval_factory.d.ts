/// <reference types="node" />
import { SignatureType, SignedZeroExTransaction } from '@0x/types';
import { SignedCoordinatorApproval } from './types';
export declare class ApprovalFactory {
    private readonly _privateKey;
    private readonly _verifyingContractAddress;
    constructor(privateKey: Buffer, verifyingContract: string);
    newSignedApproval(transaction: SignedZeroExTransaction, txOrigin: string, signatureType?: SignatureType): SignedCoordinatorApproval;
}
//# sourceMappingURL=approval_factory.d.ts.map