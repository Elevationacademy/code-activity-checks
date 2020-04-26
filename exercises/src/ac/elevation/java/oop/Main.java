package ac.elevation.java.oop.evaluation;

public class Main {
    public static void main(String[] args) {
        Zoo zoo = new Zoo();
        var zoo_iter = zoo.Iterator();

        zoo_iter.add(new Lion("Simba"));
        zoo_iter.add(new Lion("Mofasa"));
        zoo_iter.add(new Monkey("Rafiki"));
        zoo_iter.add(new Goose("Akka"));
        zoo_iter.add(new Goose("Morten"));
        zoo_iter.add(new SnowyOwl("Hedwig"));
        zoo_iter.add(new Dog("Toto"));
        zoo_iter.add(new Shark("Jaws"));
        zoo_iter.add(new Clownfish("Nemo"));

        // reset the iterator.
        zoo_iter = zoo.Iterator();
        while (zoo_iter.hasNext()) {
            var a = zoo_iter.next();
            System.out.println(a.toString());
        }
    }
}
