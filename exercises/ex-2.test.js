"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var MongoDbTester_1 = require("../../utils/MongoDbTester");
var Client_1 = require("../../utils/Client");
require('dotenv').config();
var PORT = process.env.SERVER_PORT;
describe('ex-2', function () {
    var mongoose;
    var tester;
    var app;
    var server;
    var DATABASE_NAME = 'peopleDB';
    var TEST_MODEL_NAME = 'person';
    beforeEach(function (done) {
        app = require('../../solutions/exercises/server/app/app.js');
        mongoose = require('../../solutions/exercises/server/app/mongoose.js');
        tester = new MongoDbTester_1["default"](mongoose, DATABASE_NAME);
        server = app.listen(PORT);
        done();
    });
    afterEach(function (done) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tester.dropDatabase()];
                case 1:
                    _a.sent();
                    tester.close();
                    server.close();
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    it('In the /person/:id put route you should receive id update the record with age of 80', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var model, person, people, id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tester.setModelName(TEST_MODEL_NAME);
                    tester.applyActualModel();
                    model = tester.getModel();
                    return [4 /*yield*/, new model({ firstName: 'John', lastName: 'Snow', age: 30 })];
                case 1:
                    person = _a.sent();
                    return [4 /*yield*/, person.save()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, tester.fetchCollectionContent()];
                case 3:
                    people = _a.sent();
                    id = people[0]._id;
                    return [4 /*yield*/, Client_1["default"].PUT("/person/" + id)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, tester.fetchCollectionContent()];
                case 5:
                    people = _a.sent();
                    expect(people[0].age, 'The put request should update the age').toBe(80);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
});
