import commands
import json
import os
import sys

def test(test_name, function_name, test_fixture_path, expected_http_code):
    test_fixture_json = read_file_content(test_fixture_path)
    exit_code, console_output = commands.getstatusoutput("AWS_PROFILE=Discipleship serverless invoke local --stage beta --function %s --data '%s'" % (function_name, test_fixture_json))
    print(console_output)

    if exit_code == 0:
        if validate_response_from_console_output(console_output, expected_http_code):
            print("Test %s passed!" % test_name)
            return

    print("Test %s failed, expecting HTTP code %s!" % (test_name, expected_http_code))
    sys.exit(1)

def read_file_content(file_path):
    file_content = open(file_path, "r").read()
    return json.dumps(json.loads(file_content))

def validate_response_from_console_output(console_output, expected_http_code):
    for line in console_output.splitlines():
        if "statusCode" in line:
            return expected_http_code in line

test("success_put_course_create", "putCourse", "tst/fixtures/success_put_course_create.json", "200")
test("failure_put_course_create_conflict", "putCourse", "tst/fixtures/success_put_course_create.json", "409")
test("success_put_course_update", "putCourse", "tst/fixtures/success_put_course_update.json", "200")
test("failure_put_course_update_conflict", "putCourse", "tst/fixtures/success_put_course_update.json", "409")
test("success_get_course", "getCourse", "tst/fixtures/success_get_course.json", "200")
test("success_list_courses", "listCourses", "tst/fixtures/success_list_courses.json", "200")
test("success_delete_course", "deleteCourse", "tst/fixtures/success_delete_course.json", "200")
test("failure_get_course_not_found", "getCourse", "tst/fixtures/success_get_course.json", "404")
test("failure_delete_course_not_found", "deleteCourse", "tst/fixtures/success_delete_course.json", "404")
