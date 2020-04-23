package ac.elevation.java.basics.evaluations;
import ac.elevation.java.basics.DateCalculator;

import org.junit.jupiter.api.Test;
import java.time.LocalDate;

import static ac.elevation.java.basics.evaluations.DateCalculatorTestSetup.*;
import static org.junit.jupiter.api.Assertions.assertEquals;


public class TestEx3 {

    @Test
    public void testGetWeekDay() {
        for (Date d: invalidData) {
            assertEquals(DateCalculator.WeekDay.INVALID_WEEKDAY, DateCalculator.GetWeekDay(d.Year, d.Month, d.Day));
            assertEquals(DateCalculator.WeekDay.INVALID_WEEKDAY, DateCalculator.GetWeekDay(new Date(d.Day, d.Month, d.Year).toString()));
        }

        for (Date d: data) {
            LocalDate today = LocalDate.of(d.Year, d.Month, d.Day);
            int expected_ordinal =  today.getDayOfWeek().ordinal();
            assertEquals(expected_ordinal, DateCalculator.GetWeekDay(d.Year, d.Month, d.Day).ordinal());
            assertEquals(expected_ordinal, DateCalculator.GetWeekDay(new Date(d.Day, d.Month, d.Year).toString()).ordinal());
        }
    }
}