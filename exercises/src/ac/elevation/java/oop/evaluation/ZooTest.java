package ac.elevation.java.oop.evaluation;

import java.io.IOException;
import java.lang.reflect.Modifier;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

class ZooTest {
    protected JarSpy spy;
    protected List<Class> all_classes;

    public ZooTest() {
        try {
            spy = new JarSpy("java_oop_evaluation.jar");
            all_classes = spy.GetAllClasses();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    protected void assertAbstractClass(String className)
    {
        assertClassExist(className);
        var cl = all_classes.stream().filter(c -> c.getSimpleName().equalsIgnoreCase(className)).findFirst().get();
        assertTrue(Modifier.isAbstract(cl.getModifiers()), "Class " + className + " is Not Abstract");
    }

    protected void assertClassIsSuperClassOf(String className, String superClassName)
    {
        assertClassExist(className);
        assertClassExist(superClassName);

        var cl = all_classes.stream().filter(c -> c.getSimpleName().equalsIgnoreCase(className)).findFirst().get();
        assertTrue(cl.getSuperclass().getSimpleName().equals("Animal"), "Class " + className + "is not a subClass of " + superClassName);
    }

    protected void assertClassExist(String className)
    {
        assertTrue(all_classes.stream().anyMatch(c -> c.getSimpleName().equalsIgnoreCase(className)),
                "Class " + className + " does not exists");
    }

    protected void assertMethodExist(String className, String methodName)
    {
        assertClassExist(className);
        // we are sure that it exists since the previous file did succeed.
        Class c = all_classes.stream().filter(cl -> cl.getSimpleName().equals("Zoo")).findFirst().get();
        var method = Arrays.stream(c.getMethods()).filter(m -> m.getName().equals(methodName)).findFirst();
        assertTrue(method.isPresent(), "Method Iterator doesn't exist in Zoo Class");
    }
}
