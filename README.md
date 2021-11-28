# Simple CRUD API

### To run and test the App:

1. Open _`Git Bash`_ or other terminal / ide in directory of App (where do you want to clone the App).
2. Then enter _`git clone git@github.com:Praddby/simple-crud-api.git`_ or _`https://github.com/Praddby/simple-crud-api.git`_ or Download ZIP from [GitHub](https://github.com/Praddby/simple-crud-api).
3. Then enter _`cd simple-crud-api`_ (to enter the App folder).
4. Then enter _`git checkout simple-crud-api`_ (to select the branch with the App).
5. Then enter _`npm install`_.
6. Then rename file _`.env.example`_ to _`.env`_. If need, change number post in file _`.env`_.
7. For run app enter follow at the command line:
   - _`npm run start:prod`_ (production mode);
   - _`npm run start:dev`_ (development mode).
8. For testing app enter follow at the command line:
   - _`npm test`_;
   - _`npm run coverage`_.

Dir _`__tests`_ has files for test App.

After run the App, start Postman to send requests.

- method: get, url: http://localhost:{PORT}/persons, response: Array\<Person> or [].
- method: get, url: http://localhost:{PORT}/persons/:uuid, response: {Person}
- method: post, url: http://localhost:{PORT}/persons, request: { name: string, age: number, hobbies: Array\<string> }, response: {Person}
- method: put, url: http://localhost:{PORT}/persons/:uuid, request: { name: string, age: number, hobbies: Array\<string> }, response: {Person}
- method: delete, url: http://localhost:{PORT}/persons/:uuid, response: status code 204.

### PORT=6000, if you don't change in .env.

### Version Node: 16.13.0 LTS!

For test status code 500, need uncomment lines №17, 28, 35, 43, 52 in file _`service/personApi.js`_ and repeat requests.
