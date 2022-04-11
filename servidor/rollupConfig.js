// rollup.config.js
import ascii from "rollup-plugin-ascii";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "traceSkeleton.js",
    plugins: [
        ascii()
    ],
    output: {
      extend: true,
      file: "dist/trace_skeleton.js",
      format: "umd",
      name: "TraceSkeleton"
    }
  },
  {
    input: "traceSkeleton.js",
    plugins: [
        ascii(),
        terser()
    ],
    output: {
      extend: true,
      file: "dist/trace_skeleton.min.js",
      format: "umd",
      name: "TraceSkeleton"
    }
  }
];


