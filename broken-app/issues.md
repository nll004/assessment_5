# Broken App Issues
1. Use of var was replaced throughout file. Const was used for all variables except the variables that need reassiging.

2. Made use of ES6 arrow functions to make the function more compact.

3. Enabled the POST route to receive JSON data with app.use(express.json()).

6. Added more details to the response since most of the information will be null if the github user does not have a completed profile.
