# login info

username: admin
password: Aa@123.123

**backend resource, built by [@yousef132](https://github.com/yousef132/School-Managament-System)**

# Refactors

**fixes:**
- [ ] make the form inputs of the react hook form array of objects to make the component clearer.
- [ ] create a UI Component for the departments or any multi-data columns.
- [x] refactor all the endpoints objects keys
- [x] create user endpoint return error `image is required`, while I'm realy uploading the image. *I used `watch().image[0]` instead of `data.image[0]`*
- update endpoints
  - [x] users (get, get single data, create,update,reset password)
  - [x] instructors (get, get single data, create,update)
  - [x] departments (get, get single data, create,update)
  - [x] subjects (get, get single data, create,update)
  - [x] students (get, geet single data, create,update)
- sub data for endpoints
  - [x] instructors -> departmen
  - [x] departments -> instructor as a manager
  - [x] students -> departmen
  - [ ] subjects -> departmen -> this will be updated from the api then resolve
- [x] dynamic breadcrump
- [x] add image update for user update endpoint
- [x] solve the image user update endpoint not accepts the image url.

**profiles:**
- [x] dashboard page for general information
- [x] user profile
- [x] instructor profile
- [x] student profile
- [x] department profile

**missed endpoints:**
- [ ] add subject to department -> waiting for the backend to resovle this issue
- [x] add instructor to department
- [x] add student to department

