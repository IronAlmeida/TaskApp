import { readFile, writeFile } from "node:fs/promises";

const path = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};

  #persist() {
    writeFile(path, JSON.stringify(this.#database));
  }

  select(table) {
    if (this.#database[table]) {
      const data = this.#database[table];
      return data;
    }

    return [];
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();
  }
}
