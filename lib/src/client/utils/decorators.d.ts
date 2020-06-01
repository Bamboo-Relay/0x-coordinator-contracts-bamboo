export declare enum ContractError {
    ContractNotDeployedOnChain = "CONTRACT_NOT_DEPLOYED_ON_CHAIN",
    InsufficientAllowanceForTransfer = "INSUFFICIENT_ALLOWANCE_FOR_TRANSFER",
    InsufficientBalanceForTransfer = "INSUFFICIENT_BALANCE_FOR_TRANSFER",
    InsufficientEthBalanceForDeposit = "INSUFFICIENT_ETH_BALANCE_FOR_DEPOSIT",
    InsufficientWEthBalanceForWithdrawal = "INSUFFICIENT_WETH_BALANCE_FOR_WITHDRAWAL",
    InvalidJump = "INVALID_JUMP",
    OutOfGas = "OUT_OF_GAS",
    SubscriptionNotFound = "SUBSCRIPTION_NOT_FOUND",
    SubscriptionAlreadyPresent = "SUBSCRIPTION_ALREADY_PRESENT",
    ERC721OwnerNotFound = "ERC_721_OWNER_NOT_FOUND",
    ERC721NoApproval = "ERC_721_NO_APPROVAL",
    SignatureRequestDenied = "SIGNATURE_REQUEST_DENIED"
}
export declare type AsyncMethod = (...args: any[]) => Promise<any>;
export declare type SyncMethod = (...args: any[]) => any;
export declare const decorators: {
    asyncZeroExErrorHandler: (_target: object, _key: string | symbol, descriptor: TypedPropertyDescriptor<AsyncMethod>) => TypedPropertyDescriptor<AsyncMethod>;
    syncZeroExErrorHandler: (_target: object, _key: string | symbol, descriptor: TypedPropertyDescriptor<SyncMethod>) => TypedPropertyDescriptor<SyncMethod>;
};
//# sourceMappingURL=decorators.d.ts.map