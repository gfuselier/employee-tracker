INSERT INTO departments (name)
VALUES ("management"),
       ("brigade");
       
INSERT INTO roles (title, salary, department_id)
VALUES ("executive chef", 100000, 1),
       ("sous chef", 80000, 2),
       ("pastry chef", 70000, 2),
       ("line cook", 50000, 2),
       ("manager", 80000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Carmy", "Berzatto", 1, null),
       ("Sydney", "Adamu", 2, 1),  
       ("Marcus", "Boyce", 3, 2),   
       ("Tina", "Zayas", 4, 2),  
       ("Richie", "Jerimovich", 5, 1);