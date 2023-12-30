test("api/user/create - criando usuário de forma correta", async function () {
  const newUser = {
    name: "testeUser2",
    password: "testpassword",
    email: "test@gmail.com",
  };
  const res = await fetch(`http://localhost:3000/api/user/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  const result = await res.json();
  expect(result.ok).toBe(true);
});

test("api/user/create - tentando criar usuário duas vezes", async function () {
  const newUser = {
    name: "testeUser2",
    password: "testpassword",
    email: "test@gmail.com",
  };
  const res = await fetch(`http://localhost:3000/api/user/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  const result = await res.json();
  expect(result.ok).toBe(false);
});

test("api/user/create - tentanco criar usuário sem nome", async function () {
  const newUser = {
    name: "",
    password: "senhaqualquer",
    email: "blabla@gmail.com",
  };
  const res = await fetch(`http://localhost:3000/api/user/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  const result = await res.json();
  expect(result.ok).toBe(false);
});

test("api/user/create - tentanco criar usuário com email que já existe", async function () {
  const res = await fetch(`http://localhost:3000/api/user/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "nameteste",
      password: "senhaqualquer",
      email: "teste@gmail.com",
    }),
  });
  const result = await res.json();
  expect(result.ok).toBe(false);
});
