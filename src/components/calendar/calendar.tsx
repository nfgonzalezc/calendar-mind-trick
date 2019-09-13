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
    const start  = new Date(1950, 1, 1);
    const end    = new Date(2060, 1, 1);
    const range = momentExtend.range(start,end);
    const years = Array.from(range.by('year'));
    const yearList = years.map(m => m.format('YYYY'));
    console.log(yearList);
    const monthlist = moment.months();
    console.log(monthlist);
  }

  render() {
    return <div class="calendar">
      <div></div>
      <div></div>
      <div></div>
    </div>;
  }
}
