var Popup = require("nativescript-popup").Popup;
var popup = new Popup();

describe("greet function", function() {
    it("exists", function() {
        expect(popup.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(popup.greet()).toEqual("Hello, NS");
    });
});