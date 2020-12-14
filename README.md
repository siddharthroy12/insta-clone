# Instagram Clone (MERN Stack)

A clone of Facebook's Instagram app where you can login/register, create new posts, follow other users and see other people you follows posts

![screenshot](https://github.com/siddharthroy12/insta-clone/blob/main/frontend/public/img/screenshot.png)

## Scripts

### To run the server for production
> ```yarn run start```

### To run the server for development
> ```yarn run server```

## Create .env file in root director and fill these fileds
> `NODE_ENV = development`

> `DB_URI = your mongodb uri here`

> `JWT_SECRET = your secret key here`

> `IMGBB_KEY = imgbb api key`

## Todo

-   [x] User can register for an account storing their name, email/username and password then login to the app using their credentials
-   [x] User can create a post and store images to the server (Preferably in a database)
-   [x] User has a profile that displays all the images they have uploaded
-   [x] User can follow other users
-   [x] User can see other users posts (people who the user follows)
-   [x] User can see a global feed of images
-   [x] User can save post
-   [x] Admin can delete any post
-   [ ] Admin can ban user

## License

The MIT License

Copyright (c) 2020 Siddharth Roy https://siddharthroy.netlify.app

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.