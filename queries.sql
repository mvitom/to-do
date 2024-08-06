CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL
);

INSERT INTO items (title) VALUES ('Buy milk'), ('Finish homework');

SELECT items.id, title, user_id, users.name, users.color
FROM items
JOIN users
ON users.id = user_id;

users
{ id: 1, name: 'Angelina', color: 'teal' }
--  .  -- -- -- --
items
{ id: 1, title: 'text......', user_id: '1' }
