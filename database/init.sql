CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role ENUM('tutor', 'tutee') NOT NULL
);

INSERT INTO students (name, role) VALUES
    ('Alice Johnson', 'tutor'),
    ('Bob Smith', 'tutor'),
    ('Charlie Brown', 'tutee'),
    ('Daisy Miller', 'tutee'),
    ('Evan Davis', 'tutee');