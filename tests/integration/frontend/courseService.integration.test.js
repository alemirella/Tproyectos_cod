import { courseService } from "../../../frontend/src/services/courseService.js";
import { server } from "../../setup/frontend/server.js";
import { errorHandlers } from "../../setup/frontend/handlers.js";

describe("courseService — MSW", () => {
  test("list retorna cursos", async () => {
    const list = await courseService.list();
    expect(list.length).toBeGreaterThan(0);
    expect(list[0].code).toBe("CS101");
  });

  test("create curso", async () => {
    const c = await courseService.create({
      code: "NEW1",
      name: "Nuevo",
      credits: 3,
      classroomTypeRequired: "STANDARD",
    });
    expect(c.code).toBe("NEW1");
  });

  test("create incompleto falla", async () => {
    await expect(courseService.create({ name: "X" })).rejects.toThrow();
  });

  test("error 500", async () => {
    server.use(errorHandlers.serverError);
    await expect(courseService.list()).rejects.toThrow();
  });

  test("lista vacía", async () => {
    server.use(errorHandlers.emptyList);
    expect(await courseService.list()).toEqual([]);
  });
});
