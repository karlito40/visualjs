import { register } from "@/visualjs/register";

register("Math", multiply, {
  args: ["number", "number"],
});
export function multiply(number: number, by: number) {
  return number * by;
}
