import { getLetter } from "../../src/App"

describe("exercise9", () => {
    it("There should be a 60% chance of getting the letter A", () => {
        let times = 0
        let counter = 0
        while (times !== 1000) {
            let letter = getLetter()
            if (letter === 'A') {
                counter++
            }
            times++
        }
        expect(counter).toBeLessThan(650)
        expect(counter).toBeGreaterThan(550)
    });
    it("There should be a 10% chance of getting the letter B", () => {
        let times = 0
        let counter = 0
        while (times !== 1000) {
            let letter = getLetter()
            if (letter === 'B') {
                counter++
            }
            times++
        }
        expect(counter).toBeLessThan(150)
        expect(counter).toBeGreaterThan(50)
    });
    it("There should be a 10% chance of getting the letter C", () => {
        let times = 0
        let counter = 0
        while (times !== 1000) {
            let letter = getLetter()
            if (letter === 'C') {
                counter++
            }
            times++
        }
        expect(counter).toBeLessThan(150)
        expect(counter).toBeGreaterThan(50)
    });
    it("There should be a 20% chance of getting the letter D", () => {
        let times = 0
        let counter = 0
        while (times !== 1000) {
            let letter = getLetter()
            if (letter === 'D') {
                counter++
            }
            times++
        }
        expect(counter).toBeLessThan(250)
        expect(counter).toBeGreaterThan(150)
    });
})

