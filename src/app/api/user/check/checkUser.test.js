test('api/v1/user/check - usuario deve existir', async function (){
    const res = await fetch( 'http://localhost:3000/api/user/check', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: 'testeuser',
            password: 'testpassword',
        })
    })
    
    const result = await res.json()
    expect(result.ok).toBe(true)
})

test('api/v1/user/check - usuario não deve existir', async function (){
    const res = await fetch('http://localhost:3000/api/user/check', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: 'notExistUser',
            password: 'notExitpassword',
        })
    })
    const result = await res.json()
    expect(result.ok).toBe(false);
})