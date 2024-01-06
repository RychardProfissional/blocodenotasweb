import prisma from "@/database/prisma"

const apiRoute = `${process.env.API_BASE_URL}/auth/register`

afterAll(async () => {
  await prisma.user.deleteMany()
})

beforeAll(async () => {
  await prisma.user.deleteMany()
})

teste("Registro de usuário - forma correta - sem email", async () => {
  fetch(apiRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: "testeName1", password: "senha" }),
  })
    .then((response) => {
      expect(response.ok).toBe(true)
      if (!response.ok) throw new Error()
      return response.json()
    })
    .then(({ auth }) => {
      expect(auth).toBe(true)
    })
    .catch((e) => {})
})

teste("Registro de usuário - forma correta - com email", async () => {
  fetch(apiRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "testeName2",
      password: "senha",
      email: "seila@gmail.com",
    }),
  })
    .then((response) => {
      expect(response.ok).toBe(true)
      if (!response.ok) throw new Error()
      return response.json()
    })
    .then(({ auth }) => {
      expect(auth).toBe(true)
    })
    .catch((e) => {})
})

teste("Registro de usuário - forma errada - sem senha", async () => {
  fetch(apiRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "testeName3",
    }),
  })
    .then((response) => {
      expect(response.ok).toBe(true)
      if (!response.ok) throw new Error()
      return response.json()
    })
    .then(({ auth }) => {
      expect(auth).toBe(false)
    })
    .catch((e) => {})
})

teste("Registro de usuário - forma errada - sem nome", async () => {
  fetch(apiRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: "senha",
    }),
  })
    .then((response) => {
      expect(response.ok).toBe(true)
      if (!response.ok) throw new Error()
      return response.json()
    })
    .then(({ auth }) => {
      expect(auth).toBe(false)
    })
    .catch((e) => {})
})
