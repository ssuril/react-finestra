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

class YrlTransactions extends Component {	
 
    constructor(props) {
        super(props);
        this.state = {
            options: null,
            year: null,
            value: '',
            isDataFetched: false,
            northAmr: null,
            southAmr: [],
            asiaPfc: [],
            euRgn: [],
            oceanic: [],
            afri:[]
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onYearChange = this.onYearChange.bind(this);

        this.years = [
            { name: '2019' },
            { name: '2020' }
        ]
    }

    onYearChange(e){
        this.setState({ year: e.value });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }

    handleSubmit(event) {
        //alert('Year Is  ' + this.state.year.name)
        let id = this.state.year.name;

            fetch("http://localhost:3004/yearlyTxn/"+id)
                .then(res => res.json())
                .then(
                    (data) => { 
                        var naTxn = []; var euTxn = []; var asTxn = []; 
                        var ocTxn = []; var afTxn = [];var saTxn = [];
                      for (var i = 0; i < data.months.length; i++) {
                      
                        naTxn.push({
                                y: Number(data.months[i].NATxn),
                                label: data.months[i].month
                        });
                        euTxn.push({
                                y: Number(data.months[i].EUTxn),
                                label: data.months[i].month
                        });
                        asTxn.push({
                                y: Number(data.months[i].ASTxn),
                                label: data.months[i].month
                        });
                        ocTxn.push({
                                y: Number(data.months[i].OCTxn),
                                label: data.months[i].month
                        });
                        afTxn.push({
                                y: Number(data.months[i].AFTxn),
                                label: data.months[i].month
                        });
                        saTxn.push({
                                y: Number(data.months[i].SATxn),
                                label: data.months[i].month
                        });
                     }
                      this.setState({
                        isDataFetched:true,
                        northAmr: naTxn,
                        southAmr: saTxn,
                        asiaPfc: asTxn,
                        euRgn: euTxn,
                        oceanic: ocTxn,
                        afri: afTxn
                    });
                })
    }

    render() {
        let isDataRetrived = this.state.isDataFetched;

            if(isDataRetrived){
                var opt = {
                    animationEnabled: true,	
                    title:{
                        text: this.state.year.name + " Transaction Demographic View"
                    },
                    axisY : {
                        title: "Total Number Of Transaction"
                    },
                    toolTip: {
                        shared: true
                    },
                    data: [
                            {
                                type: "spline",
                                name: "North America",
                                showInLegend: true,
                                dataPoints: this.state.northAmr
                            },
                            {
                                type: "spline",
                                name: "South America",
                                showInLegend: true,
                                dataPoints: this.state.southAmr
                            },
                            {
                                type: "spline",
                                name: "EU",
                                showInLegend: true,
                                dataPoints: this.state.euRgn
                            },
                            {
                                type: "spline",
                                name: "Asia",
                                showInLegend: true,
                                dataPoints: this.state.asiaPfc
                            },
                            {
                                type: "spline",
                                name: "Oceania",
                                showInLegend: true,
                                dataPoints: this.state.oceanic
                            },
                            {
                                type: "spline",
                                name: "Africa",
                                showInLegend: true,
                                dataPoints: this.state.afri
                            },
                        ]
                }
            }


		return (
		<div>
            <div className="p-formgroup-inline">
                     <div className="p-field">
                       <Dropdown value={this.state.year} options={this.years} onChange={this.onYearChange} optionLabel="name" placeholder="Select Year" />
                    </div>
                     <Button type="button" label="Submit" onClick={this.handleSubmit}/>
                     <div className="txnrating">
                               <Rating value={this.state.val2} cancel={false} onChange={(e) => this.setState({val2: e.value})} />
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

export default YrlTransactions;