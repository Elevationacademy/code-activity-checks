package ac.elevation.java.oop.evaluation;

import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.ListIterator;

public class TestEx1 extends ZooTest{

    @Test
    public void TestAnimal() {
        assertAbstractClass("Animal");
        assertMethodExist("Animal", "toString");
        Class c;
    }

    @Test
    public void testZoo() throws IOException, ClassNotFoundException {
        String className = "Zoo";
        String methodName = "Iterator";
        assertClassExist(className);
        assertMethodExist(className, "Iterator");
        // we are sure that it exists since the previous file did succeed.
        Class c = all_classes.stream().filter(cl -> cl.getSimpleName().equals("Zoo")).findFirst().get();
        try {
            Object instance = c.getDeclaredConstructor().newInstance();
            var method = Arrays.stream(c.getMethods()).filter(m -> m.getName().equals(methodName)).findFirst();
            ListIterator li = (ListIterator) method.get().invoke(instance);

            List<Object> list = new ArrayList<>();
            // Add each element of iterator to the List
            li.forEachRemaining(list::add);

            while (li.hasNext())
                list.add(li.next());

            for (var item : list)
                System.out.println(item.toString());



        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }
        /*
        c.getMethod("Iterator")
        */
    }

    @Test
    public void TestLion() {
        assertClassIsSuperClassOf("Lion", "Animal");
    }

    @Test
    public void TestGoose() {
        assertClassIsSuperClassOf("Goose", "Animal");
    }

    @Test
    public void TestClownFish() {
        assertClassIsSuperClassOf("ClownFish", "Animal");
    }

    @Test
    public void TestMonkey() {
        assertClassIsSuperClassOf("Monkey", "Animal");
    }

    @Test
    public void SnowyOwl() {
        assertClassIsSuperClassOf("SnowyOwl", "Animal");
    }
}