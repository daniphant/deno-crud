
import { DenonConfig } from "https://deno.land/x/denon@2.4.4/mod.ts";

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "deno run --unstable --no-check src/server.ts",
    },
  },
  env: {
    PORT : "5000",
    TOKEN_SECRET: "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIifQ.WePl7achkd0oGNB8XRF_LJwxlyiPZqpdNgdKpDboAjSTsWq-aOGNynTp8TOv8KjonFym8vwFwppXOLoLXbkIaQ"
  },
  allow: ["net", "env"]
};

export default config;