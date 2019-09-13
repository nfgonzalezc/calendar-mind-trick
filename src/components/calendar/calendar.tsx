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
    const start = new Date(1950, 1, 1);
    const end = new Date(2060, 1, 1);
    const range = momentExtend.range(start, end);
    const years = Array.from(range.by("year"));
    yearList = years.map(m => m.format("YYYY"));
    console.log(yearList);
    monthList = moment.months();
    console.log(monthList);
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
