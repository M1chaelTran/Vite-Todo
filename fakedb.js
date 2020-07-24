import { Server, Model, Factory } from "miragejs";
import faker from "faker";

export default ({ namespace = "api" } = {}) =>
  new Server({
    models: {
      todo: Model,
    },
    factories: {
      todo: Factory.extend({
        todoId: faker.random.uuid,
        name: () => faker.lorem.sentence(10),
        complete: faker.random.boolean,
        createdAt: () => Date.parse(faker.date.recent()).valueOf(),
        updatedAt: () => Date.parse(faker.date.recent()).valueOf(),
      }),
    },
    seeds(server) {
      server.createList("todo", 5);
    },
    routes() {
      this.namespace = namespace;
      this.timing = 2000;

      this.get("todos", function (schema) {
        return schema.db.todos;
      });

      this.post("todos", function (schema, req) {
        let { name } = JSON.parse(req.requestBody);

        const todoId = random.uuid();
        const now = Date.now();
        schema.db.todos.insert({
          todoId,
          name,
          complete: false,
          createdAt: now,
          updatedAt: now,
        });

        return schema.db.todos.findBy({ todoId });
      });

      this.patch("todos/:todoId", (schema, req) => {
        const { todoId } = req.params;
        let { complete, name } = JSON.parse(req.requestBody);

        schema.db.todos.update(
          { todoId },
          {
            todoId,
            name,
            complete,
            updatedAt: Date.now(),
          }
        );

        return schema.db.todos.findBy({ todoId });
      });

      this.delete("todos/:todoId", (s, r) => {
        const { todoId } = r.params;
        s.db.todos.remove({ todoId });
      });
    },
  });
