export const mapUniversityCourseAreaData = (data) => {
  return data.map((universityCourseArea) => ({
    id: universityCourseArea.universityCourseAreaId.toString(),
    name: universityCourseArea.universityCourseAreaName,
    icon: universityCourseArea.universityCourseAreaIcon,
  }));
};
