import { Component, Prop, h, State } from "@stencil/core";

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

  render() {
    return (
      <div class='calendar'>
        <div class='calendar__input'>
          <input
            onClick={e => {
              this.year(e);
            }}
            placeholder="Year"
          />
          /
          <input
            onClick={e => {
              this.month(e);
            }}
            placeholder="Month"
          />
          /<input placeholder="Day" />
        </div>
        {this.showCard && <div class='calendar__card'>{this.titleCard}</div>}
      </div>
    );
  }
}
