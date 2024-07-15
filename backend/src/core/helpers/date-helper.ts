export class DateHelper {
  /**
   * Returns the current date with the time set to 00:00:00.
   *
   * @returns The current date.
   */
  static getCurrentDate(): Date {
    const today = new Date();
    return today;
  }

  /**
   * Returns the previous date from the given date.
   *
   * @param date - The reference date.
   * @returns The previous date.
   */
  static getPreviousDate(date: Date): Date {
    const previousDate = new Date(date);
    previousDate.setDate(date.getDate() - 1);
    return previousDate;
  }

  /**
   * Checks if two dates are on the same day.
   *
   * @param date1 - The first date.
   * @param date2 - The second date.
   * @returns True if the dates are on the same day, false otherwise.
   */
  static isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.toISOString().split('T')[0] === date2.toISOString().split('T')[0]
    );
  }

  /**
   * Calculates the difference in days between two dates.
   *
   * @param date1 - The first date.
   * @param date2 - The second date.
   * @returns The difference in days between the two dates.
   */
  static dayDifference(date1: Date, date2: Date): number {
    const strippedDate1 = date1;
    const strippedDate2 = date2;
    const timeDifference = strippedDate2.getTime() - strippedDate1.getTime();
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  }
}
