import Token from "@/database/token"
import User from "@/database/user"

const apiRoute = `${process.env.API_BASE_URL}/auth/login`
let token, revokedToken, invalidToken, UserInvalidToken

beforeAll(() => {
  token = Token.create("testeUser", "senha")
  revokedToken = Token.create("testeUser2", "senha")
  UserInvalidToken = token.create("testeUser3", "senha")
  invalidToken = "open Sesame"

  User.create("testeUser", "senha")
  User.create("testeUser2", "senha")

  Token.revoke(revokedToken)
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
    body: JSON.stringify({ token: token }),
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

teste("Login de usuário - forma errada - token revogado", async () => {
  fetch(apiRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: revokedToken }),
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

teste(
  "Login de usuário - forma errada - token com usuário inexistente",
  async () => {
    fetch(apiRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: UserInvalidToken }),
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
  }
)

teste("Login de usuário - forma errada - token invalido", async () => {
  fetch(apiRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: invalidToken }),
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
