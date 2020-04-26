package ac.elevation.java.basics.evaluations;
import ac.elevation.java.basics.DateCalculator;

import org.junit.jupiter.api.Test;
import static ac.elevation.java.basics.evaluations.DateCalculatorTestSetup.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestEx1 {

    @Test
    public void DateStringTest() {
        for (Date d : data) {
            assertEquals(d.toString(), DateCalculator.DateString(d.Year, d.Month, d.Day));
        }

        for (Date d: invalidData) {
            assertEquals("INVALID_DATE", DateCalculator.DateString(d.Year, d.Month, d.Day));
            assertEquals("INVALID_DATE", DateCalculator.DateString(d.Year, d.Month, d.Day).toString());
        }
    }


    @Test
    public void DateStringTestInvalidDates() {
        for (Date d: invalidData) {
            assertEquals("INVALID_DATE", DateCalculator.DateString(d.Year, d.Month, d.Day));
            assertEquals("INVALID_DATE", DateCalculator.DateString(d.Year, d.Month, d.Day).toString());
        }
    }
}