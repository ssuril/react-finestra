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
import './CustomerTxnFee.css';


class CustomerTxnFee extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            selectFeeType: null,
            value: '',
            feeCcyType: null,
            roundType: null,
            date2: null,
            feeEntity: null,
            displayBasic2: false,
            showName:false,
            authorization: [],
            clearing:[],
            reversal:[],
            refund:[],
            networkFee:[],
            minAmount:[],
            maxAmount:[],
            fxPercent:[],
            demography:[],
            fmcg:[],
            customername:'',
            feechargeperiod:'',
            feecurrency:'',
            rounding:'',
            minPeriodFee:'',
            maxPeriodFee:'',
            periodFee:'',
            validityPeriod:'',

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
        this.handleChange = this.handleChange.bind(this);
       
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ showName:true});
        //alert('Customer Id  ' + this.state.value)
        let id = this.state.value;

        fetch("http://localhost:3004/customersFee/"+id)
          .then(res => res.json())
          .then(
            (data) => {
            this.setState({ customername: data.customername });
            this.setState({ feechargeperiod: data.feechargeperiod });
            this.setState({ feecurrency: data.feecurrency });
            this.setState({ rounding: data.rounding });
            this.setState({ minPeriodFee: data.minPeriodFee });
            this.setState({ maxPeriodFee: data.maxPeriodFee });
            this.setState({ periodFee: data.periodFee });
            this.setState({ validityPeriod: data.validityPeriod });
   
       let authorizationelements = data.txnFeeStructure;
       console.log(authorizationelements)
       let auth=[];
       let clr = [];
       let revr = [];
       let refu = [];
       let nwtfee = [];
       let minamt = [];
       let maxamt = [];
       let fxper= [];
       let demo = [];
       let fmc = [];

       //items.push(<li key={index}>{value}</li>)
         for (const [index, value] of authorizationelements.entries()) {
            auth.push(<InputText id={value.name} type="text" className="p-d-block p-mb-3" placeholder="%" value={value.authVal}/>)
            clr.push(<InputText id={value.name} type="text" className="p-d-block p-mb-3" placeholder="%" value={value.clearVal}/>)
            revr.push(<InputText id={value.name} type="text" className="p-d-block p-mb-3" placeholder="%" value={value.reverVal}/>)
            refu.push(<InputText id={value.name} type="text" className="p-d-block p-mb-3" placeholder="%" value={value.refVal}/>)
            nwtfee.push(<InputText id={value.name} type="text" className="p-d-block p-mb-3" placeholder="%" value={value.networkFee}/>)
            minamt.push(<InputText id={value.name} type="text" className="p-d-block p-mb-3" placeholder="%" value={value.minAmtVal}/>)
            maxamt.push(<InputText id={value.name} type="text" className="p-d-block p-mb-3" placeholder="%" value={value.maxAmtVal}/>)
            fxper.push(<InputText id={value.name} type="text" className="p-d-block p-mb-3" placeholder="%" value={value.fxVal}/>)
            demo.push(<InputText id={value.name} type="text" className="p-d-block p-mb-3" placeholder="%" value={value.demogVal}/>)
            fmc.push(<InputText id={value.name} type="text" className="p-d-block p-mb-3" placeholder="%" value={value.fmcgVal}/>)

        }

            this.setState({
                authorization: auth,
                clearing:clr,
                reversal:revr,
                refund:refu,
                networkFee:nwtfee,
                minAmount:minamt,
                maxAmount:maxamt,
                fxPercent:fxper,
                demography:demo,
                fmcg:fmc,
                });
            }
            )

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

        let isDataRetrived = this.state.showName;

        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => this.onHide(name)} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => this.onHide(name)} autoFocus />
            </div>
        );
    }

    render() {
        let isDataRetrived = this.state.showName;

        return (
            
            <div className="custform">
                <div className="p-formgroup-inline">
                     <div className="p-field">
                        <label htmlFor="customerId" className="p-sr-only">Customer Id</label>
                        <InputText id="customerId" type="text" placeholder="Customer Id" 
                            value={this.state.value} onChange={this.handleChange}/>
                    </div>
                     <Button type="button" label="Submit" onClick={this.handleSubmit}/>
                </div>

            {
                isDataRetrived &&      
             <div className="dropdown-demo">

                <Accordion activeIndex={0} multiple="true">
                    <AccordionTab header="Customer Fee's">
                           <div className="custdetails">
                            <div className="p-field p-grid">
                                <label htmlFor="customerName" className="p-col-fixed" style={{width:'200px'}}>Customer Name</label>
                                <InputText value={this.state.customername} id="customerName" className="p-col-fixed" style={{width:'200px'}} type="text"/>
                            </div>
                            <div className="p-field p-grid">
                                <label htmlFor="feePeriod" className="p-col-fixed" style={{width:'200px'}}>Fees Charged Period</label>
                                <InputText value={this.state.feechargeperiod} id="feechargeperiod" className="p-col-fixed" style={{width:'200px'}} type="text"/>
                            </div>
                            <div className="p-field p-grid">
                                <label htmlFor="feeCurrency" className="p-col-fixed" style={{width:'200px'}}>Fees Currency</label>
                                <InputText value={this.state.feecurrency} id="feecurrency" className="p-col-fixed" style={{width:'200px'}} type="text"/>                            </div>
                            <div className="p-field p-grid">
                                <label htmlFor="Rounding" className="p-col-fixed" style={{width:'200px'}}>Rounding</label>
                                <InputText value={this.state.rounding} id="rounding" className="p-col-fixed" style={{width:'200px'}} type="text"/>                            </div>
                            <div className="p-field p-grid">
                                <label htmlFor="minFee" className="p-col-fixed" style={{width:'200px'}}>Minimum Period Fee</label>
                                <InputText value={this.state.minPeriodFee} id="minPeriodFee" className="p-col-fixed" style={{width:'200px'}} type="text"/>                            </div>
                            <div className="p-field p-grid">
                                <label htmlFor="maxFee" className="p-col-fixed" style={{width:'200px'}}>Maximun Period Fee</label>
                                <InputText value={this.state.maxPeriodFee} id="maxPeriodFee" className="p-col-fixed" style={{width:'200px'}} type="text"/>                            </div>
                            <div className="p-field p-grid">
                                <label htmlFor="periodFee" className="p-col-fixed" style={{width:'200px'}}>Period Fee</label>
                                <InputText value={this.state.periodFee} id="periodFee" className="p-col-fixed" style={{width:'200px'}} type="text"/>                            </div>
                            <div className="p-field p-grid">
                                <label htmlFor="feeValidity" className="p-col-fixed" style={{width:'200px'}}>Validity Period</label>
                                <InputText value={this.state.validityPeriod} id="validityPeriod" className="p-col-fixed" style={{width:'200px'}} type="text"/>                            </div>
                            <div className="p-field p-grid" style={{width:'900px'}}>
                                <div className="p-field p-col">
                                    <label htmlFor="atm" className="p-col-fixed" style={{width:'200px'}} >ATM Txn Fee</label>
                                    <InputText value = '5.00' id="atm" className="p-col-fixed" style={{width:'200px'}} type="text"/>
                                </div>
                                <div className="p-field p-col">
                                    <label htmlFor="online" className="p-col-fixed" style={{width:'200px'}} >Online Txn Fee</label>
                                    <InputText value = '1.00' id="online" className="p-col-fixed" style={{width:'200px'}} type="text"/>
                                </div>
                                <div className="p-field p-col">
                                    <label htmlFor="branch" className="p-col-fixed" style={{width:'200px'}} >Branch</label>
                                    <InputText value = '2.50' id="branch" className="p-col-fixed" style={{width:'200px'}} type="text"/>
                                </div>
                            </div>
                            <div >
                            <label htmlFor="customerLoyality" className="p-col-fixed" style={{width:'200px'}}>Customer Loyality</label>
                                     <Rating value={3} readonly stars={5} cancel={false} />                            </div>
                        </div>
                    </AccordionTab>
                    </Accordion>
                     <Button label="Customer Transaction Fee" icon="pi pi-external-link" onClick={() => this.onClick('displayBasic2')} />
                
                     <Dialog header="Per Transaction Fee " visible={this.state.displayBasic2} style={{ width: '1000px' }}
                      style={{ float: 'right' }}
                      footer={this.renderFooter('displayBasic2')} onHide={() => this.onHide('displayBasic2')}>
                     <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-1">
                            <label htmlFor="feeStructure">Fee Structure</label>
                            <label htmlFor="firstXtxn" className="p-d-block">First 1k transactions</label>
                            <label htmlFor="btwXandYtxn">1K and 10K transactions</label>
                            <label htmlFor="moreYtxn">More than 10K transactions</label>
                            <label htmlFor="sendToX">Sent to Acquirer US</label>
                            <label htmlFor="sendToY">Sent to Acquirer EU</label>
                            <label htmlFor="txnValBlwA"> Value below 1K </label>
                            <label htmlFor="txnValBtwnAB">Value between 1K and 50K</label>
                            <label htmlFor="txnValBlwB">Value above 50K </label>
                        </div>
                        <div className="p-field p-col-12 p-md-1">
                            <label htmlFor="authorization">Authorization</label>
                            {this.state.authorization}
                        </div>
                        <div className="p-field p-col-12 p-md-1">
                            <label htmlFor="Clearing">Clearing</label>
                            {this.state.clearing}
                        </div>
                        <div className="p-field p-col-12 p-md-1">
                            <label htmlFor="Reversal">Reversal</label>
                            {this.state.reversal}
                        </div>
                        <div className="p-field p-col-12 p-md-1">
                            <label htmlFor="Refund">Refund</label>
                            {this.state.refund}
                        </div>
                        <div className="p-field p-col-12 p-md-1">
                            <label htmlFor="Network Fee">Network Fee</label>
                            {this.state.networkFee}
                        </div>
                        <div className="p-field p-col-12 p-md-1">
                            <label htmlFor="Min Amount">Min Amount</label>
                            {this.state.minAmount}
                        </div>
                        <div className="p-field p-col-12 p-md-1">
                            <label htmlFor="Max Amount">Max Amount</label>
                            {this.state.maxAmount}
                        </div>
                        <div className="p-field p-col-12 p-md-1">
                            <label htmlFor="Fx Percent">Fx Percent</label>
                            {this.state.fxPercent}
                        </div>
                        {/* <div className="p-field p-col-12 p-md-1">
                            <label htmlFor="Demography">Demography</label>
                            {this.state.demography}
                        </div> */}
                        <div className="p-field p-col-12 p-md-1">
                            <label htmlFor="FMCG">ESG</label>
                            {this.state.fmcg}
                        </div>
                    </div>
                    </Dialog>
                </div>
             }
            </div>       
        );
    }

}

export default CustomerTxnFee;