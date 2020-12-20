import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import ReactDOM from 'react-dom';

import React, { Component } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './FeeSetup'
import { Dropdown } from 'primereact/dropdown';

class FeeSetup extends  Component { 

    emptyFeeStructure = {
        id: null,
        feeType: '',
        authorizationPrice: 0,
        clearingPrice: 0,
        reversalPrice: '',
        refundPrice: '',
        networkFeePrice: 0,
        minAmountPrice: 0,
        maxAmountPrice: 0,
        fxPercentPrice: 0,
        demographyPrice: 0,
        fmcgPrice: 0,
       
    };

    constructor(props) {
        super(props);

        this.state = {
            fees: null,
            fee: this.emptyFeeStructure,
            feeDialog: false,
            submitted: false,
            globalFilter: null,
            selectFeeType:null
        };


        this.feeTypes = [
            { name: 'Below 10K Txn' },
            { name: 'Between 10K - 50K' },
            { name: 'Above 100K' },
            { name: 'To US Region' },
            { name: 'To EU Region' },
            { name: 'To AS Region' },
            { name: 'Amount Below 5k' },
            { name: 'Amount Between 5k -10k' },
            { name: 'Amount Above 10k' }
        ];




        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
        this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
        this.openNew = this.openNew.bind(this);
        this.exportCSV = this.exportCSV.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.saveFeeProduct = this.saveFeeProduct.bind(this);
        this.onFeeTypChange = this.onFeeTypChange.bind(this);
        //this.saveProduct = this.saveProduct.bind(this);
        //this.editProduct = this.editProduct.bind(this);
    }


    findIndexById(id) {
        let index = -1;
        for (let i = 0; i < this.state.fees.length; i++) {
            if (this.state.fees[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId() {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }


    saveFeeProduct() {
        let state = { submitted: true };

        if (this.state.fee.feeType!=null) {
            // let fees = [...this.state.fees];
            // let fee = {...this.state.fee};
            // if (this.state.fee.id) {
            //     const index = this.findIndexById(this.state.fee.id);

            //     fees[index] = fee;
            //     this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Fee Updated', life: 3000 });
            // }
            // else {
            //     fee.id = this.createId();
            //     fees.push(fee);
            //     this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Fee Created', life: 3000 });
            // }
            var dps1 = [];
            let fee = this.state.fee
            fee.id = this.createId();
            dps1.push(fee);
            this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Fee Created', life: 3000 });

            console.log('save fee' + fee);
            console.log('save dps' + dps1);

            state = {
                ...state,
                fees: dps1,
                feeDialog: false,
                fee: this.emptyFeeStructure
            };
        }

        this.setState(state);
    }

    onInputChange(e, name) {
        //alert('onInputChange' +e.target.value)
        // const val = (e.target && e.target.value) || '';
        // let fee = {...this.state.fee};
        // fee['${feeType}'] = val;

        //this.setState({ fee: e.target.value });

        // const val = (e.target && e.target.value) || '';
        // let fee = {...this.state.fee};
        // fee['${name}'] = val;

        // this.setState({ fee });
       
        const val = (e.target && e.target.value) || '';
        let fee = {...this.state.fee};
        fee.feeType = val;
        this.setState({ fee });
    }

    onFeeTypChange(e) {
        console.log(e.value);
        this.setState({ selectFeeType: e.value });

        alert(e.value.name);
        this.state.fee.feeType = e.value.name;
        //this.setState({ fee });
        this.setState({ fee :[{"feeType":"Test"}]});
        console.log('onFeeTypChange' +this.state.fee.feeType);
    }

    openNew() {
        this.setState({
            fee: this.emptyFeeStructure,
            submitted: false,
            feeDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            feeDialog: false
        });
    }

    exportCSV() {
       
    }

    confirmDeleteSelected() {
        
    }

    leftToolbarTemplate() {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={this.confirmDeleteSelected} /> {/* disabled={!this.state.selectedProducts || !this.state.selectedProducts.length}*/} 
            </React.Fragment>
        )
    }

    rightToolbarTemplate() {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={this.exportCSV} />
            </React.Fragment>
        )
    }


    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" />
            </React.Fragment>
        );
    }
    
    render() {
            const header = (
                <div className="table-header">
                    <h5 className="p-m-0">Manage Products</h5>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search..." />
                    </span>
                </div>
            );
            const feeDialogFooter = (
                <React.Fragment>
                    <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                    <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveFeeProduct} />
                </React.Fragment>
            );
            const deleteProductDialogFooter = (
                <React.Fragment>
                    <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProductDialog} />
                    <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteProduct} />
                </React.Fragment>
            );
            const deleteProductsDialogFooter = (
                <React.Fragment>
                    <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProductsDialog} />
                    <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedProducts} />
                </React.Fragment>
            );
    
            return (
                <div className="datatable-crud-demo">
                    <Toast ref={(el) => this.toast = el} />
    
                    <div className="card">
                        <Toolbar left={this.leftToolbarTemplate} right={this.rightToolbarTemplate}></Toolbar>
                        <DataTable ref={(el) => this.dt = el} 
                             value={this.state.fees}
                             globalFilter={this.state.globalFilter}
                             header={header}>

                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="Fee Type" header="Fee Type" sortable></Column>
                        <Column field="Auth" header="Auth" sortable></Column>
                        <Column field="Clearing" header="Clearing"  sortable></Column>
                        <Column field="Reversal" header="Reversal" sortable></Column>
                        <Column field="Refund" header="Refund"  sortable></Column>
                        <Column field="Network Fee" header="Network Fee"  sortable></Column>
                        <Column field="Min Amt" header="Minimum Amount"  sortable></Column>
                        <Column field="Max Amt" header="Maximum Amount"  sortable></Column>
                        <Column field="Fx %" header="Fx Percent"  sortable></Column>
                        <Column field="Demographic" header="Demographic"  sortable></Column>
                        <Column field="FMCG" header="FMCG"  sortable></Column>
                       
                        <Column body={this.actionBodyTemplate}></Column>

                        </DataTable>    
                    </div>

                    <Dialog visible={this.state.feeDialog} style={{ width: '450px' }} header="Fee Set up" modal className="p-fluid" footer={feeDialogFooter} onHide={this.hideDialog}>
                    <div className="p-field">
                        <label htmlFor="name">Name</label>
                        {/* <InputText id="name" value={this.state.fee.feeType} onChange={(e) => this.onInputChange(e, 'name')} 
                        required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.fee.feeType })} /> 
                     */}
                        <Dropdown value={this.state.selectFeeType} options={this.feeTypes} 
                        onChange={this.onFeeTypChange} optionLabel="name" placeholder="Select Fee Type" />

                        {this.state.submitted && !this.state.fee.feeType && <small className="p-invalid">Fee is required.</small>} 
                    </div>
                </Dialog>

                {/* <Dialog visible={this.state.deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={this.hideDeleteProductDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.product && <span>Are you sure you want to delete <b>{this.state.product.name}</b>?</span>}
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={this.hideDeleteProductsDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.product && <span>Are you sure you want to delete the selected products?</span>}
                    </div>
                </Dialog> */}

                </div>
            );
        }
    

}

export default FeeSetup;