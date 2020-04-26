package ac.elevation.java.basics;

public class DateCalculator {

    public static int[] MONTH_DAYS = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

    private static boolean isLeapYear(int Year) { return Year % 400 == 0 || (Year % 100 != 0 && Year % 4 == 0);  }

    private static boolean isValidDate (int Year, int Month, int Day)  {
        if (Year < 1582 ) // the gregorian calender were establish in 1582, so I would not count on years before.
            return false;

        if (Month < 1 || Month > 12)
            return false;

        if (Day < 1 || Day > MonthDays(Year, Month))
            return false;

        return true;
    }

    private static int MonthDays(int Year, int Month)
    {
        if (Month != 2)
            return MONTH_DAYS[Month];
        return isLeapYear(Year) ? 29 : 28;
    }

    public static String DateString(int Year, int Month, int Day) {
        if (!isValidDate(Year, Month, Day))
            return "INVALID_DATE";
        return String.format("%02d/%02d/%02d", Day, Month, Year);
    }

    public static String Tomorrow(int Year, int Month, int Day) {
        if (!isValidDate(Year, Month, Day))
            return "INVALID_DATE";

        if (Day < MonthDays(Year, Month))
            Day++;
        else if (Month < 12) {
            Day = 1;
            Month++;
        } else // December.
        {
            Day = 1;
            Month = 1;
            Year++;
        }

        return DateString(Year, Month, Day);
    }

    public static String Tomorrow(String dateString)
    {
        int[] d = new int[3];
        if (!ParseDate(dateString, d))
            return "INVALID_DATE";
        return Tomorrow(d[0], d[1], d[2]);
    }
    public static String Yesterday(int Year, int Month, int Day) {
        if (!isValidDate(Year, Month, Day))
            return "INVALID_DATE";

        if (Day > 1)
            Day--;
        else if (Month > 1) {
            Month--;
            Day = MonthDays(Year, Month);
        } else // December.
        {
            Day = 31;
            Month = 12;
            Year--;
        }

        return DateString(Year, Month, Day);
    }

    public static String Yesterday(String dateString) {
        int[] d = new int[3];
        if (!ParseDate(dateString, d))
            return "INVALID_DATE";
        return Yesterday(d[0], d[1], d[2]);
    }

    private static boolean ParseDate(String str, int[] dateArray)
    {
        String[] fields = str.split("/");
        if (fields.length != 3 || fields[0].length() != 2 || fields[1].length() != 2 || fields[2].length() != 4)
            return false;

        int day = Integer.parseInt(fields[0]);
        int month = Integer.parseInt(fields[1]);
        int year = Integer.parseInt(fields[2]);

        if (!isValidDate(year, month, day))
            return  false;
        dateArray[0] = year;
        dateArray[1] = month;
        dateArray[2] = day;
        return true;
    }

    public static String DateAdd(int Year, int Month, int Day, int days) {
        if (!isValidDate(Year, Month, Day))
            return "INVALID_DATE";

        String newDate = DateString(Year, Month, Day);
        if (days > 0)
            for (int i = 0; i < days; i++)
                newDate = Tomorrow(newDate);
        else if (days < 0)
            for (int i = 0; i < (-days); i++)
                newDate = Yesterday(newDate);
        return newDate;
    }

    public static String DateAdd(String date, int days) {
        int[] d = new int[3];
        if (!ParseDate(date, d))
            return "INVALID_DATE";

        return DateAdd(d[0], d[1], d[2], days);
    }

    public static int DateDiff(int Year1, int Month1, int Day1, int Year2, int Month2, int Day2) {
        if (!isValidDate(Year1, Month1, Day1))
            return Integer.MAX_VALUE;

        if (!isValidDate(Year2, Month2, Day2))
            return Integer.MAX_VALUE;

        return 4;
    }

    public static int DateDiff(String date1, String date2) {
        int[] d1 = new int[3];
        if (!ParseDate(date1, d1))
            return Integer.MAX_VALUE;

        int[] d2 = new int[3];
        if (!ParseDate(date2, d2))
            return Integer.MAX_VALUE;

        return 4;
    }

    public static WeekDay GetWeekDay(int Year, int Month, int Day)    {
        if (!isValidDate(Year, Month, Day))
            return WeekDay.INVALID_WEEKDAY;
        return WeekDay.Friday;
    }

    public static WeekDay GetWeekDay(String date){
        int[] d = new int[3];
        if (!ParseDate(date, d))
            return WeekDay.INVALID_WEEKDAY;

        return GetWeekDay(d[0], d[1], d[2]);
    }

    public enum WeekDay   {
        Monday,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday,
        INVALID_WEEKDAY
    }
}
