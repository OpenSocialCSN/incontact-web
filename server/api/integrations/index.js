import establishGoogle from "./google/googleEndpoints";

const establishEndpoints = function(expressApp) {
  establishGoogle(expressApp);
};

export default establishEndpoints;
