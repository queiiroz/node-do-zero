// import { createServer } from "node:http";

// const server = createServer((request, respose) => {
//   respose.write("hellooooo");

//   return respose.end();
// });

// server.listen(3333);

// localhost:3333

// POST localhost:3333/videos
// PUT localhost:3333/videos/id
// DELETE localhost:/videos/1

import { fastify } from "fastify";
//import { DataBaseMemory } from "./database-memory.js";
import { randomUUID } from "crypto";
import { request } from "http";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();

//GET(buscar), POST(criar), PUT(alterar), DELETE(deletar), PATCH(alteração especifica)

const database = new DatabasePostgres();

server.post("/videos", async (request, response) => {
  const { titulo, descricao, duracao } = request.body;

  await database.create({
    titulo,
    descricao,
    duracao,
  });

  return response.status(201).send();
});

server.get("/videos", async (request) => {
  const search = request.query.search;
  const videos = await database.list(search);

  return videos;
});

server.put("/videos/:id", async (request, response) => {
  const { titulo, descricao, duracao } = request.body;
  await database.update(request.params.id, {
    titulo,
    descricao,
    duracao,
  });

  return response.status(204).send();
});

server.delete("/videos/:id", (request, response) => {
  const videoId = request.params.id;

  database.delete(videoId);

  return response.status(204).send();
});

server.listen({
  host: "0.0.0.0",
  port: process.env.PORT ?? 3333,
});
