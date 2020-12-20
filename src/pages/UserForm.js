import React, { Component } from 'react';
import './UserForm.css'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CustomerTxnFee from './CustomerTxnFee'

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

class UserForm extends Component{

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            firstName: '',
            lastName:'',
            dateOfBirth:'',
            addressLine1:'',
            addressLine2:'',
            accountdetails:[],
            transactiondetails:[],
            collateraldetails:[],
            expandedRows: null,
            showName:false
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

       
      }

      handleChange(event) {
        this.setState({value: event.target.value});
        //alert('on change' + event.target.value);
      }
    
      handleSubmit(event) {
        event.preventDefault();
        let id = this.state.value;
        this.setState({ value : ''});
        this.setState({ showName:true})
        fetch("http://localhost:3004/customers/"+id)
        .then(res => res.json())
        .then(
          (data) => {
            this.setState({ firstName: data.firstName });
            this.setState({ lastName: data.lastName });
            this.setState({ dateOfBirth: data.dateOfBirth });
            this.setState({ addressLine1 : data.addressLine1});
            this.setState({ addressLine2 : data.addressLine2});
            
            this.setState({ accountdetails: data.accountdetails });
            this.setState({ transactiondetails: data.transactiondetails});
            this.setState({collateraldetails : data.collateraldetails});
          });
      }

    render() {

     let isDataRetrived = this.state.showName;


        return (
      <div className='userform'>
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
              <div className="datatable-scroll-demo" scrollable scrollHeight="200px" style={{ width: '1300px' }}>
                      <Accordion activeIndex={0} multiple="true">
                              <AccordionTab header="Customer Details">
                             
                                <div className="p-fluid p-formgrid p-grid">
                                    <div className="p-field p-col-12 p-md-4">
                                        <label htmlFor="First Name" className="p-col-fixed" style={{width:'200px'}}>First Name</label>
                                        <InputText value={this.state.firstName} className="p-col-fixed" style={{width:'200px'}}/>
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                        <label htmlFor="Last Name" className="p-col-fixed" style={{width:'200px'}}>Last Name</label>
                                        <InputText value={this.state.lastName} className="p-col-fixed" style={{width:'200px'}}/>
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                        <label htmlFor="FDOB" className="p-col-fixed" style={{width:'200px'}}>DOB</label>
                                        <InputText value={this.state.dateOfBirth} className="p-col-fixed" style={{width:'200px'}}/>
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                        <label htmlFor="Address Line1" className="p-col-fixed" style={{width:'200px'}}>Address Line1 </label>
                                        <InputText value={this.state.addressLine1} className="p-col-fixed" style={{width:'200px'}} />
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                         <label htmlFor="Address Line2" className="p-col-fixed" style={{width:'200px'}}>Address Line2 </label>
                                        <InputText value={this.state.addressLine2} className="p-col-fixed" style={{width:'200px'}}/>
                                  </div>
                               </div>
                             
                              </AccordionTab>
                              <AccordionTab header="Account Details">
                                        <DataTable value={this.state.accountdetails} scrollable scrollHeight="200px" style={{ width: '1000px' }}>
                                            <Column field="accountId" header="Account ID" sortable></Column>
                                            <Column field="accountName" header="Account Name" sortable></Column>
                                            <Column field="accountType" header="Account Type" sortable></Column>
                                            <Column field="currency" header="Currency" sortable></Column>
                                        </DataTable>
                              </AccordionTab>
                              <AccordionTab header="Transaction Details">
                                        <DataTable value={this.state.transactiondetails} scrollable scrollHeight="200px" style={{ width: '1000px' }}>
                                            <Column field="accountId" header="Account ID" sortable></Column>
                                            <Column field="currency" header="Currency" sortable></Column>
                                            <Column field="totaltxn" header="Total Txns" sortable></Column>
                                        </DataTable>
                              </AccordionTab>
                              <AccordionTab header="Collateral Details">
                                        <DataTable value={this.state.collateraldetails} scrollable scrollHeight="200px" style={{ width: '1000px' }}>
                                            <Column field="collateralType" header="Collateral Type" sortable></Column>
                                            <Column field="collateralStatus" header="Collateral Status" sortable></Column>
                                            <Column field="collateralValue" header="Collateral Value" sortable></Column>
                                            <Column field="collateralCcy" header="Collateral Ccy" sortable></Column>
                                            <Column field="collateralExpDate" header="Collateral Exp Date" sortable></Column>
                                        </DataTable>
                              </AccordionTab>
                          </Accordion>
              </div>
        }
       </div>
        );
      }

}

export default UserForm;
