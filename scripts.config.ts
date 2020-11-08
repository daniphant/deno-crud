
import { DenonConfig } from "https://deno.land/x/denon@2.4.4/mod.ts";

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "deno run --no-check src/server.ts",
    },
  },
  env: {
    PORT : "5000"
  },
  allow: ["net", "env"]
};

export default config;