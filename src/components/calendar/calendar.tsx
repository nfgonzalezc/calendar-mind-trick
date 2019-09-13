import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "adl-calendar",
  styleUrl: "calendar.scss",
  shadow: true
})
export class Calendar {
  @Prop() first: string;
  @Prop() middle: string;
  @Prop() last: string;

  render() {
    return <div class="calendar">
      <div></div>
      <div></div>
      <div></div>
    </div>;
  }
}
