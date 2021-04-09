import { handleSubmit } from "../src/client/js/formHandler"
describe("Testing the submit functionality", ()=> {
    test("Testing the handleSubmit() function", ()=> {
        const input = "I am not sure about this!";
        const output = (`<br>Welcome !<br>The following information is your text's reflection:<br><br>Agreement: <br>Confidence: <br>Irony: <br>Subjectivity: <br>Positive/Negative Language: `);
      expect(handleSubmit(event)).toEqual(output);
    })
})