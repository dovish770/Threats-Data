"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attacksController_1 = require("../controllers/attacksController");
const router = (0, express_1.Router)();
router.get('/analysis/deadliest-attack-types', attacksController_1.getMostDeadliest);
router.get('/analysis/highest-casualty-regions', attacksController_1.getHighestCasualties);
router.get('/analysis/incident-trends', attacksController_1.getYearlyStatistics);
router.get('/relationships/top-groups', attacksController_1.getTopGroups);
router.get('/relationships/groups-by-year', attacksController_1.getGroupByYear);
router.get('/relationships/deadliest-regions', attacksController_1.getDeadliestRegions);
router.get('/list-of-types', attacksController_1.getGangOrRegionOrYear);
exports.default = router;
