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
  @Prop({ reflect: true }) startyear: number = 1969;
  @Prop({ reflect: true }) endyear: number = 2060;
  @State() showCard: boolean = false;
  @State() disableYear = false;
  @State() disableMonth = true;
  @State() disableDay = true;
  @State() valueInputYear: string;
  @State() valueInputMonth: string;
  @State() valueInputDay: string;
  @State() valueInputIntMonth: string;
  @State() yearSelected: boolean = false;

  year(e) {
    this.titleCard = "Selecciona el año";
    this.showCard = true;
    this.yearSelected = false;
    this.disableDay = true;
  }
  month(e) {
    this.disableDay = true;
    this.titleCard = "Selecciona el mes";
    this.showCard = true;
    this.yearSelected = true;
  }
  day(e) {
    this.titleCard = "Selecciona el día";
    this.showCard = true;
    this.yearSelected = false;
    console.log(e);
  }
  selectYear(e: any, element: string) {
    console.log("e", e);
    console.log("element", element);
    this.valueInputYear = element;
    this.disableMonth = false;
    this.disableYear = false;
    this.yearSelected = true;
    this.showCard = false;
    this.month(e);
  }
  selectMonth(e: any, element: string, key: string) {
    console.log("e", e);
    console.log("element", element);
    console.log("key", key);
    this.valueInputMonth = element;
    this.valueInputIntMonth = key;
    this.disableDay = false;
    this.showCard = false;
    selectDate = this.valueInputYear
      .concat("-")
      .concat(this.valueInputIntMonth + 1);
    daysName = moment.localeData().weekdaysShort();
    console.log("name days--> " + daysName);

    //days of month selected
    const arrayLength = moment(selectDate, "YYYY-MM").daysInMonth();
    console.log("arraylength-->" + arrayLength);

    //start day of month
    console.log("select object-->" + selectDate);
    console.log(
      "day---->" +
        moment(selectDate)
          .startOf("month")
          .format("ddd")
    );
    const firstDay = daysName.indexOf(
      moment(selectDate)
        .startOf("month")
        .format("ddd")
    );
    console.log("int day-->" + firstDay);
    //Array days
    arrayDays = new Array(arrayLength);
    let count = 1;
    for (var i = 0; i < arrayLength; i++) {
      arrayDays[i] = count;
      count++;
    }

    console.log("amout days of month-->" + arrayDays); // 31
    //Matrix of day
    for (var j = 0; j < firstDay; j++) {
      arrayDays.unshift("");
    }
    console.log("days organized to matrix-->" + arrayDays);
    this.day(e);
  }
  selectDay(e: any, element: string) {
    console.log("e", e);
    console.log("element", element);
    this.valueInputDay = element;
    this.showCard = false;
  }

  getCalendar() {
    let momentExtend = extendMoment.extendMoment(moment);
    let start = new Date(this.startyear, 1, 1);
    let end = new Date(this.endyear, 1, 1);
    let range = momentExtend.range(start, end);
    let years = Array.from(range.by("year"));
    yearList = years.map(m => m.format("YYYY"));
    console.log("yearList-->" + yearList);
    monthList = moment.months();
    console.log("monthlist-->" + monthList);
  }

  render() {
    this.getCalendar();
    const arrayListYear = yearList;
    const arrayListMonth = monthList;
    const arrayListDays = arrayDays;
    const arrayNameDays = daysName;
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
              this.day(e);
            }}
          />
        </div>
        {this.showCard && (
          <div class='calendar__card'>
            <div>{this.titleCard}</div>
            <br />
            {this.disableDay ? (
              <div class='calendar__item'>
                {!this.yearSelected
                  ? arrayListYear.map(element => {
                      return (
                        <div onClick={e => this.selectYear(e, element)}>
                          {element}
                        </div>
                      );
                    })
                  : this.yearSelected &&
                    arrayListMonth.map((element, key) => {
                      return (
                        <div onClick={e => this.selectMonth(e, element, key)}>
                          {element}
                        </div>
                      );
                    })}
              </div>
            ) : (
              <div class='calendar__item calendar__item-day'>
                {this.showCard &&
                  !this.disableDay &&
                  arrayNameDays.map(element => {
                    return <div>{element}</div>;
                  })}
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
let arrayDays;
let selectDate;
let daysName;
