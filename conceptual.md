### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
> Using JS promises, jQuery or axios libraries

- What is a Promise?
> A promise is an object that can be fulfilled or denied at a future time.

- What are the differences between an async function and a regular function?
> Regular functions are run completely at the time of calling. Async functions are passed to the browser and ran when the information is returned.

- What is the difference between Node.js and Express.js?
> Node is a backend program used to run other frameworks. Express is a framework built for backend web development.

- What is the error-first callback pattern?

- What is middleware?
> Middleware runs between the route calls as opposed to before and after the route call.

- What does the `next` function do?
> Instructs express to continue to the next group of code.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
> It is very repetitive and the users are hardcoded into the code. It will completely useless and unable to be reused. You shouldn't call three identical calls in one function. Rather you could write the function and pass the user in as a parameter and the function would be reuseable.
> The last user looks inaccurate and will likely throw an error. So even if the first 2 users were found the last one would be denied and throw an error or return undefined to the array of users.
