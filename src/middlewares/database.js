import { readFile, writeFile } from "node:fs/promises";

const path = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    readFile(path, "utf8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    writeFile(path, JSON.stringify(this.#database));
  }

  select(table) {
    let data = this.#database[table] ?? [];
    
    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  update(table, id, data){
    const rowIndex = this.#database[table].findIndex(row => row.id === id) //Encontrar o indice do array que seja compativel com a id da requisição

    if (rowIndex > -1){
      const row = this.#database[table][rowIndex]
      this.#database[table][rowIndex] = { id, ...row, ...data}
      this.#persist()
    }
  }

  delete(table, id){
    const rowIndex = this.#database[table].findIndex(row => row.id === id) //Encontrar o indice do array que seja compativel com a id da requisição

    if(rowIndex > -1){
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }
}
