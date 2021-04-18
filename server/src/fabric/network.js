'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

// load the network configuration
const ccpPath = path.resolve(__dirname, '..', '..','..',  'rede','test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
// // Create a new file system based wallet for managing identities.
// const walletPath = path.join(process.cwd(), '..','..','wallet');
const walletPath = path.resolve(__dirname, '..', '..','wallet');

// create car transaction
exports.getAll = async function() {
    try {
	console.log('\x1b[36m\x1b[0m',"\nGet\n\n")
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath} \n`);
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser5');
        if (!identity) {
            console.log('An identity for the user "appUser5" does not exist in the wallet \n');
            console.log('Run the registerUser.js application before retrying \n');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser5', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('healthiot');

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('getAll');
        //console.log('\x1b[32m',`Transaction has been evaluated, result is: ${result} \n`);
	//console.log('\x1b[8m');
	const result2 = await contract.evaluateTransaction('getHistory','111.111.111-11');
	console.log('History');
	console.log(result2);
        return [result, result2];
        //return result;
        
        // Disconnect from the gateway.
        await gateway.disconnect();
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        response.error = error.message;
        return response;
    }
    // const result = 'Essa estrutura é uma lista de dados';
    return result;
}

// change car owner transaction
exports.getForKey = async function(key) {
    try {
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath} \n`);        
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser5');
        if (!identity) {
            console.log('An identity for the user "appUser5" does not exist in the wallet \n');
            console.log('Run the registerUser.js application before retrying \n');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser5', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('prontuario');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('queryprontuario',key);
        console.log(`Transaction has been evaluated, result is: ${result.toString()} \n`);
        return result;

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error} \n`);
        response.error = error.message;
        return response;    
    }
    // const result = 'Esta foi a chave recebida : '+key;
    // return result;
}

// query all cars transaction
exports.getHistoryKey = async function(key) {
    try {
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath} \n`);
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser5');
        if (!identity) {
            console.log('An identity for the user "appUser5" does not exist in the wallet \n');
            console.log('Run the registerUser.js application before retrying \n');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser5', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('prontuario');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('getHistoryProntuarios',key);
        console.log(`Transaction has been evaluated, result is: ${result.toString()} \n`);
        return result;

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error} \n`);
        response.error = error.message;
        return response;    
    }
    // const result = 'Esta foi a chave recebida : '+key;
    // return result;
}


exports.createDatas = async function(cpf, name, ecg, temperatura, oximetro) {
    try {
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log('\x1b[37m',`Wallet path: ${walletPath} \n`);
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser5');
        if (!identity) {
            console.log('An identity for the user "appUser5" does not exist in the wallet \n');
            console.log('Run the registerUser.js application before retrying \n');
            return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser5', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('healthiot');
	console.log('\x1b[36m\x1b[0m');
        // Submit the specified transaction.        
        await contract.submitTransaction('createDatas', cpf, name, ecg, temperatura, oximetro);
	console.log('\x1b[36m%s\x1b[0m',`\n Data Inserted: `);

	console.log('\x1b[32m',`\n \t CPF: ${cpf.toString()} \n \t ECG: ${ecg.toString()} \n \t Temperature: ${temperatura.toString()} \n \t Oximeter: ${oximetro.toString()}`);

        console.log('Transaction has been submitted');
	//peri
	//console.log('\x1b[8m');
	console.log('\b\b');
        // Disconnect from the gateway.
        await gateway.disconnect();
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error} \n`);
        response.error = error.message;
        return response;    
    }
	
}
