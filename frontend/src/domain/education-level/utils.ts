export const mapEducationLevelData = (data) => {
  return data.map((educationLevel) => ({
    id: educationLevel.educationLevelId.toString(),
    name: educationLevel.educationLevelName,
    icon: educationLevel.educationLevelIcon,
  }));
};
