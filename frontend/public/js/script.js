let jwtToken = null

function login() {
    let username = document.getElementById('username').value
    fetch(`http://localhost:3000/api/login/${username}`, {
    }).then((user) => user.json())
    .then((data) => {
        if (data == 'ACCESS DENIED') {
            alert('USER NOT FOUND')
            return
        } else {
            jwtToken = data.token
            alert(`TOKEN ${jwtToken}`);
            document.location.href=`/api/admin/${jwtToken}`
        }
    }).catch((err) => {
        console.log(err);
    })
}

function moveToAdmin(token) {
    fetch('http://localhost:3000/api/admin', {
        headers: {'x-access-token': jwtToken}
    }).catch((err) => {
        console.log(err);
    })
}
