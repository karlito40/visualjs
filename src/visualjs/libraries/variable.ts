import { register } from "@/visualjs/register";

register("Variable", variable, {
  args: [
    {
      name: "value",
      type: "any",
      fillMethod: "manual",
    },
  ],
});
export function variable(v: any) {
  return v;
}
