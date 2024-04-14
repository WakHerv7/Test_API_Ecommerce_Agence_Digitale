import path from "node:path";
import url from "node:url";
// ---

// export default {
//   path: __dirname + "../",
//   title: "YourProject",
//   version: "1.0.0",
//   tagIndex: 2,
//   ignore: ["/swagger", "/docs", "/v1", "/", "/something/*", "*/something"],
//   common: {
//     parameters: {
//       sortable: [
//         {
//           in: "query",
//           name: "sortBy",
//           schema: { type: "string", example: "foo" },
//         },
//         {
//           in: "query",
//           name: "sortType",
//           schema: { type: "string", example: "ASC" },
//         },
//       ],
//     },
//     headers: {
//       paginated: {
//         "X-Total-Pages": {
//           description: "Total amount of pages",
//           schema: { type: "integer", example: 5 },
//         },
//         "X-Total": {
//           description: "Total amount of results",
//           schema: { type: "integer", example: 100 },
//         },
//         "X-Per-Page": {
//           description: "Results per page",
//           schema: { type: "integer", example: 20 },
//         },
//       },
//     },
//   },
// };

export default {
  path: __dirname + "/../", //for AdonisJS v5
  // path: path.dirname(url.fileURLToPath(import.meta.url)) + "/../", // for AdonisJS v6
  title: "Test Ecommerce Agence Digitale",
  version: "1.0.0",
  tagIndex: 2,
  snakeCase: true,
  debug: false, // set to true, to get some useful debug output
  ignore: ["/swagger", "/docs"],
  preferredPutPatch: "PUT", // if PUT/PATCH are provided for the same route, prefer PUT
  common: {
    parameters: {
      paginated: {
        "page": {
          description: "Total amount of results",
          schema: { type: "integer", example: 1 },
        },
        "limit": {
          description: "Results per page",
          schema: { type: "integer", example: 20 },
        },
      },
    }, // OpenAPI conform parameters that are commonly used
    headers: {},
  },
  persistAuthorization: true, // persist authorization between reloads on the swagger page
  showFullPath: false, // the path displayed after endpoint summary
};