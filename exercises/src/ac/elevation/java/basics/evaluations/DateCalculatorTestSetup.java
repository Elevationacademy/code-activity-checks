package ac.elevation.java.basics.evaluations;

import java.time.format.DateTimeFormatter;
import java.util.Random;


public class DateCalculatorTestSetup {

    public static DateTimeFormatter foramtter = DateTimeFormatter.ofPattern("dd/MM/yyyy");;
    public static Random randGenerator = new Random(13);

    public static class Date
    {
        public int Day;
        public int Month;
        public int Year;
        public Date(int Day, int Month, int Year) {
            this.Day = Day;
            this.Month = Month;
            this.Year  = Year;
        }

        public String toString() {
            return String.format("%02d/%02d/%04d", Day, Month, Year);
        }
    }

    public static Date[] data = new Date[]{
            new Date(1, 1, 2020),
            new Date(21, 2, 1600),
            new Date(28, 6, 2040),
            new Date(31, 1, 2020),
            new Date(28, 2, 1999),
            new Date(29, 2, 2000),
            new Date(28, 2, 1900),
            new Date(31, 5, 1850),
            new Date(30, 6, 1850),
            new Date(10, 4, 1900)
    };

    public static Date[] invalidData = new Date[]{
            new Date(29, 2, 1999),
            new Date(30, 2, 1999),
            new Date(29, 2, 1900),
            new Date(30, 2, 2000),
            new Date(31, 2, 2000),
            new Date(31, 4, 2000),
            new Date(31, 6, 2000),
            new Date(31, 9, 1999),
            new Date(31, 11, 1999),
            new Date(32, 1 , 1850),
            new Date(0, 1 , 1850),
            new Date(5, 1 , -2000),
            new Date(-4, 1 , 2000),
            new Date(2, 0 , 2000),
            new Date(2, -2 , 2000),
            new Date(1, 13 , 2000),
    };
}