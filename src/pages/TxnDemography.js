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

class TxnDemography extends Component {	

    constructor(props) {
        super(props);
        this.state = {
            options: null,
            year: null,
            goer: null,
            value: '',
            isDataFetched: false,
            northAmrIn: null,
            northAmrOut: null,
            northAmrIndex: null,
            southAmrIn :[],
            southAmrOut :[],
            southAmrIndex :[],
            asiaPfcIn: [],
            asiaPfcOut: [],
            asiaPfcIndex: [],
            euRgnIn: [],
            euRgnOut: [],
            euRgnIndex: [],
            oceanicIn: [],
            oceanicOut: [],
            oceanicIndex: [],
            afriIn:[],
            afriOut:[],
            afriIndex:[]
        };

        //this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleChange = this.handleChange.bind(this);
        this.onYearChange = this.onYearChange.bind(this);
        this.toggleDataSeries = this.toggleDataSeries.bind(this);
        this.ongoerChange = this.ongoerChange.bind(this);

        this.years = [
            { name: '2019' },
            { name: '2020' }
        ]

        this.goers = [
            {name: "Inbound NA"},
            {name: "Outbound NA"},
            {name: "Inbound SA"},
            {name: "Outbound SA"},
            {name: "Inbound EU"},
            {name: "Outbound EU"},
            {name: "Inbound OC"},
            {name: "Outbound OC"},
            {name: "Inbound AS"},
            {name: "Outbound AS"},
            {name: "Inbound AF"},
            {name: "Outbound AF"},
        ]
    }

    onYearChange(e){
        this.setState({ year: e.value });
    }


    ongoerChange(e){
        this.setState({ goer: e.value });
    
        let id = this.state.year.name;

        fetch("http://localhost:3004/yearlyTxn/"+id)
        .then(res => res.json())
        .then(
            (data) => { 
                 var naTxnIn = []; var naTxnOut = [];  var naTxnGeo = [];
                 var euTxnIn = []; var euTxnOut = [];  var euTxnGeo = []; 
                 var asTxnIn = []; var asTxnOut = [];  var asTxnGeo = [];
                 var ocTxnIn = []; var ocTxnOut = [];  var ocTxnGeo = [];
                 var afTxnIn = []; var afTxnOut = [];  var afTxnGeo = [];
                 var saTxnIn = []; var saTxnOut = [];  var saTxnGeo = [];

              for (var i = 0; i < data.months.length; i++) {
              
                naTxnIn.push({
                        y: Number(data.months[i].NAInTxn),
                        label: data.months[i].month
                });
                naTxnOut.push({
                    y: Number(data.months[i].NAOutTxn),
                    label: data.months[i].month
                });
                naTxnGeo.push({
                    y: Number(data.months[i].NAIndex),
                    label: data.months[i].month
                });

                
                euTxnIn.push({
                        y: Number(data.months[i].EUInTxn),
                        label: data.months[i].month
                 });
                euTxnOut.push({
                       y: Number(data.months[i].EUOutTxn),
                     label: data.months[i].month
                 });
                euTxnGeo.push({
                    y: Number(data.months[i].EUIndex),
                    label: data.months[i].month
                });



                asTxnIn.push({
                    y: Number(data.months[i].ASInTxn),
                    label: data.months[i].month
                });
                asTxnOut.push({
                    y: Number(data.months[i].ASOutTxn),
                    label: data.months[i].month
                });
                asTxnGeo.push({
                    y: Number(data.months[i].ASIndex),
                    label: data.months[i].month
                });


                ocTxnIn.push({
                    y: Number(data.months[i].OCInTxn),
                    label: data.months[i].month
                });
                ocTxnOut.push({
                    y: Number(data.months[i].OCOutTxn),
                    label: data.months[i].month
                });
                ocTxnGeo.push({
                    y: Number(data.months[i].OCIndex),
                    label: data.months[i].month
                });

                afTxnIn.push({
                    y: Number(data.months[i].AFInTxn),
                    label: data.months[i].month
                });
                afTxnOut.push({
                    y: Number(data.months[i].AFOutTxn),
                    label: data.months[i].month
                });
                afTxnGeo.push({
                    y: Number(data.months[i].AFIndex),
                    label: data.months[i].month
                });

                saTxnIn.push({
                    y: Number(data.months[i].SAInTxn),
                    label: data.months[i].month
                });
                saTxnOut.push({
                    y: Number(data.months[i].SAOutTxn),
                    label: data.months[i].month
                });
                saTxnGeo.push({
                    y: Number(data.months[i].SAIndex),
                    label: data.months[i].month
                });
                
             }
              this.setState({
                isDataFetched:true,
               
                northAmrIn: naTxnIn,
                northAmrOut: naTxnOut,
                northAmrIndex: naTxnGeo,
                southAmrIn :saTxnIn,
                southAmrOut :saTxnOut,
                southAmrIndex :saTxnGeo,
                asiaPfcIn: asTxnIn,
                asiaPfcOut: asTxnOut,
                asiaPfcIndex: asTxnGeo,
                euRgnIn: euTxnIn,
                euRgnOut: euTxnOut,
                euRgnIndex: euTxnGeo,
                oceanicIn: ocTxnIn,
                oceanicOut: ocTxnOut,
                oceanicIndex: ocTxnGeo,
                afriIn:afTxnIn,
                afriOut:afTxnOut,
                afriIndex:afTxnGeo
            });
        })
    }


    toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
    }
    
    render() {
 
        let isDataRetrived = this.state.isDataFetched;
        let dbt1=null;
        let dbt2=null;

            if(isDataRetrived){
                
                if(this.state.goer.name==="Inbound NA"){
                    dbt1 = this.state.northAmrIn ; 
                    dbt2 = this.state.northAmrIndex;      
                } else if(this.state.goer.name==="Outbound NA"){
                    dbt1 = this.state.northAmrOut ; 
                    dbt2 = this.state.northAmrIndex;   
                } else if(this.state.goer.name==="Inbound SA"){
                    dbt1 = this.state.southAmrIn ; 
                    dbt2 = this.state.southAmrIndex;   
                } else if(this.state.goer.name==="Outbound SA"){
                    dbt1 = this.state.southAmrOut ; 
                    dbt2 = this.state.southAmrIndex;   
                } else if(this.state.goer.name==="Inbound EU"){
                    dbt1 = this.state.euRgnIn ; 
                    dbt2 = this.state.euRgnIndex;   
                } else if(this.state.goer.name==="Outbound EU"){
                    dbt1 = this.state.euRgnOut ; 
                    dbt2 = this.state.euRgnIndex;   
                } else if(this.state.goer.name==="Inbound OC"){
                    dbt1 = this.state.oceanicIn ; 
                    dbt2 = this.state.oceanicIndex;   
                } else if(this.state.goer.name==="Outbound OC"){
                    dbt1 = this.state.oceanicOut ; 
                    dbt2 = this.state.oceanicIndex;   
                } else if(this.state.goer.name==="Inbound AS"){
                    dbt1 = this.state.asiaPfcIn ; 
                    dbt2 = this.state.asiaPfcIndex;   
                } else if(this.state.goer.name==="Outbound AS"){
                    dbt1 = this.state.asiaPfcOut ; 
                    dbt2 = this.state.asiaPfcIndex;   
                } else if(this.state.goer.name==="Inbound AF"){
                    dbt1 = this.state.afriIn ; 
                    dbt2 = this.state.afriIndex;   
                } else if(this.state.goer.name==="Outbound AF"){
                    dbt1 = this.state.afriOut ; 
                    dbt2 = this.state.afriIndex;   
                }
            }

		const options = {
			theme: "light2",
			animationEnabled: true,
			title:{
				text: "Transaction VS Demographic Index"
			},
			subtitles: [{
				text: "Click Legend to Hide or Unhide Data Series"
			}],
			axisX: {
				title: "Months"
			},
			axisY: {
				title: "Total Transaction",
				titleFontColor: "#6D78AD",
				lineColor: "#6D78AD",
				labelFontColor: "#6D78AD",
				tickColor: "#6D78AD"
			},
			axisY2: {
				title: "Demography",
				titleFontColor: "#51CDA0",
				lineColor: "#51CDA0",
				labelFontColor: "#51CDA0",
				tickColor: "#51CDA0"
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: [{
				type: "line",
				name: "Total Transaction",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				
				dataPoints: dbt1
			},
			{
				type: "line",
				name: "Demography",
				axisYType: "secondary",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				
				dataPoints: dbt2
			}]
		}
		
		
		return (
		<div>
            <div className="p-formgroup-inline">
                     <div className="p-field">
                       <Dropdown value={this.state.year} options={this.years} onChange={this.onYearChange} optionLabel="name" placeholder="Select Year" />
                       <Dropdown value={this.state.goer} options={this.goers} onChange={this.ongoerChange} optionLabel="name" placeholder="Select Demography" />
                    </div> 
                    <div className="txnrating">
                               <Rating value={this.state.val2} cancel={false} onChange={(e) => this.setState({val2: e.value})} />
                     </div>  
                </div>
           { isDataRetrived &&
			<CanvasJSChart options = {options} 
                 onRef={ref => this.chart = ref}
			/>
           }
		</div>
		);
	}
}

export default TxnDemography;