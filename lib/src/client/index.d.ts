import { SendTransactionOpts } from '@0x/base-contract';
import { Order, SignedOrder, ZeroExTransaction } from '@0x/types';
import { BigNumber } from '@0x/utils';
import { ContractAbi, SupportedProvider, TxData } from 'ethereum-types';
import { CoordinatorServerCancellationResponse, CoordinatorServerErrorMsg } from './utils/coordinator_server_types';
export { CoordinatorServerErrorMsg, CoordinatorServerCancellationResponse };
export declare enum CoordinatorFillFunctionStep {
    RequestTakerSignature = "REQUEST_TAKER_SIGNATURE",
    RequestCoordinatorSignature = "REQUEST_COORDINATOR_SIGNATURE",
    RequestSubmitTransaction = "REQUEST_SUBMIT_TRANSACTION"
}
/**
 * This class includes all the functionality related to filling or cancelling orders through
 * the 0x V2 Coordinator extension contract.
 */
export declare class CoordinatorClient {
    abi: ContractAbi;
    chainId: number;
    address: string;
    exchangeAddress: string;
    registryAddress: string;
    private readonly _web3Wrapper;
    private readonly _contractInstance;
    private readonly _registryInstance;
    private readonly _exchangeInstance;
    private readonly _feeRecipientToEndpoint;
    private readonly _txDefaults;
    /**
     * Validates that the 0x transaction has been approved by all of the feeRecipients that correspond to each order in the transaction's Exchange calldata.
     * Throws an error if the transaction approvals are not valid. Will not detect failures that would occur when the transaction is executed on the Exchange contract.
     * @param transaction 0x transaction containing salt, signerAddress, and data.
     * @param txOrigin Required signer of Ethereum transaction calling this function.
     * @param transactionSignature Proof that the transaction has been signed by the signer.
     * @param approvalSignatures Array of signatures that correspond to the feeRecipients of each order in the transaction's Exchange calldata.
     */
    assertValidCoordinatorApprovalsOrThrowAsync(transaction: ZeroExTransaction, txOrigin: string, transactionSignature: string, approvalSignatures: string[]): Promise<void>;
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
    constructor(address: string, provider: SupportedProvider, chainId: number, txDefaults?: Partial<TxData>, exchangeAddress?: string, registryAddress?: string);
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
    fillOrderAsync(order: Order, takerAssetFillAmount: BigNumber, signature: string, callback: (step: CoordinatorFillFunctionStep) => void, timestamp: number, txData: TxData, sendTxOpts?: Partial<SendTransactionOpts>): Promise<string>;
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
    fillOrKillOrderAsync(order: Order, takerAssetFillAmount: BigNumber, signature: string, callback: (step: CoordinatorFillFunctionStep) => void, timestamp: number, txData: TxData, sendTxOpts?: Partial<SendTransactionOpts>): Promise<string>;
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
    batchFillOrdersAsync(orders: Order[], takerAssetFillAmounts: BigNumber[], signatures: string[], callback: (step: CoordinatorFillFunctionStep) => void, timestamp: number, txData: TxData, sendTxOpts?: Partial<SendTransactionOpts>): Promise<string>;
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
    batchFillOrdersNoThrowAsync(orders: Order[], takerAssetFillAmounts: BigNumber[], signatures: string[], callback: (step: CoordinatorFillFunctionStep) => void, timestamp: number, txData: TxData, sendTxOpts?: Partial<SendTransactionOpts>): Promise<string>;
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
    batchFillOrKillOrdersAsync(orders: Order[], takerAssetFillAmounts: BigNumber[], signatures: string[], callback: (step: CoordinatorFillFunctionStep) => void, timestamp: number, txData: TxData, sendTxOpts?: Partial<SendTransactionOpts>): Promise<string>;
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
    marketBuyOrdersFillOrKillAsync(orders: Order[], makerAssetFillAmount: BigNumber, signatures: string[], callback: (step: CoordinatorFillFunctionStep) => void, timestamp: number, txData: TxData, sendTxOpts?: SendTransactionOpts): Promise<string>;
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
    marketBuyOrdersNoThrowAsync(orders: Order[], makerAssetFillAmount: BigNumber, signatures: string[], callback: (step: CoordinatorFillFunctionStep) => void, timestamp: number, txData: TxData, sendTxOpts?: SendTransactionOpts): Promise<string>;
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
    marketSellOrdersFillOrKillAsync(orders: Order[], takerAssetFillAmount: BigNumber, signatures: string[], callback: (step: CoordinatorFillFunctionStep) => void, timestamp: number, txData: TxData, sendTxOpts?: SendTransactionOpts): Promise<string>;
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
    marketSellOrdersNoThrowAsync(orders: Order[], takerAssetFillAmount: BigNumber, signatures: string[], callback: (step: CoordinatorFillFunctionStep) => void, timestamp: number, txData: TxData, sendTxOpts?: SendTransactionOpts): Promise<string>;
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
    matchOrdersAsync(leftOrder: Order, rightOrder: Order, leftSignature: string, rightSignature: string, callback: (step: CoordinatorFillFunctionStep) => void, timestamp: number, txData: TxData, sendTxOpts?: SendTransactionOpts): Promise<string>;
    /**
     * Cancels an order on-chain by submitting an Ethereum transaction.
     * @param   order       An object that conforms to the Order interface. The order you would like to cancel.
     * @param   txData      Transaction data. The `from` field should be the maker's Ethereum address. Must be available
     *                      via the Provider supplied at instantiation.
     * @param   sendTxOpts  Optional arguments for sending the transaction.
     * @return  Transaction hash.
     */
    hardCancelOrderAsync(order: Order, timestamp: number, txData: TxData, sendTxOpts?: SendTransactionOpts): Promise<string>;
    /**
     * Batch version of hardCancelOrderAsync. Cancels orders on-chain by submitting an Ethereum transaction.
     * Executes multiple cancels atomically in a single transaction.
     * @param   orders      An array of orders to cancel.
     * @param   txData      Transaction data. The `from` field should be the maker's Ethereum address. Must be available
     *                      via the Provider supplied at instantiation.
     * @param   sendTxOpts  Optional arguments for sending the transaction.
     * @return  Transaction hash.
     */
    batchHardCancelOrdersAsync(orders: Order[], timestamp: number, txData: TxData, sendTxOpts?: SendTransactionOpts): Promise<string>;
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
    hardCancelOrdersUpToAsync(targetOrderEpoch: BigNumber, timestamp: number, txData: TxData, sendTxOpts?: SendTransactionOpts): Promise<string>;
    /**
     * Soft cancel a given order.
     * Soft cancels are recorded only on coordinator operator servers and do not involve an Ethereum transaction.
     * See [soft cancels](https://github.com/0xProject/0x-protocol-specification/blob/master/v2/coordinator-specification.md#soft-cancels).
     * @param   order           An object that conforms to the Order or SignedOrder interface. The order you would like to cancel.
     * @return  CoordinatorServerCancellationResponse. See [Cancellation Response](https://github.com/0xProject/0x-protocol-specification/blob/master/v2/coordinator-specification.md#response).
     */
    softCancelAsync(order: Order, timestamp: number): Promise<CoordinatorServerCancellationResponse>;
    /**
     * Batch version of softCancelOrderAsync. Requests multiple soft cancels
     * @param   orders                An array of orders to cancel.
     * @return  CoordinatorServerCancellationResponse. See [Cancellation Response](https://github.com/0xProject/0x-protocol-specification/blob/master/v2/coordinator-specification.md#response).
     */
    batchSoftCancelAsync(orders: SignedOrder[], timestamp: number): Promise<CoordinatorServerCancellationResponse[]>;
    /**
     * Recovers the address of a signer given a hash and signature.
     * @param hash Any 32 byte hash.
     * @param signature Proof that the hash has been signed by signer.
     * @returns Signer address.
     */
    getSignerAddressAsync(hash: string, signature: string): Promise<string>;
    private _marketBuySellOrdersAsync;
    private _batchFillAsync;
    private _executeTxThroughCoordinatorAsync;
    private _generateSignedZeroExTransactionAsync;
    private _getApprovalsAsync;
    private _getServerEndpointOrThrowAsync;
    private _executeServerRequestAsync;
    private _mapServerEndpointsToOrdersAsync;
}
//# sourceMappingURL=index.d.ts.map