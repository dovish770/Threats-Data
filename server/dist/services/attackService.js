"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGangOrRegionOrYearService = exports.getDeadliestByRegionsService = exports.getIncidentsByGangService = exports.getGroupByYearService = exports.getTopGroupsService = exports.getYearlyStatisticsService = exports.getHighestCasualtiesService = exports.getMostDeadliestService = void 0;
const attackModel_1 = __importDefault(require("../models/attackModel"));
const helperFunctions_1 = require("../utils/helperFunctions");
const getMostDeadliestService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sortedAttack = yield attackModel_1.default.aggregate([
            {
                $group: {
                    _id: "$attacktype1_txt",
                    casualties: {
                        $sum: {
                            $add: ["$nkill", "$nwound"]
                        }
                    }
                },
            },
            { $sort: { casualties: -1 } }
        ]);
        return sortedAttack;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getMostDeadliestService = getMostDeadliestService;
const getHighestCasualtiesService = (region, isAllRegion) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRegion = (0, helperFunctions_1.getRegion)(region);
        const obj = yield attackModel_1.default.aggregate([
            {
                $group: {
                    _id: `$${updatedRegion}`,
                    casualties: {
                        $avg: {
                            $add: ["$nkill", "$nwound"]
                        }
                    },
                    latitude: { $first: "$latitude" },
                    longitude: { $first: "$longitude" }
                }
            },
            { $sort: { casualties: -1 } }
        ]);
        if (!obj || obj.length === 0) {
            throw new Error("No results found");
        }
        if (isAllRegion) {
            return obj.map((att) => ({
                latitude: att.latitude,
                longitude: att.longitude,
                avgCasualties: att.casualties
            }));
        }
        else {
            const attack = yield attackModel_1.default.findOne({ [updatedRegion]: obj[0]._id });
            if (!attack) {
                throw new Error("Location not found");
            }
            return {
                latitude: attack.latitude,
                longitude: attack.longitude,
                avgCasualties: obj[0].casualties
            };
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getHighestCasualtiesService = getHighestCasualtiesService;
const getYearlyStatisticsService = (startYear, endYear) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let filter = {};
        if (startYear) {
            filter.iyear = { $gte: startYear };
        }
        if (endYear && endYear !== 0) {
            filter.iyear = Object.assign(Object.assign({}, filter.iyear), { $lte: endYear });
        }
        else if (endYear === 0) {
            filter.iyear = { $gte: startYear, $lte: startYear };
        }
        let groupStage;
        if (endYear !== 0) {
            groupStage = {
                $group: {
                    _id: { year: "$iyear" },
                    incidentCount: { $sum: 1 },
                },
            };
        }
        else {
            groupStage = {
                $group: {
                    _id: { year: "$iyear", month: "$imonth" },
                    incidentCount: { $sum: 1 },
                },
            };
        }
        const trends = yield attackModel_1.default.aggregate([
            { $match: filter },
            groupStage,
            { $sort: { "_id.year": 1, "_id.month": 1 } },
            {
                $project: {
                    year: "$_id.year",
                    month: endYear === 0 ? "$_id.month" : undefined,
                    incidentCount: 1,
                    _id: 0,
                },
            },
        ]);
        if (!trends || trends.length === 0)
            throw new Error("no record found");
        return trends;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getYearlyStatisticsService = getYearlyStatisticsService;
const getTopGroupsService = (top, region) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pipeline = [
            { $match: { region_txt: region } },
            {
                $group: {
                    _id: "$gname",
                    casualties: {
                        $sum: {
                            $add: ["$nkill", "$nwound"]
                        }
                    }
                },
            },
            { $sort: { casualties: -1 } }
        ];
        if (top > 0) {
            pipeline.push({ $limit: top });
        }
        const topGroups = yield attackModel_1.default.aggregate(pipeline);
        if (!topGroups || topGroups.length === 0)
            throw new Error("no gangs found");
        return topGroups;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getTopGroupsService = getTopGroupsService;
const getGroupByYearService = (year) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pipeline = [
            { $match: { iyear: year } },
            {
                $group: {
                    _id: "$gname",
                    incidents: { $sum: 1 }
                }
            },
            { $sort: { incidents: -1 } }
        ];
        const groupsByYear = yield attackModel_1.default.aggregate(pipeline);
        if (!groupsByYear || groupsByYear.length === 0)
            throw new Error("no gangs found");
        return groupsByYear;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getGroupByYearService = getGroupByYearService;
const getIncidentsByGangService = (gang) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pipeline = [
            { $match: { gname: gang } },
            {
                $group: {
                    _id: "$iyear",
                    incidents: {
                        $sum: 1
                    }
                },
            },
            { $sort: { incidents: -1 } }
        ];
        const groupsByYear = yield attackModel_1.default.aggregate(pipeline);
        if (!groupsByYear || groupsByYear.length === 0)
            throw new Error("no gangs found");
        return groupsByYear;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getIncidentsByGangService = getIncidentsByGangService;
const getDeadliestByRegionsService = (gang) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pipeline = [
            { $match: { gname: { $exists: true, $ne: null } } },
            {
                $group: {
                    _id: { region: "$region_txt", group: "$gname" },
                    totalCasualties: { $sum: { $add: ["$nkill", "$nwound"] } },
                    totalDeaths: { $sum: "$nkill" },
                    totalInjuries: { $sum: "$nwound" },
                    incidentCount: { $sum: 1 },
                    longitude: { $first: "$longitude" },
                    latitude: { $first: "$latitude" }
                }
            },
            { $sort: { "totalCasualties": -1 } },
            {
                $group: {
                    _id: "$_id.region",
                    deadliestGroup: { $first: "$_id.group" },
                    totalCasualties: { $first: "$totalCasualties" },
                    totalDeaths: { $first: "$totalDeaths" },
                    totalInjuries: { $first: "$totalInjuries" },
                    incidentCount: { $first: "$incidentCount" },
                    longitude: { $first: "$longitude" },
                    latitude: { $first: "$latitude" },
                    otherGroups: { $push: "$_id.group" }
                }
            },
            {
                $match: {
                    "deadliestGroup": gang
                }
            },
            {
                $project: {
                    region: "$_id",
                    deadliestGroup: 1,
                    totalCasualties: 1,
                    incidentCount: 1,
                    longitude: 1,
                    latitude: 1,
                    _id: 0
                }
            }
        ];
        const groupsByRegion = yield attackModel_1.default.aggregate(pipeline, { allowDiskUse: true });
        if (!groupsByRegion || groupsByRegion.length === 0)
            throw new Error("no gangs found");
        return groupsByRegion;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getDeadliestByRegionsService = getDeadliestByRegionsService;
const getGangOrRegionOrYearService = (value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let desireGroup;
        if (value === "gang") {
            desireGroup = "gname";
        }
        else if (value === "region") {
            desireGroup = "region_txt";
        }
        else if (value === "year") {
            desireGroup = "iyear";
        }
        else {
            throw new Error("Invalid search type provided");
        }
        const data = yield attackModel_1.default.aggregate([
            { "$group": { "_id": `$${desireGroup}`, "count": { "$sum": 1 } } },
            { "$match": { "count": { "$gte": 25 } } },
            { "$project": { "_id": 1 } }
        ]);
        return data;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getGangOrRegionOrYearService = getGangOrRegionOrYearService;
