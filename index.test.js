const request = require('supertest');
// express app
const app = require('./index');

// db setup
const { sequelize, Dog } = require('./db');
const seed = require('./db/seedFn');
const {dogs} = require('./db/seedData');

describe('Endpoints', () => {
    // to be used in POST test
    const testDogData = {
        breed: 'Poodle',
        name: 'Sasha',
        color: 'black',
        description: 'Sasha is a beautiful black pooodle mix.  She is a great companion for her family.'
    };

    beforeAll(async () => {
        // rebuild db before the test suite runs
        await seed();
    });

    describe('GET /dogs', () => {
        it('should return list of dogs with correct data', async () => {
            // make a request
            const response = await request(app).get('/dogs');
            // assert a response code
            expect(response.status).toBe(200);
            // expect a response
            expect(response.body).toBeDefined();
            // toEqual checks deep equality in objects
            expect(response.body[0]).toEqual(expect.objectContaining(dogs[0]));
        });
    });

    TODO:
    describe('POST /dogs', () => {
        it('should add a new dog with correct data', async () => {

            const response = await request(app).get('/dogs');
            expect(response.status).toBe(200);
            
            const testDog = await Dog.create({
                name: "Rufus",
                breed: "Maltese",
                color: "white",
                description: "small white medium hair dog",
            });
            
            expect(testDog).toBeInstanceOf(Dog);
            expect(testDog.name).toBe("Rufus");
            //expect(response.body[0]).toEqual(expect.objectContaining(products[0]));
            //expect(response.body[0].name).toEqual(products[0].name);
        });
    });

    TODO: 
     describe('DELETE /dogs/:id', () => {
         it('should delete a specified dog', async () => {
            
            const dogToDelete = await Dog.findByPk(1);
            expect(dogToDelete).toBeInstanceOf(Dog);
 
            await dogToDelete.destroy();
            
            const isDogDeleted = await Dog.findByPk(1);
            expect(isDogDeleted).toBe(null);
            
        });
    });
});