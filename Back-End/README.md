
# Información de Utilidad
[Link de Ayuda](https://stackoverflow.com/questions/54546823/access-to-xmlhttprequest-at-from-origin-has-been-blocked-by-cors-policy-in-angul)

*Cross Origin Resource Sharing (CORS) is a W3C standard that allows a server to relax the same-origin policy. Using CORS, a server can explicitly allow some cross-origin requests while rejecting others. CORS is safer and more flexible than earlier techniques, such as JSONP. This topic shows how to enable CORS in an ASP.NET Core app.
`<addr>`
This is happening due to the CORS Policy failed on the server side. As you need to either add the client url in appsettings.json file in host Project.*


## appsettings.json
```json
 "App": {
    ......
    "CorsOrigins": "http://localhost:4200"
    ......
  }
```