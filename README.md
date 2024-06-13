# JSON Question and Answer File Format

This documentation explains how to format a JSON file containing questions and answers for a course. The file should follow the specified structure and rules to ensure proper functionality.

## File Naming

The file should be named in the following format:
```
question_{course_name}.json
```
- `course_name` is the name of the course the questions are related to.

## JSON Structure

The file contains an array of question objects. Each question object should follow this format:
```json
[
    {
        "question": "",
        "options": [
            "",
            "",
            "",
            ""
        ],
        "correctAnswer": 3,
        "image": "path to img",
        "motivation": "reason why selected answer is correct",
        "verified": 1
    },
    {
        "question": "",
        "options": [
            "",
            "",
            "",
            ""
        ],
        "correctAnswer": 2,
        "image": "path to img",
        "motivation": "reason why selected answer is correct",
        "verified": 0
    }
    ...
]
```

### Field Descriptions

- **question** (required): A string representing the question. HTML tags can be used within the question.
  ```json
  "question": "What is the capital of <u>France</u>?"
  ```

- **options** (required): An array of strings, each representing a possible answer to the question. HTML tags can be used within the options.
  ```json
  "options": [
      "Berlin",
      "Madrid",
      "<b>Paris</b>",
      "Rome"
  ]
  ```

- **correctAnswer** (required): 
  - For single-choice questions: An integer representing the index (0-based) of the correct answer within the `options` array.
  ```json
  "correctAnswer": 2
  ```
  - For multiple-choice questions: An array of integers representing the indices (0-based) of the correct answers within the `options` array.
  ```json
  "correctAnswer": [1, 3]
  ```

- **image** (optional): A string representing the path to an image related to the question.
  ```json
  "image": "images/paris.jpg"
  ```

- **motivation** (optional): A string explaining why the selected answer is correct. HTML tags can be used within the motivation.
  ```json
  "motivation": "Paris is the <u>capital</u> of France."
  ```

- **verified** (optional): An integer (1 or 0) indicating whether the question has been verified. If `verified` is 1, it prints a green checkmark; if it is 0, it prints a yellow warning triangle.
  ```json
  "verified": 1
  ```

## Example

Here is an example of a properly formatted JSON file for a course named "Geography":
```json
[
    {
        "question": "What is the <u>capital</u> of France?",
        "options": [
            "Berlin",
            "Madrid",
            "Paris",
            "Rome"
        ],
        "correctAnswer": 2,
        "image": "images/paris.jpg",
        "motivation": "Paris is the capital of France.",
        "verified": 1
    },
    {
        "question": "Which planet is known as the Red Planet?",
        "options": [
            "Earth",
            "Mars",
            "Jupiter",
            "Saturn"
        ],
        "correctAnswer": 1,
        "image": "images/mars.jpg",
        "motivation": "Mars is known as the Red Planet because of its reddish appearance.",
        "verified": 0
    },
    {
        "question": "Select the <b>prime</b> numbers:",
        "options": [
            "2",
            "3",
            "4",
            "5"
        ],
        "correctAnswer": [0, 1, 3],
        "image": "images/prime_numbers.jpg",
        "motivation": "2, 3, and 5 are prime numbers.",
        "verified": 1
    }
]
```
