# Instagram Clone (MERN Stack)

A clone of Facebook's Instagram app where you can login/register, create new posts, follow other users and see other people you follows posts

## Scripts

### To run the server for production
> ```yarn run start```

### To run the server for development
> ```yarn run server```

## Create .env file in root director and fill these fileds
> `NODE_ENV = development`

> `DB_URI = your mongodb uri here`

> `JWT_SECRET = your secret key here`

## Todo

-   [x] User can register for an account storing their name, email/username and password then login to the app using their credentials
-   [x] User can create a post and store images to the server (Preferably in a database)
-   [x] User has a profile that displays all the images they have uploaded
-   [x] User can follow other users
-   [x] User can see other users posts (people who the user follows)
-   [x] User can see a global feed of images
-   [x] User can save post
-   [x] Admin can delete any post