import { Number } from "mongoose";
import Attacks from "../models/attackModel";
import { HighestCasualties, MostDeadliest } from "../types/serverTypes";
import { getRegion } from "../utils/helperFunctions";

export const getMostDeadliestService = async (): Promise<MostDeadliest[]> => {
    try {
        const sortedAttack = await Attacks.aggregate([
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
        ])
        return sortedAttack
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getHighestCasualtiesService = async (region: string, isAllRegion: boolean): Promise<HighestCasualties | HighestCasualties[]> => {
    try {
        const updatedRegion: string = getRegion(region);

        const obj = await Attacks.aggregate([
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
        } else {
            const attack = await Attacks.findOne({ [updatedRegion]: obj[0]._id });

            if (!attack) {
                throw new Error("Location not found");
            }

            return {
                latitude: attack.latitude,
                longitude: attack.longitude,
                avgCasualties: obj[0].casualties
            };
        }

    } catch (error: any) {
        throw new Error(error.message);
    }
};


export const getYearlyStatisticsService = async (startYear: number, endYear: number) => {
    try {
        let filter: any = {};
        if (startYear) {
            filter.iyear = { $gte: startYear };
        }

        if (endYear && endYear !== 0) {
            filter.iyear = { ...filter.iyear, $lte: endYear };
        } else if (endYear === 0) {
            filter.iyear = { $gte: startYear, $lte: startYear };
        }

        let groupStage: any;
        if (endYear !== 0) {
            groupStage = {
                $group: {
                    _id: { year: "$iyear" },
                    incidentCount: { $sum: 1 },
                },
            };
        } else {
            groupStage = {
                $group: {
                    _id: { year: "$iyear", month: "$imonth" },
                    incidentCount: { $sum: 1 },
                },
            };
        }

        const trends = await Attacks.aggregate([
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

        if (!trends || trends.length === 0) throw new Error("no record found");

        return trends;

    } catch (error: any) {
        throw new Error(error.message);
    }
};




export const getTopGroupsService = async (top: number, region: string) => {
    try {
        const pipeline: any[] = [
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

        const topGroups = await Attacks.aggregate(pipeline);

        if (!topGroups || topGroups.length === 0) throw new Error("no gangs found");

        return topGroups;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getGroupByYearService = async (year: number) => {
    try {
        const pipeline: any[] = [
            { $match: { iyear: year } },
            {
                $group: {
                    _id: "$gname",
                    incidents: { $sum: 1 }
                }
            },
            { $sort: { incidents: -1 } }
        ];
        const groupsByYear = await Attacks.aggregate(pipeline);
        if (!groupsByYear || groupsByYear.length === 0) throw new Error("no gangs found");

        return groupsByYear;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getIncidentsByGangService = async (gang: string) => {
    try {
        const pipeline: any[] = [
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

        const groupsByYear = await Attacks.aggregate(pipeline);
        if (!groupsByYear || groupsByYear.length === 0) throw new Error("no gangs found");

        return groupsByYear;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getDeadliestByRegionsService = async (gang: string) => {
    try {
        const pipeline: any[] = [
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
        const groupsByRegion = await Attacks.aggregate(pipeline, { allowDiskUse: true });
        if (!groupsByRegion || groupsByRegion.length === 0) throw new Error("no gangs found");

        return groupsByRegion;
    } catch (error: any) {
        throw new Error(error.message);
    }
};


export const getGangOrRegionOrYearService = async (value: string) => {
    try {
        let desireGroup: string;

        if (value === "gang") {
            desireGroup = "gname";
        } else if (value === "region") {
            desireGroup = "region_txt";
        } else if (value === "year") {
            desireGroup = "iyear";
        } else {
            throw new Error("Invalid search type provided");
        }

        const data = await Attacks.aggregate([
            { "$group": { "_id": `$${desireGroup}`, "count": { "$sum": 1 } } },
            { "$match": { "count": { "$gte": 25 } } },
            { "$project": { "_id": 1 } }
        ]);

        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
















