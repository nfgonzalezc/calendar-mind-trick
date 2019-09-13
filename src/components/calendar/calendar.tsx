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
  @State() disableYear = false;
  @State() disableMonth = true;
  @State() disableDay = true;
  @State() valueInputYear: string;
  @State() valueInputMonth: string;
  @State() valueInputDay: string;
  year(e) {
    this.titleCard = "Selecciona el año";
    console.log(this.titleCard);
    this.showCard = true;
  }
  month(e) {
    this.titleCard = "Selecciona el mes";
    this.showCard = true;
  }
  day(e) {
    this.titleCard = "Selecciona el día";
    this.showCard = true;
    console.log(e);
  }
  selectYear(e: any, element: string) {
    console.log("e", e);
    console.log("element", element);
    this.valueInputYear = element;
    this.disableMonth = false;
    this.disableYear = true;
    this.showCard = false;
    this.month(e);
  }
  selectMonth(e: any, element: string) {
    console.log("e", e);
    console.log("element", element);
    this.valueInputMonth = element;
    this.disableMonth = true;
    this.disableDay = false;
    this.showCard = false;
  }
  selectDay(e: any, element: string) {
    console.log("e", e);
    console.log("element", element);
    this.valueInputDay = element;
  }

  getCalendar() {
    let momentExtend = extendMoment.extendMoment(moment);
    let start = new Date(1950, 1, 1);
    let end = new Date(2060, 1, 1);
    let range = momentExtend.range(start, end);
    let years = Array.from(range.by("year"));
    yearList = years.map(m => m.format("YYYY"));
    console.log("yearList-->" + yearList);
    monthList = moment.months();
    console.log("monthlist-->" + monthList);

    const daysName = moment.localeData().weekdaysShort();
    console.log("name days--> " + daysName);

    //days of month selected
    const arrayLength = moment("2019-10", "YYYY-MM").daysInMonth();
    console.log("arraylength-->" + arrayLength);

    //start day of month
    const firstDay = daysName.indexOf(
      moment("2019-10")
        .startOf("month")
        .format("ddd")
    );

    console.log("int day-->" + firstDay);
    //Array days
    const arrayDays = new Array(arrayLength);
    let count = 1;
    for (var i = 0; i < arrayLength; i++) {
      arrayDays[i] = count;
      count++;
    }

    console.log("amout days of month-->" + arrayDays); // 31
    //Matrix of day
    daysList = arrayDays.fill("", 0, firstDay);

    console.log("days organized to matrix-->" + daysList);
  }

  render() {
    this.getCalendar();
    const arrayListYear = yearList;
    const arrayListMonth = monthList;
    const arrayListDays = daysList;
    return (
      <div class='calendar'>
        <div class='calendar__input'>
          <input
            onClick={e => {
              this.year(e);
            }}
            placeholder='Year'
            autoFocus={true}
            disabled={this.disableYear}
            value={this.valueInputYear}
            onFocus={e => {
              this.year(e);
            }}
          />
          /
          <input
            onClick={e => {
              this.month(e);
            }}
            placeholder='Month'
            onFocus={e => {
              this.month(e);
            }}
            disabled={this.disableMonth}
            value={this.valueInputMonth}
          />
          /
          <input
            placeholder='Day'
            disabled={this.disableDay}
            value={this.valueInputDay}
            onClick={e => {
              this.day(e);
            }}
            onFocus={e => {
              this.month(e);
            }}
          />
        </div>
        {this.showCard && (
          <div class='calendar__card'>
            <div>{this.titleCard}</div>
            <br />
            {this.disableDay ? (
              <div class='calendar__item'>
                {!this.disableYear
                  ? arrayListYear.map(element => {
                      return (
                        <div onClick={e => this.selectYear(e, element)}>
                          {element}
                        </div>
                      );
                    })
                  : !this.disableMonth &&
                    arrayListMonth.map(element => {
                      return (
                        <div onClick={e => this.selectMonth(e, element)}>
                          {element}
                        </div>
                      );
                    })}
              </div>
            ) : (
              <div class='calendar__item calendar__item-day'>
                {this.showCard &&
                  !this.disableDay &&
                  arrayListDays.map(element => {
                    return (
                      <div onClick={e => this.selectDay(e, element)}>
                        {element}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
let yearList;
let monthList;
let daysList;
