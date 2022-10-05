# Project 14: Around the U.S. authentication and authorization — specifically front-end authorization in React.

##

This about authorization and registration on the frontend with React. The frontend built in different project, you can check it out : https://github.com/tamerjb/around-react
authorization\registration\token requests all go through to the server running on https://register.nomoreparties.co.

### Project Idea:

To protect the site with a protected route that will only show if the user is logged in.user can view only if :

- new visitor and registered into the signup form, and then logged in with the same credentials in the login form
- returning visitor, and a jwt token that is stored in the users localStorage is verified and returns valid information. If not, then the token was changed.

When the user login:

- will be shown an information tooltip that will inform them of the login status whether it succceeded or failed
- In the event of successful login, the user will also be redirected to the homepage.

#### Design File Used:

[Figma](https://www.figma.com/file/yXGGl4EnWYEPzGJU2dSJ1L/Sprint-14-Registration-and-Authorization?node-id=0%3A1)

### Project features

1. React JS
2. Authentication, Authorization, Identication
3. Javascript
4. ES6
5. localStorage data manipulation

#### Link For Live Site:

[Around Us.](https://tamerjb.github.io/react-around-auth)

## Developer: Tamir JB
