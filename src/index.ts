import React from "react";
// * STATS

import { getLCP, getFID, getCLS } from "web-vitals";

if (typeof window != "undefined") {
	console.log("START");
	getCLS(console.log, true);
	getFID(console.log, true);
	getLCP(console.log, true);
}
