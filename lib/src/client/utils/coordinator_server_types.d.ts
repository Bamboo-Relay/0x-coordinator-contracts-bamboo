import { Order, SignedOrder, SignedZeroExTransaction } from '@0x/types';
import { BigNumber } from '@0x/utils';
export interface CoordinatorServerApprovalResponse {
    signatures: string[];
    expirationTimeSeconds: BigNumber;
}
export interface CoordinatorServerCancellationResponse {
    outstandingFillSignatures: CoordinatorOutstandingFillSignatures[];
    cancellationSignatures: string[];
}
export interface CoordinatorOutstandingFillSignatures {
    orderHash: string;
    approvalSignatures: string[];
    expirationTimeSeconds: BigNumber;
    takerAssetFillAmount: BigNumber;
}
export interface CoordinatorServerResponse {
    isError: boolean;
    status: number;
    body?: CoordinatorServerCancellationResponse | CoordinatorServerApprovalResponse;
    error?: any;
    request: CoordinatorServerRequest;
    coordinatorOperator: string;
    orders?: Array<SignedOrder | Order>;
}
export interface CoordinatorServerRequest {
    signedTransaction: SignedZeroExTransaction;
    txOrigin: string;
}
export declare class CoordinatorServerError extends Error {
    message: CoordinatorServerErrorMsg;
    approvedOrders?: Order[];
    cancellations?: CoordinatorServerCancellationResponse[];
    errors: CoordinatorServerResponse[];
    constructor(message: CoordinatorServerErrorMsg, approvedOrders: Order[], cancellations: CoordinatorServerCancellationResponse[], errors: CoordinatorServerResponse[]);
}
export declare enum CoordinatorServerErrorMsg {
    CancellationFailed = "Failed to cancel with some coordinator server(s). See errors for more info. See cancellations for successful cancellations.",
    FillFailed = "Failed to obtain approval signatures from some coordinator server(s). See errors for more info. Current transaction has been abandoned but you may resubmit with only approvedOrders (a new ZeroEx transaction will have to be signed)."
}
//# sourceMappingURL=coordinator_server_types.d.ts.map