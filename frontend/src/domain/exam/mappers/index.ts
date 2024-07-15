export const mapExamData = (data) => {
  return data.map((exam) => ({
    value: exam.examId.toString(),
    label: exam.examName,
  }));
};

export const mapExamYearsData = (data) => {
  return data.map((examYear) => ({
    value: examYear.examYearId.toString(),
    label: examYear.examYearTitle,
    id: examYear.examYearId.toString(),
    title: examYear.examYearTitle,
    icon: examYear.examYearIcon,
    isBeforeUniversity: examYear.isBeforeUniversity,
    examStartDate: examYear.examStartDate,
    examEndDate: examYear.examEndDate,
  }));
};

export const mapExamYearsDataForSelect = (data) => {
  return data.map((examYear) => ({
    value: examYear.examYearId.toString(),
    label: examYear.examYearTitle,
  }));
};

export const mapExamYearData = (data) => {
  return {
    id: data.examYearId.toString(),
    title: data.examYearTitle,
    icon: data.examYearIcon,
    isBeforeUniversity: data.isBeforeUniversity,
    examStartDate: data.examStartDate,
    examEndDate: data.examEndDate,
  };
};
