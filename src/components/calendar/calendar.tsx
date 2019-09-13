import { Component, Prop, h } from "@stencil/core";
import { format } from "../../utils/utils";

@Component({
  tag: "my-component",
  styleUrl: "my-component.css",
  shadow: true
})
export class MyComponent {
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
