import { register } from "@/visualjs/register";

register("Math", addition, {
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
export function addition(entry: number, by: number) {
  return entry + by;
}
