import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent  {
  name: string;
  finalarray:string[];
  canvas: any;
  ctx: any;
  finalvar:any;


  @ViewChild('mychart',{static:false}) mychart;

  ngAfterViewInit() {}

  calculateWord(text){
    text = text.replace(/and|the|a|an/g, "");
    text = text.replace(/[ ]{2,}/gi," ");
    text = text.replace (/(^\s*)|(\s*$)/gi,"");

    this.finalvar= this.Countword(text);

//call graph function with word array

    this.graphit(this.finalvar);
  }

  //function to draw graph

  graphit(finalvars){

    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    let data = {
      labels: [],
        datasets: [{
label:"Total words entered",
            backgroundColor: ['rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'],
            borderColor:[
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 2,
            data: []
        }]
    };
    Chart.pluginService.register({
      beforeInit: function(chart) {
          let data = chart.config.data;
          for (let key in finalvars) {
              if (finalvars.hasOwnProperty(key)) {
                data.labels.push(key);
                  data.datasets[0].data.push(finalvars[key]);
              }
          }
      }
  });
    let myChart = new Chart(this.ctx, {
      type: 'bar',
      data: data,
      options: {scales: {yAxes: [{ticks: {beginAtZero:true}}]}
      }});
  }


//Count total words

  Countword(text) {
      return text.split(" ").reduce(function(count, word) {
        count[word] = count.hasOwnProperty(word) ? count[word] + 1 : 1;
        return count;
      }, {});

}

}



