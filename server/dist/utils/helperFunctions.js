"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegion = void 0;
const getRegion = (region) => {
    switch (region) {
        case "country":
            return "country_txt";
        case "city":
            return "city";
        case "region":
            return "region_txt";
        default:
            throw new Error("Not valid location");
    }
};
exports.getRegion = getRegion;
