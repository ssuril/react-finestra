
import React, { Component } from "react";
import CanvasJSReact from './canvasjs.stock.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

class ChartViewer extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            dataPoints: [], 
            dataPointsHigh: [],
            dataPointsClose: [],
            isLoaded: false 
        };
      }
     
      componentDidMount() {
        fetch("https://canvasjs.com/data/gallery/react/btcusd2017-18.json")
          .then(res => res.json())
          .then(
            (data) => {
              var dps = [];
              var dpsclose = [];
              for (var i = 0; i < data.length; i++) {
                dps.push({
                 x: new Date(data[i].date),
                 y: Number(data[i].open)
               });
                dpsclose.push({
                    x: new Date(data[i].date),
                    y: Number(data[i].open)
                  });
              }
              this.setState({
                isLoaded: true,
                dataPoints: dps
              });
              //console.log('dataPointsClose' +this.state.dataPointsClose);
              //console.log('dpsClose' +this.state.dpsClose);
              //console.log('dataPoints' +this.state.dataPoints);
              //console.log('dps' +this.state.dps)
            }
          )
      }
     
      render() {
        const options = {
          title:{
            text:"Forex High Low Indicator"
          },
          theme: "light2",
          charts: [{
            axisX: {
              crosshair: {
                enabled: true,
                snapToDataPoint: true,
                valueFormatString: "MMM DD YYYY"
              }
            },
            axisY: {
              title: "Exchange Rate",
              crosshair: {
                enabled: true,
                snapToDataPoint: true,
                valueFormatString: "$#,###.##"
              }
            },
            toolTip: {
              shared: true
            },
            data: [{
                name: "High Value",
                type: "spline",
                color: "#6caff1" ,
                yValueFormatString: "$#,###.##",
                xValueFormatString: "MMM DD YYYY",
                dataPoints : this.state.dataPoints
              }]
          }]
        };
        const containerProps = {
          width: "100%",
          height: "450px",
          margin: "auto"
        };
        return (
          <div> 
            <div>
              {
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

export default ChartViewer;
      