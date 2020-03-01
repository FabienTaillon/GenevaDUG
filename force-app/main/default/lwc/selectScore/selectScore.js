import { LightningElement, api, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord, getFieldValue , updateRecord } from 'lightning/uiRecordApi';
import ACCOUNT_ID_FIELD from '@salesforce/schema/Account.Id';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_SCORE_FIELD from '@salesforce/schema/Account.Score__c';

export default class SelectScore extends LightningElement {

    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: [ACCOUNT_NAME_FIELD,ACCOUNT_SCORE_FIELD] })
    account;

    get score() {
        return getFieldValue(this.account.data, ACCOUNT_SCORE_FIELD);
    }

    saveScore() {

        // Create the recordInput object
        const fields = {};
        fields[ACCOUNT_ID_FIELD.fieldApiName] = this.recordId;
        fields[ACCOUNT_SCORE_FIELD.fieldApiName] = this.template.querySelector("lightning-slider").value;

        const recordInput = { fields };

        updateRecord(recordInput)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: `Account "${getFieldValue(this.account.data, ACCOUNT_NAME_FIELD)}" was saved.`,
                    variant: 'success'
                })
            );
        })
        .catch(error => {
            console.log(error);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating record',
                    message: 'Contact your administrator',
                    variant: 'error'
                })
            );
        });
    }
}