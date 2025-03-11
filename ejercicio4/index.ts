/*

Problem statement: Client that uses this API to store values
complains that saving values doesn't work.

Apparently, API will say that it saved items, but return
incorrect values when queried. Also, deleting items is erratic,
causing items to "go back in time" or return nonsensical values.
*/

import express, { type Request, type Response } from "express";
import cors from "cors";

interface MemoryItem {
  id: string;
  value: number | string | boolean | object;
}

const savedItems: MemoryItem[] = [];

const app = express();
app.use(express.json());
app.use(cors());

app.get("/items/all", (req: Request, res: Response) => {
  res.json(savedItems);
});

app.get("/items/:id", (req: Request, res: Response) => {
  const item = savedItems.find((item) => item.id === req.params.id);

  if (!item) {
    res.status(404).json({ error: "Item not found" });
    return;
  }

  res.json(item);
});

app.post("/items/:id", (req: Request, res: Response) => {
  const newItem: MemoryItem = {
    id: req.params.id,
    value: req.body,
  };

  console.log(newItem.value);

  savedItems.push(newItem);
  res.status(200).json(newItem);
});

app.delete("/items/:id", (req: Request, res: Response) => {
  const savedItem = savedItems.findIndex((item) => item.id === req.params.id);

  if (savedItem === -1) {
    res.status(404).json({ error: "Item not found" });
    return;
  }

  const deletedItem = savedItems.splice(savedItem, 1);
  res.json(deletedItem[0]);
});

const PORT = process.env.PORT || 8099;
;
app.listen(PORT, () => {
  console.log(`Running on port http://localhost:${PORT}`);
});
