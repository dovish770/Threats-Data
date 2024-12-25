export const getRegion = (region: string): string => {
    switch (region) {
        case "country":
            return "country_txt"
        case "city":
            return "city"
        case "region":
            return "region_txt"
        default:
            throw new Error("Not valid location");
    }
}