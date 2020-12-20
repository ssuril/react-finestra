import React, { Component } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Rating } from 'primereact/rating';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './FeeTemplate.css';


class FeeTemplate extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            selectFeeType: null,
            feeCcyType: null,
            roundType: null,
            date2: null,
            feeEntity: null,
            displayBasic2: false
        };

        this.feeTypes = [
            { name: 'Year', code: 'YR' },
            { name: 'Month', code: 'MN' },
            { name: 'Week', code: 'WK' },
            { name: 'Day', code: 'DY' }
        ];

        this.feeCcyTypes = [
            { name: 'AUD', code: 'AU' },
            { name: 'AED', code: 'AE' },
            { name: 'EUR', code: 'EU' },
            { name: 'GBP', code: 'GB' },
            { name: 'INR', code: 'IN' },
            { name: 'JPY', code: 'JP' },
            { name: 'NZD', code: 'NZ' },
            { name: 'USD', code: 'US' }
        ]

        this.roundTypes = [
            { name: 'Up', code: 'up' },
            { name: 'Down', code: 'dw' },
            { name: 'Nearest', code: 'nr' }
        ]

        this.feeEntites = [
            {name: 'ATM'},
            {name: 'BRANCH'},
            {name: 'ONLINE'},
        ]

        this.onFeeTypChange = this.onFeeTypChange.bind(this);
        this.onFeeCcyTypChange = this.onFeeCcyTypChange.bind(this);
        this.onRoundTypChange = this.onRoundTypChange.bind(this);
        this.onFeeEntityChange = this.onFeeEntityChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
    }
    onFeeTypChange(e) {
        this.setState({ selectFeeType: e.value });
    }

    onFeeCcyTypChange(e) {
        this.setState({ feeCcyType: e.value });
    }

    onRoundTypChange(e){
        this.setState({ roundType: e.value });
    }

    onFeeEntityChange(e){
        this.setState({ feeEntity: e.value });
    }

    onClick(name, position) {
        let state = {
            [`${name}`]: true
        };

        if (position) {
            state = {
                ...state,
                position
            }
        }

        this.setState(state);
    }

    onHide(name) {
        this.setState({
            [`${name}`]: false
        });
    }

    renderFooter(name) {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => this.onHide(name)} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => this.onHide(name)} autoFocus />
            </div>
        );
    }

    render() {
        return (
            <div className="dropdown-demo">
                <Accordion activeIndex={0} multiple="true">
                    <AccordionTab header="Customer Fee Set Up">
                            <div className="p-field p-grid">
                                <label htmlFor="customerName" className="p-col-fixed" style={{width:'200px'}}>Customer Name</label>
                                <InputText id="customerName" className="p-col-fixed" style={{width:'200px'}} type="text"/>
                            </div>
                            <div className="p-field p-grid">
                                <label htmlFor="feePeriod" className="p-col-fixed" style={{width:'200px'}}>Fees Charged Period</label>
                                <Dropdown value={this.state.selectFeeType} options={this.feeTypes} onChange={this.onFeeTypChange} optionLabel="name" placeholder="Select Fee Type" />
                            </div>
                            <div className="p-field p-grid">
                                <label htmlFor="feeCurrency" className="p-col-fixed" style={{width:'200px'}}>Fees Currency</label>
                                <Dropdown value={this.state.feeCcyType} options={this.feeCcyTypes} onChange={this.onFeeCcyTypChange} optionLabel="name" placeholder="Select Fee Ccy" />
                            </div>
                            <div className="p-field p-grid">
                                <label htmlFor="Rounding" className="p-col-fixed" style={{width:'200px'}}>Rounding</label>
                                <Dropdown value={this.state.roundType} options={this.roundTypes} onChange={this.onRoundTypChange} optionLabel="name" placeholder="Select Rounding" />
                            </div>
                            <div className="p-field p-grid">
                                <label htmlFor="minFee" className="p-col-fixed" style={{width:'200px'}}>Minimum Period Fee</label>
                                <InputText id="minFee" className="p-col-fixed" style={{width:'200px'}} type="text"/>
                            </div>
                            <div className="p-field p-grid">
                                <label htmlFor="maxFee" className="p-col-fixed" style={{width:'200px'}}>Maximun Period Fee</label>
                                <InputText id="maxFee" className="p-col-fixed" style={{width:'200px'}} type="text"/>
                            </div>
                            <div className="p-field p-grid">
                                <label htmlFor="periodFee" className="p-col-fixed" style={{width:'200px'}}>Period Fee</label>
                                <InputText id="periodFee" className="p-col-fixed" style={{width:'200px'}} type="text"/>
                            </div>
                            <div className="p-field p-grid">
                                <label htmlFor="feeValidity" className="p-col-fixed" style={{width:'200px'}}>Validity Period</label>
                                <Calendar id="feeValidity" value={this.state.date2} onChange={(e) => this.setState({ date2: e.value })} showIcon />
                            </div>
                            <div className="p-field p-grid">
                                <label htmlFor="feeEntityPeriod" className="p-col-fixed" style={{width:'200px'}}>Fee Per Entity In Period</label>
                                <Dropdown value={this.state.feeEntity} options={this.feeEntites} onChange={this.onFeeEntityChange} optionLabel="name" placeholder="Fee Entity" />
                            </div>
                            <div >
                            <label htmlFor="customerLoyality" className="p-col-fixed" style={{width:'200px'}}>Customer Loyality</label>
                                 <Rating value={this.state.val2} cancel={false} onChange={(e) => this.setState({val2: e.value})} />
                            </div>
                            <div className="p-field p-grid">
                                
                            </div>
                            <div className="p-field p-grid">
                                <Button type="button" label="Submit" onClick={this.handleSubmit}/>
                            </div>
                    </AccordionTab>
                    </Accordion>
                     <Button label="Transaction Fee Set Up" icon="pi pi-external-link" onClick={() => this.onClick('displayBasic2')} />
                     <Dialog header="Per Transaction Fee " visible={this.state.displayBasic2} style={{ width: '100vw' }} footer={this.renderFooter('displayBasic2')} onHide={() => this.onHide('displayBasic2')}>
                     <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-1">
                            <label htmlFor="feeStructure">Fee Structure</label>
                            <label htmlFor="btwXandYtxn">First X transactions</label>
                            <label htmlFor="btwXandYtxn">X and Y transactions</label>
                            <label htmlFor="moreYtxn">More than Y transactions</label>
                            <label htmlFor="sendToX">Sent to Acquirer X</label>
                            <label htmlFor="sendToY">Sent to Acquirer Y</label>
                            <label htmlFor="txnValBlwA"> Value below A</label>
                            <label htmlFor="txnValBtwnAB">Value between A and B</label>
                            <label htmlFor="txnValBlwB">Value above B</label>
                        </div>
                        <div className="p-field p-col-12 p-md-1">
                            <label htmlFor="authorization">Authorization</label>
                            <InputText id="firstXtxnAuth" type="text" className="p-d-block p-mb-3" placeholder="%"/>
                            <InputText id="btwXandYtxnAuth" type="text" className="p-d-block p-mb-2" placeholder="%"/>
                            <InputText id="moreYtxnAuth" type="text" className="p-d-block p-mb-2" placeholder="%"/>
                            <InputText id="sendToXAuth" type="text" className="p-d-block p-mb-3" placeholder="%"/>
                            <InputText id="sendToYAuth" type="text" className="p-d-block p-mb-3" placeholder="%"/>
                            <InputText id="txnValBlwAAuth" type="text" className="p-d-block p-mb-2" placeholder="%"/>
                            <InputText id="txnValBtwnABAuth" type="text" className="p-d-block p-mb-3" placeholder="%"/>
                            <InputText id="txnValBlwBAuth" type="text" className="p-d-block p-mb-3" placeholder="%"/>
                        </div>
                        <div className="p-field p-col-12 p-md-1">
                            <label htmlFor="clearing">Clearing</label>
                            <InputText id="firstXtxnClear" type="text" className="p-d-block p-mb-3" placeholder="%"/>
                            <InputText id="btwXandYtxnClear" type="text" className="p-d-block p-mb-2" placeholder="%"/>
                            <InputText id="moreYtxnAuthClear" type="text" className="p-d-block p-mb-2" placeholder="%"/>
                            <InputText id="sendToXAuthClear" type="text" className="p-d-block p-mb-3" placeholder="%"/>
                            <InputText id="sendToYAuthClear" type="text" className="p-d-block p-mb-3" placeholder="%"/>
                            <InputText id="txnValBlwAAuthClear" type="text" className="p-d-block p-mb-2" placeholder="%"/>
                            <InputText id="txnValBtwnABAuthClear" type="text" className="p-d-block p-mb-3" placeholder="%"/>
                            <InputText id="txnValBlwBAuthClear" type="text" className="p-d-block p-mb-3" placeholder="%"/>
                        </div>
                        <div className="p-field p-col-12 p-md-1">
                            <label htmlFor="Reversal">Reversal</label>
                            <InputText id="firstXtxnRvs" type="text" className="p-d-block p-mb-3" placeholder="Negate"/>
                            <InputText id="btwXandYtxnRvs" type="text" className="p-d-block p-mb-2" placeholder="Negate"/>
                            <InputText id="moreYtxnAuthRvs" type="text" className="p-d-block p-mb-2" placeholder="Negate"/>
                            <InputText id="sendToXAuthRvs" type="text" className="p-d-block p-mb-3" placeholder="Negate"/>
                            <InputText id="sendToYAuthRvs" type="text" className="p-d-block p-mb-3" placeholder="Negate"/>
                            <InputText id="txnValBlwAAuthRvs" type="text" className="p-d-block p-mb-2" placeholder="Negate"/>
                            <InputText id="txnValBtwnABAuthRvs" type="text" className="p-d-block p-mb-3" placeholder="Negate"/>
                            <InputText id="txnValBlwBAuthRvs" type="text" className="p-d-block p-mb-3" placeholder="Negate"/>
                        </div>
                        <div className="p-field p-col-12 p-md-1">
                            <label htmlFor="Refund">Refund</label>
                            <InputText id="firstXtxnRfd" type="text" className="p-d-block p-mb-3" placeholder="Negate"/>
                            <InputText id="btwXandYtxnRfd" type="text" className="p-d-block p-mb-2" placeholder="Negate"/>
                            <InputText id="moreYtxnAuthRfd" type="text" className="p-d-block p-mb-2" placeholder="Negate"/>
                            <InputText id="sendToXAuthRfd" type="text" className="p-d-block p-mb-3" placeholder="Negate"/>
                            <InputText id="sendToYAuthRfd" type="text" className="p-d-block p-mb-3" placeholder="Negate"/>
                            <InputText id="txnValBlwAAuthRfd" type="text" className="p-d-block p-mb-2" placeholder="Negate"/>
                            <InputText id="txnValBtwnABAuthRfd" type="text" className="p-d-block p-mb-3" placeholder="Negate"/>
                            <InputText id="txnValBlwBAuthRfd" type="text" className="p-d-block p-mb-3" placeholder="Negate"/>
                        </div>
                        <div className="p-field p-col-12 p-md-1">
                            <label htmlFor="Network Fee">Network Fee</label>
                            <InputText id="firstXtxnNFee" type="text" className="p-d-block p-mb-3" placeholder="%" />
                            <InputText id="btwXandYtxnNFee" type="text" className="p-d-block p-mb-2" placeholder="%"/>
                            <InputText id="moreYtxnAuthNFee" type="text" className="p-d-block p-mb-2" placeholder="%"/>
                            <InputText id="sendToXAuthNFee" type="text" className="p-d-block p-mb-3" placeholder="%"/>
                            <InputText id="sendToYAuthNFee" type="text" className="p-d-block p-mb-3" placeholder="%"/>
                            <InputText id="txnValBlwAAuthNFee" type="text" className="p-d-block p-mb-2" placeholder="%"/>
                            <InputText id="txnValBtwnABAuthNFee" type="text" className="p-d-block p-mb-3" placeholder="%"/>
                            <InputText id="txnValBlwBAuthNFee" type="text" className="p-d-block p-mb-3" placeholder="%"/>
                        </div>
                        <div className="p-field p-col-12 p-md-1">
                            <label htmlFor="Min Amount">Min Amount</label>
                            <InputText id="firstXtxnMAmt" type="text" className="p-d-block p-mb-3" placeholder="" />
                            <InputText id="btwXandYtxnMAmt" type="text" className="p-d-block p-mb-2" placeholder=""/>
                            <InputText id="moreYtxnAuthMAmt" type="text" className="p-d-block p-mb-2" placeholder=""/>
                            <InputText id="sendToXAuthMAmt" type="text" className="p-d-block p-mb-3" placeholder=""/>
                            <InputText id="sendToYAuthMAmt" type="text" className="p-d-block p-mb-3" placeholder=""/>
                            <InputText id="txnValBlwAAuthMAmt" type="text" className="p-d-block p-mb-2" placeholder=""/>
                            <InputText id="txnValBtwnABAuthMAmt" type="text" className="p-d-block p-mb-3" placeholder=""/>
                            <InputText id="txnValBlwBAuthMAmt" type="text" className="p-d-block p-mb-3" placeholder=""/>
                        </div>
                        <div className="p-field p-col-12 p-md-1">
                            <label htmlFor="Max Amount">Max Amount</label>
                            <InputText id="firstXtxnMinAmt" type="text" className="p-d-block p-mb-3" placeholder="" />
                            <InputText id="btwXandYtxnMinAmt" type="text" className="p-d-block p-mb-2" placeholder=""/>
                            <InputText id="moreYtxnAuthMinAmt" type="text" className="p-d-block p-mb-2" placeholder=""/>
                            <InputText id="sendToXAuthMinAmt" type="text" className="p-d-block p-mb-3" placeholder=""/>
                            <InputText id="sendToYAuthMinAmt" type="text" className="p-d-block p-mb-3" placeholder=""/>
                            <InputText id="txnValBlwAAuthMinAmt" type="text" className="p-d-block p-mb-2" placeholder=""/>
                            <InputText id="txnValBtwnABAuthMinAmt" type="text" className="p-d-block p-mb-3" placeholder=""/>
                            <InputText id="txnValBlwBAuthMinAmt" type="text" className="p-d-block p-mb-3" placeholder=""/>
                        </div>
                        <div className="p-field p-col-12 p-md-1">
                            <label htmlFor="Fx Percent">Fx Percent</label>
                            <InputText id="firstXtxnFxTxn" type="text" className="p-d-block p-mb-3" placeholder="%" />
                            <InputText id="btwXandYtxnFxTxn" type="text" className="p-d-block p-mb-2" placeholder="%"/>
                            <InputText id="moreYtxnAuthFxTxn" type="text" className="p-d-block p-mb-2" placeholder="%"/>
                            <InputText id="sendToXAuthFxTxn" type="text" className="p-d-block p-mb-3" placeholder="%"/>
                            <InputText id="sendToYAuthFxTxn" type="text" className="p-d-block p-mb-3" placeholder="%"/>
                            <InputText id="txnValBlwAAuthFxTxn" type="text" className="p-d-block p-mb-2" placeholder="%"/>
                            <InputText id="txnValBtwnABAuthFxTxn" type="text" className="p-d-block p-mb-3" placeholder="%"/>
                            <InputText id="txnValBlwBAuthFxTxn" type="text" className="p-d-block p-mb-3" placeholder="%"/>
                        </div>
                        {/* <div className="p-field p-col-12 p-md-1">
                            <label htmlFor="Demography">Demography</label>
                            <InputText id="firstXtxnDmgr" type="text" className="p-d-block p-mb-3" placeholder="%" />
                            <InputText id="btwXandYtxnDmgr" type="text" className="p-d-block p-mb-2" placeholder="%"/>
                            <InputText id="moreYtxnAuthDmgr" type="text" className="p-d-block p-mb-2" placeholder="%"/>
                            <InputText id="sendToXAuthDmgr" type="text" className="p-d-block p-mb-3" placeholder="%"/>
                            <InputText id="sendToYAuthDmgr" type="text" className="p-d-block p-mb-3" placeholder="%"/>
                            <InputText id="txnValBlwAAuthDmgr" type="text" className="p-d-block p-mb-2" placeholder="%"/>
                            <InputText id="txnValBtwnABAuthDmgr" type="text" className="p-d-block p-mb-3" placeholder="%"/>
                            <InputText id="txnValBlwBAuthDmgr" type="text" className="p-d-block p-mb-3" placeholder="%"/>
                        </div> */}
                        <div className="p-field p-col-12 p-md-1">
                            <label htmlFor="FMCG">ESG</label>
                            <InputText id="firstXtxnFxFmcg" type="text" className="p-d-block p-mb-3" placeholder="%" />
                            <InputText id="btwXandYtxnFxFmcg" type="text" className="p-d-block p-mb-2" placeholder="%"/>
                            <InputText id="moreYtxnAuthFxFmcg" type="text" className="p-d-block p-mb-2" placeholder="%"/>
                            <InputText id="sendToXAuthFxFmcg" type="text" className="p-d-block p-mb-3" placeholder="%"/>
                            <InputText id="sendToYAuthFxFmcg" type="text" className="p-d-block p-mb-3" placeholder="%"/>
                            <InputText id="txnValBlwAAuthFxFmcg" type="text" className="p-d-block p-mb-2" placeholder="%"/>
                            <InputText id="txnValBtwnABAuthFxFmcg" type="text" className="p-d-block p-mb-3" placeholder="%"/>
                            <InputText id="txnValBlwBAuthFxFmcg" type="text" className="p-d-block p-mb-3" placeholder="%"/>
                        </div>
                    </div>
                    </Dialog>
            </div>
        );
    }

}

export default FeeTemplate;