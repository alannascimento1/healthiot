/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Healthiot extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const healthiot = [
            {
                name: 'Patient1',
                ekg: '60',
                temperature: '36.5',
                oximeter: '96'
            },
            {
                name: 'Patient2',
                ekg: '61',
                temperature: '36.6',
                oximeter: '97'
            },
            {
                name: 'Patient3',
                ekg: '62',
                temperature: '36.7',
                oximeter: '98'
            },
            {
                name: 'Patient4',
                ekg: '63',
                temperature: '36.8',
                oximeter: '99'
            },
        ];

        for (let i = 0; i < healthiot.length; i++) {
            healthiot[i].docType = 'healthiot';
            await ctx.stub.putState('111.111.111-11', Buffer.from(JSON.stringify(healthiot[i])));
            console.info('Added <--> ', healthiot[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async createDatas(ctx, cpf, name, ekg, temperature, oximeter) {
       console.info('============= START : Create Car ===========');

        const datas = {
             name,
            docType: 'healthiot',
             ekg,
             temperature,
             oximeter
         };

         await ctx.stub.putState('111.111.111-11', Buffer.from(JSON.stringify(datas)));
         console.info('============= END : Create Healthiot ===========');
     }

    // async queryCar(ctx, carNumber) {
    //     const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
    //     if (!carAsBytes || carAsBytes.length === 0) {
    //         throw new Error(`${carNumber} does not exist`);
    //     }
    //     console.log(carAsBytes.toString());
    //     return carAsBytes.toString();
    // }

    // async createCar(ctx, carNumber, make, model, color, owner) {
    //     console.info('============= START : Create Car ===========');

    //     const car = {
    //         color,
    //         docType: 'car',
    //         make,
    //         model,
    //         owner,
    //     };

    //     await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
    //     console.info('============= END : Create Car ===========');
    // }

    async getAll(ctx) {
         const startKey = '';
         const endKey = '';
         const allResults = [];
         for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
             const strValue = Buffer.from(value).toString('utf8');
             let record;
             try {
                 record = JSON.parse(strValue);
             } catch (err) {
                 console.log(err);
                 record = strValue;
             }
             allResults.push({ Key: key, Record: record });
         }
         console.info(allResults);
         return JSON.stringify(allResults);
     }

    async getHistory(ctx, CPF) {
	const promiseOfIterator = ctx.stub.getHistoryForKey(CPF);

	const results = [];
	for await (const keyMod of promiseOfIterator) {
	    const resp = {
		timestamp: keyMod.timestamp,
		txid: keyMod.tx_id
	    }
	    if (keyMod.is_delete) {
		resp.data = 'KEY DELETED';
	    } else {
		resp.data = keyMod.value.toString('utf8');
	    }
	    results.push(resp);
	}
	// results array contains the key history
	return JSON.stringify(results);

    }

    // async changeCarOwner(ctx, carNumber, newOwner) {
    //     console.info('============= START : changeCarOwner ===========');

    //     const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
    //     if (!carAsBytes || carAsBytes.length === 0) {
    //         throw new Error(`${carNumber} does not exist`);
    //     }
    //     const car = JSON.parse(carAsBytes.toString());
    //     car.owner = newOwner;

    //     await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
    //     console.info('============= END : changeCarOwner ===========');
    // }

}

module.exports = Healthiot;
