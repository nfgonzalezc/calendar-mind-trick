import { Component, Prop, h } from "@stencil/core";
import moment from 'moment';
import  extendMoment  from 'moment-range';

@Component({
  tag: "adl-calendar",
  styleUrl: "calendar.scss",
  shadow: true
})
export class Calendar {
  @Prop() first: string;
  @Prop() middle: string;
  @Prop() last: string;
  

  getCalendar(){
    let momentExtend = extendMoment.extendMoment(moment);
    let start  = new Date(1950, 1, 1);
    let end    = new Date(2060, 1, 1);
    let range = momentExtend.range(start,end);
    let years = Array.from(range.by('year'));
    let yearList = years.map(m => m.format('YYYY'));
    console.log(yearList);
    let monthlist = moment.months();
    console.log(monthlist);

    const localeData = moment.localeData()
    console.log(localeData.weekdaysShort());
    console.log( moment().get('date'));

    const arrayLength = moment("2019-09", "YYYY-MM").daysInMonth();
    console.log("arraylength-->" +  arrayLength);
  
    const arrayDays = new Array(arrayLength);
    let count = 1; 
		for (var i = 0; i < arrayLength; i++){
          arrayDays[i] = count;
          count++;
    };
   
    console.log("ArrayDays-->" + arrayDays); // 31
    //dia de inicio del mes
    console.log(moment().startOf('month').format('dd')); 

  }

  render() {
    this.getCalendar();
    return <div class="calendar">
      <div></div>
      <div></div>
      <div></div>
    </div>;
  }
}
