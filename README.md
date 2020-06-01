## Coordinator

This package contains a contract that allows users to call arbitrary functions on the Exchange contract with permission from one or more Coordinators. Addresses of the deployed contracts can be found in this 0x [guide](https://0x.org/docs/guides/0x-cheat-sheet) or the [DEPLOYS](./DEPLOYS.json) file within this package.

This fork is a runtime drop-in replacement for the 0x coordinator client.

See the [original 0x coordinator package](https://github.com/0xProject/0x-monorepo/tree/development/contracts/coordinator/src) for full documentation.

## Installation

**Install**

Use `resolutions` property in your projects `package.json` to define this repo as an override.

```bash
"resolutions": {
    "@0x/contracts-coordinator": "Bamboo-Relay/0x-coordinator-contracts-bamboo"
}
```
