import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";
export const config: Config = {
  namespace: "calendar-mind-trick",
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader"
    },
    {
      type: "docs-readme"
    },
    {
      type: "www",
      serviceWorker: null // disable service workers
    }
  ],
  globalStyle: "src/global/variables.scss",
  plugins: [
    sass({
      injectGlobalPaths: ["src/global/variables.scss"]
    })
  ],
  hashFileNames: true
};
