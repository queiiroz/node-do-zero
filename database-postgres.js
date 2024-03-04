import { randomUUID } from "crypto";
import { sql } from "./db.js";

export class DatabasePostgres {
  async list(search) {
    let videos;

    if (search) {
      videos = await sql`select * from videos where titulo ilike ${
        "%" + search + "%"
      }`;
    } else {
      videos = await sql`select * from videos`;
    }

    return videos;
  }

  async create(video) {
    const videoId = randomUUID();

    await sql`insert into videos (id, titulo, descricao, duracao) VALUES (${videoId}, ${video.titulo}, ${video.descricao}, ${video.duracao})`;
  }

  async update(id, video) {
    const { titulo, descricao, duracao } = video;

    await sql`update videos set titulo = ${titulo}, descricao = ${descricao}, duracao = ${duracao} WHERE id = ${id}`;
  }

  async delete(id) {
    await sql`delete from videos where id = ${id}`;
  }
}
