import { register } from "@/visualjs/register";

register("Debug", log, {
  args: [
    {
      name: "message",
      type: "string",
      fillMethod: "manual",
    },
    {
      name: "v",
      type: "any",
      fillMethod: "socket",
    },
  ],
});
export function log(message: string, v: any) {
  return console.log(message, v);
}
