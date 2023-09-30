import { Database } from "./middlewares/database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";
import { url } from "node:inspector";

const database = new Database();

export const routes = [
  {
    method: "GET",
    url: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const data = database.select("tasks");

      res.end(JSON.stringify(data));
    },
  },
  {
    method: "POST",
    url: buildRoutePath("/tasks"),
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
  {
    method: "PUT",
    url: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      if (!title || !description){
        return res.writeHead(400).end(
          JSON.stringify({message: "Titulo ou descrição são obrigatórios!"})
        )
      }

      const updateTask = {
        title,
        description,
        updated_at: new Date().toLocaleString("pt-BR", {
          timeZone: "America/Sao_Paulo",
        }),
      }

      database.update('tasks', id, updateTask)

      res.end(204)
    }
  },
  {
    method: "DELETE",
    url: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {

     const { id } = req.params
      
      database.delete("tasks", id)

      res.end()
    }
  }
];
