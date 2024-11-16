# Employee Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
This program is designed to help with the employee hiring process and update current employee records. It ensures that all employees are accurately accounted for in terms of their departments, roles, salaries, and reporting relationships.

## Table of Contents
- [Description](#description)
- [installation](#installation)
- [usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#test)
- [Questions](#questions)

## Installation

To install and use this application locally, please follow these steps:

1. Clone the repository using the SSH:

    `git@github.com:allenarnoldy/employee_tracker.git`
2. Navigate to the project directory:

    `cd employee_tracker`
3. Install the dependencies:

    `npm install` 

## Usage
The code will have a schema.sql and seeds.sql. In order to get the tables you will need to run `psql -U postgres` you will be prompted for a password. Once that is ran, you can run `\i src/db/schema.sql`. This is all you are required to do, but you can run also run `\i src/db/seeds.sql` if you need the database with employees.

To use the employee_tracker, run the following command:

    `npm run build`
Then you will rin the following command:

    `node dist/index.js`
You can also check out a video of the generator being used here:
https://drive.google.com/file/d/1nqznN6aNPKxUoeICzKb1da3Rt5b84R-Y/view?usp=drive_link

## License

This project is under the MIT License.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Contributions

contributions are welcome. I did get some help the Instructor Charlie, he made a video on making a library that helped. I also used some of the files from the class activities like connections.ts, package.json, and tsconfig.json.

## Tests

Test the code by running the employee_tracker and verifing the correct outputs bases on different inputs.

## Questions
- GitHub: https://github.com/allenarnoldy
- Email: allenarnoldy@gmail.com
