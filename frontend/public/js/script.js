let jwtToken = null

function login() {
    let username = document.getElementById('username').value
    fetch(`http://localhost:3000/api/login/${username}`, {
    }).then((user) => user.json())
    .then((data) => {
        if (data.statusCode == 'User not found') {
            return
        } else {
            jwtToken = data.token
            fetch('http://localhost:3000/api/admin', {
                headers: {'x-access-token': jwtToken}
            }).then(res => res.json(res))
            .then((data) => {
                console.log(data.message);
                document.location.href='/admin'
            }).catch((err) => {
                console.log(err);
            })
        }
    }).catch((err) => {
        console.log(err);
    })
}
