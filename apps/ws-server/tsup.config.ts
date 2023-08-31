import { defineConfig } from "tsup";

export default defineConfig({
  noExternal: ["@workspace/db"]
});
