const MongoDbTester = require('../../utils/MongoDbTester');
const Client = require('../../utils/Client');

require('dotenv').config();
const PORT = process.env.SERVER_PORT;

describe('ex-2', () => {
  let mongoose;
  let tester;
  let app;
  let server;

  const DATABASE_NAME = 'peopleDB';
  const TEST_MODEL_NAME = 'person';

  beforeAll(async done => {
    app = require('../solutions/exercises/server/app/app.js');
    mongoose = require('../solutions/exercises/server/app/mongoose.js');
    tester = new MongoDbTester(mongoose, DATABASE_NAME);

    server = app.listen(PORT);
    await tester.dropDatabase();

    done();
  });

  afterAll(async done => {
    await tester.dropDatabase();
    tester.close();
    server.close(() => done());
  });

  it('In the /person/:id put route you should receive id update the record with age of 80', async done => {
    tester.setModelName(TEST_MODEL_NAME);
    tester.applyActualModel();

    const model = tester.getModel();
    const person = await new model({ firstName: 'John', lastName: 'Snow', age: 30 });
    await person.save();

    let people = await tester.fetchCollectionContent();
    const id = people[0]._id;

    await Client.PUT(`/person/${id}`);

    people = await tester.fetchCollectionContent();

    expect(people[0].age, 'The put request should update the age').toBe(80);

    done();
  });
});
