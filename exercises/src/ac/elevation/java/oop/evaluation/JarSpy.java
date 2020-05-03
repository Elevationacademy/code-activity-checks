package ac.elevation.java.oop.evaluation;

import java.io.IOException;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.ArrayList;
import java.util.List;
import java.util.jar.JarFile;

public class JarSpy {
    private  JarFile jarFile;
    private  ClassLoader cl;
    public JarSpy(String jarFilePath) throws IOException {
        jarFile = new JarFile(jarFilePath);
        URL[] urls = { new URL("jar:file:" + jarFilePath + "!/") };
        cl = URLClassLoader.newInstance(urls);
    }

    public List<Class> GetAllClasses() throws IOException, ClassNotFoundException {

        var e = jarFile.entries();

        List<Class> classes = new ArrayList<>();

        while (e.hasMoreElements()) {
            var je = e.nextElement();
            if(je.isDirectory() || !je.getName().endsWith(".class")){
                continue;
            }
            // -6 because of .class
            String className = je.getName().substring(0,je.getName().length()-6);
            className = className.replace('/', '.');
            Class c = cl.loadClass(className);
            classes.add(c);
        }

        return classes;
    }
}
