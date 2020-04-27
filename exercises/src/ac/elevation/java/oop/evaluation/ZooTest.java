package ac.elevation.java.oop.evaluation;

import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;


class ZooTest {

    /**
     * Scans all classes accessible from the context class loader which belong to the given package and subpackages.
     *  https://dzone.com/articles/get-all-classes-within-package
     * @param packageName The base package
     * @return The classes
     * @throws ClassNotFoundException
     * @throws IOException
     */
    private static Class[] getClasses(String packageName)
            throws ClassNotFoundException, IOException {
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        assert classLoader != null;
        String path = packageName.replace('.', '/');
        Enumeration resources = classLoader.getResources(path);
        List<File> dirs = new ArrayList<>();
        while (resources.hasMoreElements()) {
            var resource = resources.nextElement();
            dirs.add(new File(resource.toString()));
        }

        ArrayList<Class> classes = new ArrayList<>();
        for (var directory : dirs) {
            classes.addAll(findClasses(directory, packageName));
        }

        return classes.toArray(Class[]::new);
    }

    /**
     * Recursive method used to find all classes in a given directory and subdirs.
     *
     * @param directory   The base directory
     * @param packageName The package name for classes found inside the base directory
     * @return The classes
     * @throws ClassNotFoundException
     */
    private static List findClasses(File directory, String packageName) throws ClassNotFoundException {
        List classes = new ArrayList();
        if (!directory.exists()) {
            return classes;
        }
        File[] files = directory.listFiles();
        for (File file : files) {
            if (file.isDirectory()) {
                assert !file.getName().contains(".");
                classes.addAll(findClasses(file, packageName + "." + file.getName()));
            } else if (file.getName().endsWith(".class")) {
                classes.add(Class.forName(packageName + '.' + file.getName().substring(0, file.getName().length() - 6)));
            }
        }
        return classes;
    }

    @Test
    void Zoo() throws IOException, ClassNotFoundException {
        var classes = getClasses("ac.elevation.java.oop.evaluation");
        for (var c : classes)
            System.out.println(c.getSimpleName());
    }
}