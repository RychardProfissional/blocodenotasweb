import Token from "@/database/token"
import User from "@/database/user"
let token

beforeAll(async () => {
  token = Token.create("testeUser", "senha")
  User.create("testeUser", "senha")
})

teste("Logoff de usuario - forma certa", async () => {
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

teste("Logoff de usuario - forma errada - token já revogado", async () => {
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
      expect(auth).toBe(false)
    })
    .catch((e) => {})
})

teste("Logoff de usuario - forma errada - token invalido", async () => {
  fetch(apiRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: "abra-te Sezamo" }),
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
