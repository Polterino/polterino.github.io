CREATE TABLE Example (
	taskID INT,
	description VARCHAR(64),
	supertask INT,
	PRIMARY KEY (taskID),
	FOREIGN KEY (supertask) REFERENCES Example(taskID)
);