import { Component, Prop, h, State } from "@stencil/core";
import moment from "moment";
import extendMoment from "moment-range";

@Component({
  tag: "adl-calendar",
  styleUrl: "calendar.scss",
  shadow: true
})
export class Calendar {
  @Prop() first: string;
  @Prop() middle: string;
  @Prop() last: string;
  @Prop({ reflect: true }) titleCard: string;
  @State() showCard: boolean = false;
  year(e) {
    console.log(e);
    this.titleCard = "Selecciona el año";
    console.log(this.titleCard);
    this.showCard = !this.showCard;
  }
  month(e) {
    console.log(e);
    this.titleCard = "Selecciona el mes";
  }
  day(e) {
    console.log(e);
  }
  selectYear(e: any, element: string) {
    console.log("e", e);
    console.log("element", element);
  }

  getCalendar() {
    let momentExtend = extendMoment.extendMoment(moment);
    let start  = new Date(1950, 1, 1);
    let end    = new Date(2060, 1, 1);
    let range = momentExtend.range(start,end);
    let years = Array.from(range.by('year'));
    let yearList = years.map(m => m.format('YYYY'));
    console.log("yearList-->" + yearList);
    let monthlist = moment.months();
    console.log("monthlist-->" + monthlist);

    const daysName = moment.localeData().weekdaysShort();
    console.log("name days--> " + daysName);
    
    //days of month selected
    const arrayLength = moment("2019-10", "YYYY-MM").daysInMonth();
    console.log("arraylength-->" +  arrayLength);


    //start day of month
    const firstDay = daysName.indexOf(moment("2019-10").startOf('month').format('ddd'));
    
    console.log("int day-->" + firstDay);
    //Array days
    const arrayDays = new Array(arrayLength);
    let count = 1; 
		for (var i = 0; i < arrayLength; i++){
          arrayDays[i] = count;
          count++;
    };
   
    console.log("amout days of month-->" + arrayDays); // 31
    //Matrix of day
    const arrayDaysMatrix = arrayDays.fill(0, 0 ,firstDay); 

    console.log("days organized to matrix-->" + arrayDaysMatrix);
 






    


  }

  render() {
    this.getCalendar();
    const arrayListYear = yearList;
    return (
      <div class='calendar'>
        <div class='calendar__input'>
          <input
            onClick={e => {
              this.year(e);
            }}
            placeholder='Year'
          />
          /
          <input
            onClick={e => {
              this.month(e);
            }}
            placeholder='Month'
          />
          /<input placeholder='Day' />
        </div>
        {this.showCard && (
          <div class='calendar__card'>
            <div>{this.titleCard}</div>
            <br />
            <div class='calendar__item'>
              {arrayListYear.map(element => {
                return (
                  <div onClick={e => this.selectYear(e, element)}>
                    {element}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}
let yearList;
let monthList;
