import { Router } from "express";
import { getMostDeadliest, getHighestCasualties, getYearlyStatistics, getTopGroups, getGroupByYear, getDeadliestRegions, getGangOrRegionOrYear } from "../controllers/attacksController";

const router = Router()

router.get('/analysis/deadliest-attack-types', getMostDeadliest)
router.get('/analysis/highest-casualty-regions', getHighestCasualties)
router.get('/analysis/incident-trends', getYearlyStatistics)
router.get('/relationships/top-groups', getTopGroups)
router.get('/relationships/groups-by-year', getGroupByYear)
router.get('/relationships/deadliest-regions', getDeadliestRegions)
router.get('/list-of-types', getGangOrRegionOrYear)

export default router   