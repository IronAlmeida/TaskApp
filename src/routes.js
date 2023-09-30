import { Database } from "../middlewares/database.js";
import { randomUUID } from "node:crypto";

const database = new Database();

export const routes = [
  {
    method: "GET",
    url: "/tasks",
    handler: (req, res) => {
      const data = database.select("tasks");

      res.end(JSON.stringify(data));
    },
  },
  {
    method: "POST",
    url: "/tasks",
    handler: (req, res) => {
      const { title, description } = req.body;

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date().toLocaleString("pt-BR", {
          timeZone: "America/Sao_Paulo",
        }),
        updated_at: new Date().toLocaleString("pt-BR", {
          timeZone: "America/Sao_Paulo",
        }),
      };

      database.insert("tasks", task);

      res.writeHead(201).end();
    },
  },
];
