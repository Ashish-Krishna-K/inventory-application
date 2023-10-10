# Inventory Application

[Live Demo](https://genshin-characters-inventory.onrender.com)

A basic inventory application project as part of [The Odin Project's](https://www.theodinproject.com/dashboard) NodeJS course.

_This project was originally built during my first run of The Odin Project and can be viewed in the [old](https://github.com/Ashish-Krishna-K/inventory-application/tree/old) branch. During my second run, I"m reworking the projects and decided to use TypeScript as a practice._

## The File Structure

The Project is designed in the classic MVC pattern. The **Models** refer to how the data is structured in the database. The **Controllers** are the business logic of the application and the **Views** are the presentation component of the application.

The **routes/** directory holds all the files which handles all the routing based on the request.

Since I'm using _TypeScript_ the application source code is split into a **src/** directory and a **dist/** directory. The **src/** directory is the source files written in typescript while the complied output files is in the **dist/** files. The server starter script in **bin/www** refers toe the **dist/** directory for the application files.
