This is the code used in the course to show how a possible use case of suspense.

## React Suspense

Plenty of code is wasted trying with ternary condinationals to control the UI. With suspense we have React built-in implementation of that with Lazy loading and a fallback (when it's actually loading the component).

## Pros and Cons
Pros is that we now have a built-in solution for controling what should(or not) to be shown in the UI. This is a good practice for bigger applications, specially with bigs loads of data.
I believe there are no cons, but that doesn't mean every react app should be refactored to use suspense right away.
