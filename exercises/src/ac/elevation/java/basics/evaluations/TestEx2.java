package ac.elevation.java.basics.evaluations;
import ac.elevation.java.basics.DateCalculator;

import org.junit.jupiter.api.Test;
import java.time.LocalDate;

import static ac.elevation.java.basics.evaluations.DateCalculatorTestSetup.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestEx2 {

    @Test
    public void testDateAdd() {
        for (Date d: invalidData) {
            assertEquals("INVALID_DATE", DateCalculator.DateAdd(d.Year, d.Month, d.Day, 5));
            assertEquals("INVALID_DATE", DateCalculator.DateAdd(new Date(d.Day, d.Month, d.Year).toString(), 5));
        }

        for (Date d: data) {
            var today = LocalDate.of(d.Year, d.Month, d.Day);
            int days_period = randGenerator.nextInt(5000);
            LocalDate calc_day =  today.plusDays(days_period);
            assertEquals(calc_day.format(foramtter), DateCalculator.DateAdd(d.Year, d.Month, d.Day, days_period));
            assertEquals(calc_day.format(foramtter), DateCalculator.DateAdd(new Date(d.Day, d.Month, d.Year).toString(), days_period));
            calc_day =  today.minusDays(days_period);
            if ("27/08/2018".equals(calc_day.format(foramtter)))
                assertEquals(calc_day.format(foramtter), DateCalculator.DateAdd(d.Year, d.Month, d.Day, -days_period));
            assertEquals(calc_day.format(foramtter), DateCalculator.DateAdd(new Date(d.Day, d.Month, d.Year).toString(), -days_period));
        }
    }

    @Test
    public void testDateDiff() {
        for (Date d: invalidData) {
            assertEquals(Integer.MAX_VALUE, DateCalculator.DateDiff(d.Year, d.Month, d.Day, 1991, 4, 2));
            assertEquals(Integer.MAX_VALUE, DateCalculator.DateDiff(1991, 4, 2, d.Year, d.Month, d.Day));
            assertEquals(Integer.MAX_VALUE, DateCalculator.DateDiff(new Date(d.Day, d.Month, d.Year).toString(), new Date(1991, 4, 2).toString()));
            assertEquals(Integer.MAX_VALUE, DateCalculator.DateDiff(new Date(1991, 4, 2).toString(), new Date(d.Day, d.Month, d.Year).toString()));
        }

        for (Date d: data) {
            LocalDate today = LocalDate.of(d.Year, d.Month, d.Day);
            LocalDate yeserday =  today.minusDays(1);
            assertEquals(today.format(foramtter), DateCalculator.Yesterday(d.Year, d.Month, d.Day));
        }
    }
}