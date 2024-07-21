import { register } from "@/visualjs/register";

register("Test", noArgsFunc);
export function noArgsFunc() {
  console.log("noArgsFunc has been executed. Returning value");
  return "toto";
}
