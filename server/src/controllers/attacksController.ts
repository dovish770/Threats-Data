import e, { Request, Response } from "express";
import { getMostDeadliestService, getHighestCasualtiesService, getYearlyStatisticsService, getTopGroupsService, getGroupByYearService, getIncidentsByGangService, getDeadliestByRegionsService, getGangOrRegionOrYearService } from "../services/attackService";

export const getMostDeadliest = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await getMostDeadliestService()
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "attacks not found." });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const getHighestCasualties = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { region, isAllRegion } = req.query;

    if (typeof region !== 'string' || (isAllRegion && typeof isAllRegion !== 'string')) {
      res.status(400).json({ message: "Query parameters are invalid" });
      return;
    }

    const isAllRegionBool = isAllRegion === 'true';

    const data = await getHighestCasualtiesService(region, isAllRegionBool);

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Attacks not found." });
    }

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};



export const getYearlyStatistics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { startYear, endYear } = req.query;
      
    if (typeof startYear != 'string' || typeof endYear != 'string') {
      res.status(400).json({ message: "query is invalid" });
      return
    }
    const data = await getYearlyStatisticsService(+startYear, +endYear)
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "attacks not found." });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const getTopGroups = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { top, region } = req.query;

    if (typeof top != 'string' || typeof region != 'string') {
      res.status(400).json({ message: "query is invalid" });
      return
    }
    const data = await getTopGroupsService(+top.split('-').reverse()[0], region)
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "no ganges found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const getGroupByYear = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { year, gang } = req.query;
    let data: any = {};
    if (year) {
      if (typeof year != 'string') {
        res.status(400).json({ message: "query is invalid 0" });
        return
      }
      data = await getGroupByYearService(+year)
      
    }
    else if (gang) {
      if (typeof gang != 'string') {
        res.status(400).json({ message: "query is invalid 1" });
        return
      }

      data = await getIncidentsByGangService(gang)
    }
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "no gangs found." });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const getDeadliestRegions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { gang } = req.query;
    
    if (typeof gang != 'string') {
      res.status(400).json({ message: "query is invalid" });
      return
    }
    const data = await getDeadliestByRegionsService(gang)

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "no gangs found." });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const getGangOrRegionOrYear = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { type } = req.query;
    
    if (typeof type != 'string') {
      res.status(400).json({ message: "query is invalid" });
      return
    }
    const data = await getGangOrRegionOrYearService(type)

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "no gangs found." });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

