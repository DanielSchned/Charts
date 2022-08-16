import React, { Component } from 'react';
import './charts.scss';
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
debugger
var i = 0;
var j = 0;
let data = [[i, 0]];
let data2 = [[i, 0]];
let data3 = [[i, 0]];
const NB = 10;


export default class ApexChart2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      options: {
        
        colors: ['#8f15bf', '#c066e3', '#430c59'],
        chart: {
          id: "realtime",
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 1000
            }
          },
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          },
          
          
        },
        
        
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },
        tooltip: {
          enabled: false,
        },
        title: {
          text: "CHART RACING",
          align: "left"
        },
        markers: {
          size: 0
        },
        xaxis: {
            
            type: "numeric",
            labels: {
              show: false
            }
          },

        yaxis: {
          max: 50,
          min: -50,
          labels: {
            show: false
          }
        },
        legend: {
          show: false
        }
      },

      series: [{
        data: data.slice(),
        data2: data2.slice(),
        data3: data3.slice(),

      }
      ],
      player: ["data","https://cdn-icons-png.flaticon.com/512/219/219983.png", "data2","https://cdn-icons-png.flaticon.com/512/219/219986.png", "data3", "https://www.pngmart.com/files/21/Admin-Profile-PNG-Clipart.png"]
    };
  };
  updateData = () => {
   
    if (this.state.player.length === 2) {
      return;
    }
    
    // const time = Math.floor(new Date().getTime() / 1000);
    var y = data[data.length - 1][1] + (Math.random() > 0.5 ? Math.floor(Math.random() * NB) : -Math.floor(Math.random() * NB));
    var y2 = data2[data2.length - 1][1] + (Math.random() > 0.5 ? Math.floor(Math.random() * NB): -Math.floor(Math.random() * NB));
    var y3 = data3[data3.length - 1][1] + (Math.random() > 0.5 ? Math.floor(Math.random() * NB) : -Math.floor(Math.random() * NB));

    if(y >= 50){
      y = 50
    }
    if(y2 >= 50){
      y2 = 50
    }
    if(y3 >= 50){
      y3 = 50
    }

    // if (data.length > 10) {
    //     data = data.slice(data.length - 10)
    //     data2 = data2.slice(data2.length - 10)
    //     data3 = data3.slice(data3.length - 10)
    //   }

    if (data[data.length - 1][1] > -50) {
        
      data.push([i, y]);
    } else {

      const index = this.state.player.findIndex(player => player === "data")
      if (index !== -1) {

        this.state.player.splice(index, 2)
        this.setState({ player: this.state.player })
        
      }
    }

    if (data2[data2.length - 1][1] > -50) {
      data2.push([i, y2]);
    } else {
    
      const index = this.state.player.findIndex(player => player === "data2")
      if (index !== -1) {
        
        this.state.player.splice(index, 2)
        this.setState({ player: this.state.player })
        
      }
    }

    if (data3[data3.length - 1][1] > -50) {
      data3.push([i, y3]);
    } else {

      const index = this.state.player.findIndex(player => player === "data3")
      if (index !== -1) {
        
        this.state.player.splice(index, 2)
        this.setState({ player: this.state.player })
        
      }
    }
    const seriesSortedByLength = this.state.series.sort((a, b) => a.data.length > b.data.length ? -1 : 1);
    this.setState({ series: [{ data:data }, {data:data2}, {data:data3}] }, () =>
        ApexCharts.exec("realtime", "updateSeries", this.state.series),
        ApexCharts.exec('realtime', 'updateOptions', {
            annotations: {
                points: [{
                  x: i,
                  y: data[data.length - 1][1],
                  marker: {
                    size: 1
                  },
                  image: {
                    path: 'https://cdn-icons-png.flaticon.com/512/219/219983.png'
                  }
                }, {
                  x: i,
                  y: data2[data2.length - 1][1],
                  marker: {
                    size: 1
                  },
                  image: {
                    path: 'https://cdn-icons-png.flaticon.com/512/219/219986.png',
                  }
                }, {
                  x: i,
                  y: data3[data3.length - 1][1],
                  marker: {
                    size: 1
                  },
                  image: {
                    path: 'https://www.pngmart.com/files/21/Admin-Profile-PNG-Clipart.png'
                  }
                }
                ],

              },
              xaxis: {
                min: seriesSortedByLength[0].data.length > 20 ? seriesSortedByLength[0].data.length - 20 : 0,
                max: seriesSortedByLength[0].data.length > 20 ? seriesSortedByLength[0].data.length : 20,
                type: "numeric",
                labels: {
                  show: false
                }
              },
              
         })
    );
    i = i + 1

  };

  componentDidMount() {
    this.updateInterval = setInterval(() => this.updateData(), 70);
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }


  render() {

    const { options, series, player } = this.state;
    if (this.state.player.length === 2){
      var img;
      var x = document.getElementById("id1");
      document.getElementById("winner").style.visibility = "visible";
      img = this.state.player[1];
      x.setAttribute("src", img);
    }
    

   
    return (


      <div id="box">
        <Chart id = "chartid" options={this.state.options} series={this.state.series} />
        <div id="box-inv"><img id="id1" src="https://cdn-icons-png.flaticon.com/512/149/149071.png"></img><span id = "winner">GAGNANT !</span></div>
      </div>


    )
  }
}
