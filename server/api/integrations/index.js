import establishGoogle from "./google/googleEndpoints";

const establishEndpoints = function(expressApp, graphQlResolvers) {
  establishGoogle(expressApp, graphQlResolvers);
};

export default establishEndpoints;
