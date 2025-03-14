/*
	Problem statement: Client that uses this API to store values
	complains that saving values doesn't work.

	Apparently, API will say that it saved items, but return
	incorrect values when queried. Also, deleting items is erratic,
	causing items to "go back in time" or return nonsensical values.

*/

import express, { type Request, type Response } from "express";
import cors from "cors";
import { error } from "console";

interface MemoryItem {
  //Interface
  id: string;
  value: {
    name: string;
    list: string[];
  };
}

const savedItems: MemoryItem[] = [];

const app = express();
app.use(express.json());
app.use(express.text());
app.use(cors());

// * MemoryItems validation
const isValidMemoryItem = (item: any): item is MemoryItem => {
  return (
    typeof item.id === "string" &&
    typeof item.value === "object" &&
    item.value !== null &&
    typeof item.value.name === "string" &&
    Array.isArray(item.value.list) &&
    item.value.list.every((element: any) => typeof element === "string")
  );
};

const isValidBody = (
  body: unknown
):
  | { isValid: true; parsedValue: {name: string; list: string[] }}
  | { isValid: false; errorMessage: string } => {
  if (typeof body !== "object" || body === null) {
    return {
      isValid: false,
      errorMessage: "Body must be an object",
    };
  }

  const { name, list } = body as { name: unknown; list: unknown };

  if (typeof name !== "string") {
    return {
      isValid: false,
      errorMessage: "Property 'name' must be a string",
    };
  }

  if (
    !Array.isArray(list) ||
    !list.every((element) => typeof element === "string")
  ) {
    return {
      isValid: false,
      errorMessage: "Property 'list' must be an array of string",
    };
  }

  return {
    isValid: true,
    parsedValue: { name, list },
  };
};
//? -------------------------------------------------------------

//function to validate ID
const isValidId = (
  id: string
): { isValid: true } | { isValid: false; errorMessage: string } => {
  if (id.length > 20) {
    return {
      isValid: false,
      errorMessage: "Length must be less than 20 characters.",
    };
  }

  const invalidElements = [" ", "_", "!", "?", ";", ".", '"', "'"];
  for (const invalid of invalidElements) {
    if (id.includes(invalid)) {
      return {
        isValid: false,
        errorMessage: `character '${invalid}' is not valid in id.`,
      };
    }
  }

  return { isValid: true };
};

app.get("/items/all", (_req: Request, res: Response) => {
  res.json(savedItems);
});

app.get("/items/:id", (req: Request, res: Response) => {
  const validationResult = isValidId(req.params.id);
  if (!validationResult.isValid) {
    res.status(400).json(validationResult.errorMessage);
    return;
  }

  const item = savedItems.find((item) => item.id === req.params.id);

  if (!item) {
    res.status(404).json({ error: "Item not found" });
    return;
  }

  if (!isValidMemoryItem(item)) {
    res.status(500).json({ error: "Invalid item structure" });
    return;
  }

  console.log(item)
  res.json(item);
});


//endpoint to update items
app.patch("/items/:id", (req: Request, res: Response) => {
  const idValidationResult = isValidId(req.params.id);
  const existingElement = savedItems.find((item) => item.id === req.params.id);

  const bodyValidationResult = isValidBody(req.body);

  if (!bodyValidationResult.isValid) {
    res.status(400).json(bodyValidationResult.errorMessage);
    return;
  }

  if (!idValidationResult.isValid) {
    res.status(400).json(idValidationResult.errorMessage);
    return;
  }

  if (!existingElement) {
    res.status(400).json(`Element with id '${req.params.id}' does not exist.`);
  } else {
    existingElement.value = bodyValidationResult.parsedValue;
    if (!isValidMemoryItem(existingElement)) {
      res.status(500).json({ error: "Invalid item after update" });
      return;
    }
    console.log(existingElement); // verificar
    res.status(200).json(existingElement);
  }
});

app.post("/items/:id", (req: Request, res: Response) => {
  const idValidationResult = isValidId(req.params.id);
  const bodyValidationResult = isValidBody(req.body);

  if (!bodyValidationResult.isValid) {
    res.status(400).json(bodyValidationResult.errorMessage);
    return;
  }

  if (!idValidationResult.isValid) {
    res.status(400).json(idValidationResult.errorMessage);
  } else {
    if (savedItems.find((item) => item.id === req.params.id)) {
      res
        .status(400)
        .json(`Element with id '${req.params.id}' already exists.`);
    } else {
      const newItem: MemoryItem = {
        id: req.params.id,
        value: bodyValidationResult.parsedValue,
      };
      savedItems.push(newItem);
      res.status(200).json(newItem);
    }
  }
});

app.delete("/items/:id", (req: Request, res: Response) => {
  const validationResult = isValidId(req.params.id);
  if (!validationResult.isValid) {
    res.status(400).json(validationResult.errorMessage);
    return;
  }
  const savedItem = savedItems.findIndex((item) => item.id === req.params.id);

  if (savedItem === -1) {
    res.status(404).json({ error: "Item not found" });
    return;
  }

  const deletedItem = savedItems.splice(savedItem, 1);
  res.json(deletedItem[0]);
});

const PORT = 8099;
app.listen(PORT, () => {
  console.log(`Running on port 8099 http://localhost:${PORT}`);
});
