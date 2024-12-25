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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGangOrRegionOrYear = exports.getDeadliestRegions = exports.getGroupByYear = exports.getTopGroups = exports.getYearlyStatistics = exports.getHighestCasualties = exports.getMostDeadliest = void 0;
const attackService_1 = require("../services/attackService");
const getMostDeadliest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, attackService_1.getMostDeadliestService)();
        if (data) {
            res.status(200).json(data);
        }
        else {
            res.status(404).json({ message: "attacks not found." });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getMostDeadliest = getMostDeadliest;
const getHighestCasualties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { region, isAllRegion } = req.query;
        if (typeof region !== 'string' || (isAllRegion && typeof isAllRegion !== 'string')) {
            res.status(400).json({ message: "Query parameters are invalid" });
            return;
        }
        const isAllRegionBool = isAllRegion === 'true';
        const data = yield (0, attackService_1.getHighestCasualtiesService)(region, isAllRegionBool);
        if (data) {
            res.status(200).json(data);
        }
        else {
            res.status(404).json({ message: "Attacks not found." });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getHighestCasualties = getHighestCasualties;
const getYearlyStatistics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startYear, endYear } = req.query;
        if (typeof startYear != 'string' || typeof endYear != 'string') {
            res.status(400).json({ message: "query is invalid" });
            return;
        }
        const data = yield (0, attackService_1.getYearlyStatisticsService)(+startYear, +endYear);
        if (data) {
            res.status(200).json(data);
        }
        else {
            res.status(404).json({ message: "attacks not found." });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getYearlyStatistics = getYearlyStatistics;
const getTopGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { top, region } = req.query;
        if (typeof top != 'string' || typeof region != 'string') {
            res.status(400).json({ message: "query is invalid" });
            return;
        }
        const data = yield (0, attackService_1.getTopGroupsService)(+top.split('-').reverse()[0], region);
        if (data) {
            res.status(200).json(data);
        }
        else {
            res.status(404).json({ message: "no ganges found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getTopGroups = getTopGroups;
const getGroupByYear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { year, gang } = req.query;
        let data = {};
        if (year) {
            if (typeof year != 'string') {
                res.status(400).json({ message: "query is invalid 0" });
                return;
            }
            data = yield (0, attackService_1.getGroupByYearService)(+year);
        }
        else if (gang) {
            if (typeof gang != 'string') {
                res.status(400).json({ message: "query is invalid 1" });
                return;
            }
            data = yield (0, attackService_1.getIncidentsByGangService)(gang);
        }
        if (data) {
            res.status(200).json(data);
        }
        else {
            res.status(404).json({ message: "no gangs found." });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getGroupByYear = getGroupByYear;
const getDeadliestRegions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gang } = req.query;
        if (typeof gang != 'string') {
            res.status(400).json({ message: "query is invalid" });
            return;
        }
        const data = yield (0, attackService_1.getDeadliestByRegionsService)(gang);
        if (data) {
            res.status(200).json(data);
        }
        else {
            res.status(404).json({ message: "no gangs found." });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getDeadliestRegions = getDeadliestRegions;
const getGangOrRegionOrYear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type } = req.query;
        if (typeof type != 'string') {
            res.status(400).json({ message: "query is invalid" });
            return;
        }
        const data = yield (0, attackService_1.getGangOrRegionOrYearService)(type);
        if (data) {
            res.status(200).json(data);
        }
        else {
            res.status(404).json({ message: "no gangs found." });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getGangOrRegionOrYear = getGangOrRegionOrYear;
