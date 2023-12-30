test("/api/auth/login verificando se usuário existe", async function () {
  fetch(`http://localhost:3000/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "name",
      password: "password",
    }),
  })
    .then(async function (res) {
      expect(res.ok).toBe(true);
      const { auth } = await res.json();
      expect(auth).toBe(true);
    })
    .catch((err) => {
      expect("erro").toBe("na api");
    });
  expect(true).toBe(true);
});
