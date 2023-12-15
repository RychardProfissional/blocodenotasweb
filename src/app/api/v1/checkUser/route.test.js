test('usuario deve existir', async function (){
    const response = await fetch('http://localhost:3000/api/v1/checkUser', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: 'testeUser',
            password: 'testpassword',
        })
    })
    const result = await response.json()
    expect(result.check).toBe(true);
})

test('usuario não deve existir', async function (){
    const response = await fetch('http://localhost:3000/api/v1/checkUser', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: 'notExistUser',
            password: 'notExitpassword',
        })
    })
    const result = await response.json()
    expect(result.check).toBe(false);
})