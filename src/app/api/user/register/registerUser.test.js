test('api/v1/user/register - criando usuário de forma correta', async function (){
    const res = await fetch(`http://localhost:3000/api/user/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: 'testeuser',
            password: 'testpassword',
            email: 'teste@gmail.com'
        })
    })

    const result = await res.json()
    expect(result.ok).toBe(true)
})

test('api/v1/user/register - tentanco criar usuário que já existe', async function (){
    const res = await fetch(`http://localhost:3000/api/user/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: 'testeuser',
            password: 'senhaqualquer',
            email: 'email@gmail.com'
        })
    })
    const result = await res.json()
    expect(result.ok).toBe(false)
})

test('api/v1/user/register - tentanco criar usuário sem nome', async function (){
    const res = await fetch(`http://localhost:3000/api/user/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: '',
            password: 'senhaqualquer',
            email: 'blabla@gmail.com'
        })
    })
    const result = await res.json()
    expect(result.ok).toBe(false)
})

test('api/v1/user/register - tentanco criar usuário com email que já existe', async function (){
    const res = await fetch(`http://localhost:3000/api/user/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: 'nameteste',
            password: 'senhaqualquer',
            email: 'teste@gmail.com'
        })
    })
    const result = await res.json()
    expect(result.ok).toBe(false)
})
