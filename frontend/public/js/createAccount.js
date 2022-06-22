function createAccount() {
    fetch('http://localhost:3000/api/create', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            role: 'user'
        })
    })
}