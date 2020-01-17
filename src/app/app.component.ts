import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent  {

  inputtext:string;
  canvas: any;
  ctx: any;
  clicked = false;
  flag=false;


  @ViewChild('mychart',{static:false}) mychart;

  /* white space, unwanted words removed and new text
    sent to count the words & result stored in final array */
  calculateWord(){

    let newText : string;
    let resultarray  = '';

    newText = this.inputtext.replace(/and|the|a|an/gi, "");
    newText = newText.replace(/[ ]{2,}/gi,"");
    newText = newText.replace (/(^\s*)|(\s*$)/gi,"");

    resultarray = this.Countword(newText);
    this.drawChart(resultarray);

  }
  

//Count total words
  
Countword(text) {
      return text.split(" ").reduce(function(count, word) {
        count[word] = count.hasOwnProperty(word) ? count[word] + 1 : 1;
        return count;
      }, {});

}

// Draw chart with values from word count
drawChart (resultarray){

this.canvas = this.mychart.nativeElement;
this.ctx = this.canvas.getContext('2d');

var gradientFill = this.ctx.createLinearGradient(0, 0, 0, 290);
gradientFill.addColorStop(0, "rgba(173, 53, 186, 1)");
gradientFill.addColorStop(1, "rgba(173, 53, 186, 0.1)");

let data = {
  labels: [],
    datasets: [{
      label:"Total words entered",
        backgroundColor: gradientFill,
      borderColor:'#AD35BA',
          borderWidth: 2,
        data: []
    }]
};
Chart.pluginService.register({
  beforeInit: function(chart) {
      let data = chart.config.data;
      for (let key in resultarray) {
          if (resultarray.hasOwnProperty(key)) {
            data.labels.push(key);
              data.datasets[0].data.push(resultarray[key]);
          }
      }
  }
});

let myChart = new Chart(this.ctx, {
  type: 'bar',
  data: data,
  options: {scales: {yAxes: [{ticks: {min: 0,
    stepSize: 1}}]}
  }});
}

}

