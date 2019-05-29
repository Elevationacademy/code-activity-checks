const SqlTestUtils = require('../sql_test_utils')

describe('spotcheck5', () => {
    const testUtils = new SqlTestUtils(['teacher', 'student', 'student_teacher'], 'check_5', ['teacher', 'student', 'student_teacher'])

    afterEach(async done => {
        await testUtils.dropAndEndConnection()
        done()
    })

    it(`You should find all of Leo's tenured teachers`, async done => {
        await testUtils.createSQLConnection()

        await testUtils.tableSetup([`
          CREATE TABLE student
          (
            s_id         int PRIMARY KEY UNIQUE,
            s_name       varchar(50),
            is_brilliant bool
          );

          CREATE TABLE teacher
          (
            t_id       int PRIMARY KEY UNIQUE,
            t_name     varchar(50),
            is_tenured bool
          );

          CREATE TABLE student_teacher
          (
            student_id int,
            teacher_id int,
            FOREIGN KEY (student_id) REFERENCES student (s_id),
            FOREIGN KEY (teacher_id) REFERENCES teacher (t_id)
          );

          INSERT INTO student
          VALUES (1, 'Ryan', 1); -- note the use of 1 for TRUE
          INSERT INTO student
          VALUES (2, 'Leo', 1);
          INSERT INTO student
          VALUES (3, 'Ernie', 0); -- and 0 for FALSE in SQL

          INSERT INTO teacher
          VALUES (1, 'Levine', 1);
          INSERT INTO teacher
          VALUES (2, 'Foster', 0);
          INSERT INTO teacher
          VALUES (3, 'Schwimmer', 0);

          INSERT INTO student_teacher
          VALUES (1, 1);
          INSERT INTO student_teacher
          VALUES (1, 2);
          INSERT INTO student_teacher
          VALUES (2, 1);
          INSERT INTO student_teacher
          VALUES (2, 2);
          INSERT INTO student_teacher
          VALUES (2, 3);
          INSERT INTO student_teacher
          VALUES (3, 1);
        `])

        let studentQuery = await testUtils.getStudentQuery()
        expect(studentQuery.error, studentQuery.errorMessage).toBeFalsy()

        studentQuery = studentQuery.query
        let result = await testUtils.getQueryResult(studentQuery)

        expect(result.result, result.message, 'Your query results should not be null').not.toBeNull()

        expect(result.result.length, 'Your query should return different number of results').toBe(1)
        result = result.result

        expect(result[0].t_name, 'You seemed to have used the WHERE statement incorrectly').toBe('Levine')

        done()
    })
})
