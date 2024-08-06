import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "notes",
  password: "vitoseks5",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


let items = [];
let currentUserId = 1;

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM items ORDER BY id ASC");
    items = result.rows;
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try {
    const result = await db.query("SELECT id FROM items ORDER BY id ASC");
    const newId = result.rows.length + 1;
    // vložení nové položky s určeným id do databáze
    await db.query("INSERT INTO items (id, title) VALUES ($1, $2)", [newId, item]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
  const item = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;
  try {
    await db.query("UPDATE items SET title = ($1) WHERE id = $2", [item, id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;
  try {
    await db.query("DELETE FROM items WHERE id = $1", [id]);
    // Obnovení id tak, aby byly sekvenční
    const result = await db.query("SELECT id FROM items ORDER BY id ASC");
    for(let i = 0; i<result.rows.length;i++){
      const newId = i+1;
      const oldId = result.rows[i].id;
      if(newId !==oldId) {
        await db.query("UPDATE items SET id = $1 WHERE id = $2",[newId,oldId])
      }
    }
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
