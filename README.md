## NodeJS implementing an API endpoint for login with refresh token logic. 

> Login POST API endpoint `localhost:3000/api/login`

Request.body
```
{
	"email": "xyz@xyz.com",
	"name": "xyz"
}
```

---
> API to check token is expired or not

Headers
```
{
  "x-access-header": // response from api/login and attribute of access_token 
}
```
