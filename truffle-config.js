const HDWalletProvider = require('@truffle/hdwallet-provider')
const NonceTrackerSubprovider = require('web3-provider-engine/subproviders/nonce-tracker')
const config = require('config')

module.exports = {
    networks: {
        development: {
            provider: function() {
                let w = new HDWalletProvider({
                    mnemonic: config.get("development.truffle.mnemonic"),
                    providerOrUrl: config.get("development.blockchain.rpc"),
                })
                return w
            },
            host: "127.0.0.1",     // Localhost (default: none)
            port: 8545,            // Standard Ethereum port (default: none)
            network_id: "*",       // Any network (default: none)
        },
        testnet: {
            provider: function () {
                let w = new HDWalletProvider(config.get('testnet.truffle.privateKey'), config.get('testnet.blockchain.rpc'))
                let nonceTracker = new NonceTrackerSubprovider()
                w.engine._providers.unshift(nonceTracker)
                nonceTracker.setEngine(w.engine)
                return w
            },
            network_id: config.get('testnet.blockchain.networkId'),
            port: 8545,
            gas: 4000000,
            gasPrice: 10000000000000
        },
        mainnet: {
            provider: function () {
                let w = new HDWalletProvider(config.get('mainnet.truffle.privateKey'), config.get('mainnet.blockchain.rpc'))
                let nonceTracker = new NonceTrackerSubprovider()
                w.engine._providers.unshift(nonceTracker)
                nonceTracker.setEngine(w.engine)
                return w
            },
            network_id: config.get('mainnet.blockchain.networkId'),
            port: 8545,
            gas: 2000000,
            gasPrice: 60000000000
        },
    },
    compilers: {
        solc: {
            version: '^0.8.0',
            settings: {
                optimizer: {
                    enabled: true
                }
            }
        }
    }
}
