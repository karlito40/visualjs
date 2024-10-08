import { register } from "@/visualjs/register";

const LIBRARY = "Math";

register(LIBRARY, addition, {
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

register(LIBRARY, multiply, {
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
