import { login } from "./login-service";
test("login valid username", async () => {
  const session = await login("Banphaeo.Staff", "BanPhaeo");
  expect(session.length).toBeGreaterThan(0);
});

test("login valid username", async () => {
  const session = await login("Banphaeo.Staff", "stupid password");
  expect(session.length).toBe(0);
});
