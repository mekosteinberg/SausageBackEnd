# SausageBackEnd

Back end API for Sausage App connected to MongoDB via Atlas Cluster
and deployed to heroku

## Technologies Uaws

- Node/Express
- MongoDB
- Mongoose
- dotenv
- cors
- postman


### Authentication Using
- express-session
- bcrypt
- connect-mongodb-session to store sessions server side

## Unsolved Problems

We intended to include authorization and users so that anyone who is logged in could rate the sausages providing each item with an average rating. However, getting sessions to work through react proved to be really challenging. I intended to crate my own authorization instead of relying on a third party authentication service like Oauth because I wanted the experience creating my own authentication service. 

### Resource Links
For mongodb sessions 
- https://www.npmjs.com/package/connect-mongodb-session 
- https://github.com/mongodb-js/connect-mongodb-session

A three part resource to help me implement auth (it wasnt the best but the technologies used are IDENTICAL to what I was using so I thought it would make for a good resrouce.) https://blog.devgenius.io/mern-auth-with-session-part-2-session-with-mongodb-and-express-b185c17ad6f0

I had to learn about Async functions
to my knowledge, async functions use async and await for promise-based behavior.
This was used to wait until the data was ready before accessing it

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function








