const { default: User } = require("@/database/user")

const apiRoute = `${process.env.API_BASE_URL}/auth/login`

beforeAll(async () => {
  await User.create("testeName", "senha")
})

afterAll(async () => {
  await prisma.user.deleteMany()
})

teste("Login de usuário - forma correta", async () => {
  fetch(apiRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: "testeName", password: "senha" }),
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
