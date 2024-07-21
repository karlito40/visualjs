import { register } from "@/visualjs/register";

register("Math", addition, {
  args: ["number", "number"],
});
export function addition(number: number, by: number) {
  return number + by;
}
