I have added the following features to the TODO list:

-> You can add family members

-> You can use different types of TODO lists like daily, weekly, monthly and yearly.

The Database schema looks something like this:

Name of the database: notes

There are two tables in this database, namely "users" and "items".

"users" table has two columns :- id, name, color

"list_items" has four columns :- id, title, user_id (foriegn key), item_type

In "items", the column "item_type" can take any one of the following values: "daily", "weekly", "monthly" and "yearly"

Here is the SQL for those tables ::

CREATE TABLE users (

id SERIAL PRIMARY KEY,

name VARCHAR(20), 

color VARCHAR(10)
);

CREATE TABLE list_items (

id SERIAL PRIMARY KEY,

title TEXT,

user_id INTEGER REFERENCES users(id),

item_type VARCHAR(10)

);
