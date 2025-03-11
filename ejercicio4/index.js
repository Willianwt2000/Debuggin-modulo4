"use strict";
/*

Problem statement: Client that uses this API to store values
complains that saving values doesn't work.

Apparently, API will say that it saved items, but return
incorrect values when queried. Also, deleting items is erratic,
causing items to "go back in time" or return nonsensical values.

*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const savedItems = [];
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/items/all", (req, res) => {
    res.json(savedItems);
});
app.get("/items/:id", (req, res) => {
    const item = savedItems.find((item) => item.id === req.params.id);
    if (!item) {
        res.status(404).json({ error: "Item not found" });
        return;
    }
    res.json(item);
});
app.post("/items/:id", (req, res) => {
    const newItem = {
        id: req.params.id,
        value: req.body,
    };
    console.log(newItem.value);
    savedItems.push(newItem);
    res.status(200).json(newItem);
});
app.delete("/items/:id", (req, res) => {
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
//# sourceMappingURL=index.js.map