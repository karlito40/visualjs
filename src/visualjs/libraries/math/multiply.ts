import { register } from "@/visualjs/register";

register("Math", multiply, {
  args: [
    {
      name: "entry",
      type: "number",
      fillMethod: "socket",
    },
    {
      name: "by",
      type: "number",
      fillMethod: "socket",
    },
  ],
});
export function multiply(entry: number, by: number) {
  return entry * by;
}
