
import React, { Component } from "react";
import CanvasJSReact from './canvasjs.stock.react';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;


class ChartMulti extends Component {	

	constructor(props) {
		super(props);
		this.state = { 
			dataPoints1: [], 
			dataPoints2: [], 
			dataPoints3: [], 
			isLoaded: false ,
			baseCcy: null,
			termCcy: null,
			period: null
		};
		
		this.termCcys = [
			{ name: 'AUD', code: 'AU' },
            { name: 'AED', code: 'AE' },
            { name: 'EUR', code: 'EU' },
            { name: 'GBP', code: 'GB' },
            { name: 'INR', code: 'IN' },
            { name: 'JPY', code: 'JP' },
            { name: 'NZD', code: 'NZ' },
			{ name: 'USD', code: 'US' }
			
		]
		
		this.baseCcys = [
			{ name: 'EUR', code: 'EU' },
            { name: 'GBP', code: 'GB' },
            { name: 'USD', code: 'US' }
		]
		
		this.periods =  [
			{ name: 'FX DAILY' },
            { name: 'FX INTRADAY' },
            { name: 'FX MONTLY' }
		]

		
		this.onBaseCcysChange = this.onBaseCcysChange.bind(this);
		this.onTermCcysChange = this.onTermCcysChange.bind(this);
		this.onPeriodChange = this.onPeriodChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	  }

	  	onBaseCcysChange(e) {
       		 this.setState({ baseCcy: e.value });
		}
	
		onTermCcysChange(e){
			this.setState({ termCcy: e.value });
		}

		onPeriodChange(e){
			this.setState({ period: e.value });
		}

		handleSubmit(e) {
		 //e.preventDefault();
		//alert(this.state.baseCcy.name);
		//alert(this.state.termCcy.name);
		//alert(this.state.period.name);
		console.log(this.state.baseCcy.name);
		console.log(this.state.termCcy.name);
		console.log(this.state.period.name);
		
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
	 
	//   componentDidMount() {
	// 	//Reference: https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state
	// 	//let isSubmitClick = this.state.isSubmited;
	// 	//console.log(this.state.isSubmited);
		
	// 	fetch("https://canvasjs.com/data/docs/ltcusd2018.json")
	// 	  .then(res => res.json())
	// 	  .then(
	// 		(data) => {
	// 		  var dps1 = [], dps2 = [], dps3 = [];
	// 		  for (var i = 0; i < data.length; i++) {
	// 			dps1.push({
	// 			  x: new Date(data[i].date),
	// 			  y: [
	// 				Number(data[i].open),
	// 				Number(data[i].high),
	// 				Number(data[i].low),
	// 				Number(data[i].close)
	// 			  ]
	// 			});
	// 			dps2.push({x: new Date(data[i].date), y: Number(data[i].volume_usd)});
	// 			dps3.push({x: new Date(data[i].date), y: Number(data[i].close)});
	// 		  }
	// 		  this.setState({
	// 			isLoaded: true,
	// 			dataPoints1: dps1,
	// 			dataPoints2: dps2,
	// 			dataPoints3: dps3
	// 		  });
	// 		}
	// 	  )
		
	//   }
	
	componentDidMount(){

		
	}

	componentWillUnmount(){
		this.setState({
			isLoaded: true,
		});

	}

	  render() {
		const options = {
		  theme: "light2",
		  title:{
			text:"Forex High Low Indicator"
		  },
		  subtitles: [{
			text: "Exchange rate's"
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
			  title: "Exchange Rate",
			  tickLength: 0
			},
			toolTip: {
			  shared: true
			},
			data: [{
			  name: "Daily Forex",
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
						<Dropdown value={this.state.baseCcy} options={this.baseCcys} onChange={this.onBaseCcysChange} optionLabel="name" placeholder="Base Currency" />
                    </div>
                    <div className="p-field">
                        <Dropdown value={this.state.termCcy} options={this.termCcys} onChange={this.onTermCcysChange} optionLabel="name" placeholder="Term Currency" />
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
 
export default ChartMulti;