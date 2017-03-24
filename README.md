This was a project that was done over 7 days. The idea is to make a shared video game library. Users note what games that have, join a community, and borrow/lend games to users within a community.

# Technical Requirements
* Have at least 2 models (more if they make sense) -- ideally a user model and one that represents the main functional idea for your app
* Include sign up/log in functionality, with hashed passwords & an authorization flow
* Incorporate at least one API. Examples include Yelp, Tumblr, Facebook, and others on Mashape.
* Have complete RESTful routes for at least one of your resources with GET, POST, PUT, and DELETE
* Utilize an ORM to create a database table structure and interact with your relationally-stored data
* Include wireframes that you designed during the planning process

# Progress
* Day 1 - [Planned server-side and database structure](https://trello.com/b/aWPDN2Cj/game-share-app), [wireframe](https://drive.google.com/file/d/0BxEYM4aqzQ9lc05HYmFxUHItRlk/view?usp=sharing) for views. Getting the server-side skeleton up, getting routes and views built to handle general needs and database tests.

* Day 2,3 - Getting the database together and implementing associations, ensuring data from client-side is reaching back-end and database.
* Day 4 - Setting up API call and routes, connecting API data into the database.
* Day 5 - General 'broad strokes' styling of views, conducting user tests, implementing changes from user feedback and general debugging.
* Day 6 - Fine tuned styling and built out the rest of views.
* Day 7 - Deployed, further fine tuning of view styles, bug fixes.

# Front End Technologies Used
* [jQuery](https://jquery.com/)
* [JQuery Ui](https://jqueryui.com/)
* [Bootstrap](http://getbootstrap.com/)
* [Slick Carousel](http://kenwheeler.github.io/slick/)
* [Bootstrap Buttons](https://github.com/codingd0g/push-bootstrap-button-pack)
* [Glyph icons](http://getbootstrap.com/components/#glyphicons)
* [Parallax.js](http://pixelcog.github.io/parallax.js/)

# Back End Technologies Used
* [https://www.npmjs.com/package/express](Express)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [Passport](https://www.npmjs.com/package/passport-local)
* [Postgres](https://www.postgresql.org/)
* [Sequelize](https://www.npmjs.com/package/sequelize)


# Unsolved Problems
* Styling hiccups

# Next Steps
There were many things I had to cut from my final project. It would be awesome to get these additional things in the app.
* Systems that the games belong to
* Account page styling is very messy
* Cloudinary implementation so that users may upload a profile image and communities would have an option to upload a banner image
* Ability to update account/community info
* Games within a community to note when they are checked out
* Cleanup my code, this is my first app doing the full-stack and time constraints were a real concern

# Resources Used:
* Internet Game Database (IGDB) API - https://igdb.github.io/api/about/welcome/
* [Video game Images from reddit.com/r/wallpapers Imgur link](http://imgur.com/gallery/A51wW)
* [Mirrors Edge Image](http://www.mirrorsedge.com/news)
* Photos are hosted on Cloudinary
