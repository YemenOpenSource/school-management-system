# Refactors

- [ ] make the form inputs of the react hook form array of objects to make the component clearer.
- [ ] create a UI Component for the departments or any multi-data columns.
- [ ] refactor all the endpoints objects keys
- [ ] create user endpoint return error `image is required`, while I'm realy uploading the image.
- update endpoints
  - [x] users (get, get single data, create,update,reset password)
  - [x] instructors (get, get single data, create,update)
  - [x] departments (get, get single data, create,update)
  - [ ] subjects (get, get single data, create,update)
  - [x] students (get, get single data, create,update)

- sub data for endpoints
  - [x] instructors -> departmen
  - [x] departments -> instructor as a manager
  - [x] students -> departmen
  - [ ] subjects -> departmen -> this will be updated from the api then resolve

- [ ] dynamic breadcrump