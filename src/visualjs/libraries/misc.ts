import { register } from "@/visualjs/register";

register("Misc", variable, {
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
