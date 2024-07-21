import { register } from "@/visualjs/register";

register("Debug", log, {
  args: ["string", "any"],
});
export function log(message: string, v: any) {
  return console.log(message, v);
}
