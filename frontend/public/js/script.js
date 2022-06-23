function login() {
    let username = document.getElementById('username').value
    fetch(`http://localhost:3000/api/login/${username}`, {
    }).then((user) => user.json())
    .then((data) => {
        if (data == 'USER NOT FOUND') {
            alert('USER NOT FOUND')
            return
        } else {
            alert('USER FOUND')
            document.location.href = '/admin'
        }
    }).catch((err) => {
        console.log(err);
    })
}
