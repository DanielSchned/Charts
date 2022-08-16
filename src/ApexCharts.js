import React, { Component, useEffect } from 'react';
import './charts.scss';
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";


let data = [[Math.floor(new Date().getTime() / 1000), 0]];
let data2 = [[Math.floor(new Date().getTime() / 1000), 0]];
let data3 = [[Math.floor(new Date().getTime() / 1000), 0]];



export default class ApexChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        colors: ['#8f15bf', '#c066e3', '#430c59'],
        chart: {
          id: "realtime",
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
          type: "datetime",
          range: 10,

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
    const time = Math.floor(new Date().getTime() / 1000);

    var y = data[data.length - 1][1] + (Math.random() > 0.5 ? Math.floor(Math.random() * 30) : -Math.floor(Math.random() * 10));
    var y2 = data2[data2.length - 1][1] + (Math.random() > 0.5 ? Math.floor(Math.random() * 10) : -Math.floor(Math.random() * 10));
    var y3 = data3[data3.length - 1][1] + (Math.random() > 0.5 ? Math.floor(Math.random() * 10) : -Math.floor(Math.random() * 10));

    if(y <= -50){
      debugger
      y = -50
    }
    if(y2 <= -50){
      y2 = -50
    }
    if(y3 <= -50){
      y3 = -50
    }
    if (data[data.length - 1][1] < 50) {
      data.push([time, y]);
    } else {

      const index = this.state.player.findIndex(player => player === "data")
      if (index !== -1) {
        this.state.player.splice(index, 2)
        this.setState({ player: this.state.player })
      }
    }

    if (data2[data2.length - 1][1] < 50) {
      data2.push([time, y2]);
    } else {
    
      const index = this.state.player.findIndex(player => player === "data2")
      if (index !== -1) {
        this.state.player.splice(index, 2)
        this.setState({ player: this.state.player }, {chart: this.state.animations})
      }
    }

    if (data3[data3.length - 1][1] < 50) {
      data3.push([time, y3]);
    } else {

      const index = this.state.player.findIndex(player => player === "data3")
      if (index !== -1) {
        this.state.player.splice(index, 2)
        this.setState({ player: this.state.player })
      }
    }


    ApexCharts.exec("realtime", "updateSeries", [
      {
        data: data
      },
      {
        data: data2
      },
      {
        data: data3
      }
    ])
    

    ApexCharts.exec('realtime', 'updateOptions', {
      annotations: {
        points: [{
          x: Math.floor(new Date().getTime() / 1000),
          y: data[data.length - 1][1],
          marker: {
            size: 1
          },
          image: {
            path: 'https://cdn-icons-png.flaticon.com/512/219/219983.png'
          }
        }, {
          x: Math.floor(new Date().getTime() / 1000),
          y: data2[data2.length - 1][1],
          marker: {
            size: 1
          },
          image: {
            path: 'https://cdn-icons-png.flaticon.com/512/219/219986.png'
          }
        }, {
          x: Math.floor(new Date().getTime() / 1000),
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
      chart: {
        animations: {
          enabled: true,
          easing: 'linear',
          speed: 800,
          dynamicAnimation: {
              enabled: true,
              speed: 350
          }
      }
      }
    })
    
  };

  componentDidMount() {
    this.updateInterval = setInterval(() => this.updateData(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  resetData = () => {
    const { data } = this.state.series[0];

    this.setState({
      series: [{ data: data.slice(data.length - 10, data.length) }]
    });
  };


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
        <Chart id = "chartid" options={options} series={series} />
        <div id="box-inv"><img id="id1" src="https://cdn-icons-png.flaticon.com/512/149/149071.png"></img><span id = "winner">GAGNANT !</span></div>
      </div>


    )
  }
}
