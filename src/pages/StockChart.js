
import React, { Component } from "react";
import CanvasJSReact from './canvasjs.stock.react';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;


class StockChart extends Component {	

	constructor(props) {
		super(props);
		this.state = { 
			dataPoints1: [], 
			dataPoints2: [], 
            dataPoints3: [], 
			isLoaded: false ,
            period: null,
            isin: null
		};
        
        this.isins = [
            { name: 'TATA' },
            { name: 'RELIANCE' },
            { name: 'APPLE' },
            { name: 'AMC' },
            { name: 'BOSCH' }

        ]

		this.periods =  [
			{ name: 'FX DAILY' },
            { name: 'FX INTRADAY' },
            { name: 'FX MONTLY' }
		]

        this.onPeriodChange = this.onPeriodChange.bind(this);
        this.onIsinChange = this.onIsinChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
      }
      
		onPeriodChange(e){
			this.setState({ period: e.value });
        }

        onIsinChange(e){
            this.setState({ isin: e.value });
        }
        
        // handleChange(e) {
        //     this.setState({value: e.target.value});
        //     //alert('on change' + event.target.value);
        //   }

		handleSubmit(e) {
		 //e.preventDefault();
		alert(this.state.isin.name);
		//alert(this.state.termCcy.name);
		//alert(this.state.period.name);
		
		
				fetch("https://canvasjs.com/data/docs/ltcusd2018.json")
				.then(res => res.json())
				.then(
				(data) => {
					var dps1 = [], dps2 = [], dps3 = [];
					for (var i = 0; i < data.length; i++) {
					dps1.push({
						x: new Date(data[i].date),
						y: [
						Number(data[i].open),
						Number(data[i].high),
						Number(data[i].low),
						Number(data[i].close)
						]
					});
					dps2.push({x: new Date(data[i].date), y: Number(data[i].volume_usd)});
					dps3.push({x: new Date(data[i].date), y: Number(data[i].close)});
					}
					this.setState({
					isLoaded: true,
					dataPoints1: dps1,
					dataPoints2: dps2,
					dataPoints3: dps3
					});
				}
				)
		}
	 

	  render() {
		const options = {
		  theme: "light2",
		  title:{
			text:"Stock High Low Indicator"
		  },
		  subtitles: [{
			text: "Stock Price"
		  }],
		  charts: [{
			axisX: {
			  lineThickness: 5,
			  tickLength: 0,
			  labelFormatter: function(e) {
				return "";
			  },
			  crosshair: {
				enabled: true,
				snapToDataPoint: true,
				labelFormatter: function(e) {
				  return "";
				}
			  }
			},
			axisY: {
			  title: "Amount",
			  tickLength: 0
			},
			toolTip: {
			  shared: true
			},
			data: [{
			  name: "Stock Value",
			  yValueFormatString: "$#,###.##",
			  type: "candlestick",
			  dataPoints : this.state.dataPoints1
			}]
		  }],
		  navigator: {
			data: [{
			  dataPoints: this.state.dataPoints3
			}],
			slider: {
			  minimum: new Date("2018-05-01"),
			  maximum: new Date("2018-07-01")
			}
		  }
		};
		const containerProps = {
		  width: "100%",
		  height: "450px",
		  margin: "auto"
		};
		return (
		  <div> 
			  <div className="p-formgroup-inline">
                    <div className="p-field">
                    <Dropdown value={this.state.isin} options={this.isins} onChange={this.onIsinChange} optionLabel="name" placeholder="ISIN CD" />
                    </div>
					<div className="p-field">
					<Dropdown value={this.state.period} options={this.periods} onChange={this.onPeriodChange} optionLabel="name" placeholder="Period" />
                    </div>
                    <Button type="button" label="Submit" onClick={this.handleSubmit}/>
                </div>
			<div>
			  {
				// Reference: https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
				this.state.isLoaded && 
				<CanvasJSStockChart containerProps={containerProps} options = {options}
				  /* onRef = {ref => this.chart = ref} */
				/>
			  }
			</div>
		  </div>
		);
	  }
}
 
export default StockChart;