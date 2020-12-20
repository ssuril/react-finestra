import React, { Component } from "react";
import CanvasJSReact from './canvasjs.react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './YrlTransactions.css';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class BusinessSector extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            businessAcct: null,
            acctChg: false,
            ener: [],
            tour: [],
            ret: [],
            year: null,
            isDataFetched: false
        };

        this.onAcctChange = this.onAcctChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.onYearChange = this.onYearChange.bind(this);

        this.businessAcct = [
            { name: '01010OA00P209', sector: 'Energy' },
            { name: '01010OA00P205', sector: 'Tourism and Hospitality' },
            { name: '01010OA00P208', sector: 'Retail' }
        ]

        this.years = [
            { name: '2019' },
            { name: '2020' }
        ]
    }

    onYearChange(e){
        this.setState({ year: e.value });
    }

    onAcctChange(e){
        this.setState({ 
            businessAcct: e.value,
            acctChg: true 
        });
    }

    onAcctChange(e) {
        //alert('Year Is  ' + this.state.year.name)
        this.setState({ 
            businessAcct: e.value,
            acctChg: true 
        });
        let id = this.state.year.name;
            fetch("http://localhost:3004/yearlyTxn/"+id)
                .then(res => res.json())
                .then(
                    (data) => { 
                        var energy = []; var retail = []; var toursim = []; 
                      for (var i = 0; i < data.months.length; i++) {
                      //alert(data.months[i].energy)
                        energy.push({
                                y: Number(data.months[i].energy),
                                label: data.months[i].month
                        });
                        retail.push({
                                y: Number(data.months[i].retail),
                                label: data.months[i].month
                        });
                        toursim.push({
                                y: Number(data.months[i].tourism),
                                label: data.months[i].month
                        });
                    }
                      this.setState({
                        isDataFetched:true,
                        ener: energy,
                        tour: toursim,
                        ret: retail
                    });
                })
    }



    render(){
        let isDataRetrived = this.state.isDataFetched;
        if(isDataRetrived){
            var dataVal = [];
                if(this.state.businessAcct.sector==="Energy"){
                    dataVal = this.state.ener  ;       
                } else if(this.state.businessAcct.sector==="Retail"){
                    dataVal = this.state.ret  ;  
                }else {
                    dataVal = this.state.tour  ;  
                }
            
                var opt = {
                    animationEnabled: true,	
                    title:{
                      text:  this.state.year.name + " Indices View"
                    },
                    axisY : {
                        title: "Indices Percent"
                    },
                    toolTip: {
                        shared: true
                    },
                    data: [
                            {
                                type: "line",
                                name: "Indices",
                                showInLegend: true,
                                dataPoints: dataVal,
                                isDataFetched:false
                            }
                        ]
                }
            }
        
        return(
            <div>
                <div className="p-formgroup-inline">
                     <div className="p-field">
                         <div className="p-field">
                      <Dropdown value={this.state.year} options={this.years} onChange={this.onYearChange} optionLabel="name" placeholder="Select Year" />
                      <Dropdown value={this.state.businessAcct} options={this.businessAcct} onChange={this.onAcctChange} optionLabel="name" placeholder="Select Business Account" />
                        </div>
                      { this.state.acctChg && <div className="p-field">
                
                         
                       <label htmlFor="businessSector" className="p-col-fixed" style={{width:'200px'}}>Business Sector</label>
                       <InputText value={this.state.businessAcct.sector} id="feechargeperiod" className="p-col-fixed" style={{width:'200px'}} type="text"/>
    
                        {/* <Button type="button" label="Sector Performance Index" onClick={this.handleSubmit}/> */}
                        </div>
                        
                      }
                          <div className="txnrating">
                               <Rating value={this.state.val2} cancel={false} onChange={(e) => this.setState({val2: e.value})} />
                          </div>    
                     
                       </div>
                </div>
                {
                    isDataRetrived &&
			       <CanvasJSChart options = {opt} />
                }
            </div>
        );
    }

}	
export default BusinessSector;