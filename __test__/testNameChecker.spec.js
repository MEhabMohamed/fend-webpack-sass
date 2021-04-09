import { checkForName } from '../src/client/js/nameChecker'
describe("Checking for a specific name", ()=> {
    test("Testing checkForName() function", ()=> {
        const input = "Kirk";
        const output = alert("Welcome, Captain!");
        expect(checkForName(input)).toEqual(output);
    });
});