# E-Commerce

### Description

A sample application the mimics a functionality of a marketplace.

### Run with docker

#### Pre-requisites

- Docker Desktop

### Step 1: The code

Clone this repository

### Step 2: The .env file

Open the .env file, copy and paste the code from the .env.example

### Step 2: Dockerization

Run the following commands within the directory of the project. That is within the /ecommerce folder

- Launch Docker Desktop
- Run `docker compose build`
- Run `docker compose up -d`

### Step 3: Seed the database

- Run `docker compose exec app bash`
- Run `php artisan migrate:fresh --seed`
- Run `php artisan storage:link`

### Step 4: Access the application

- Open a web browser and type `http://localhost:8000` in the search bar to start using the application

### Run locally

### Pre-requisites

- XAMPP
- MySQL
- PHP
- Composer
- Laravel installer

### Step 1: The code

Clone this repository

### Step 2: XAMPP Control Panel

- Launch the XAMPP Control Panel
- Start the MySQL module

### Step 3: The .env file

- Open the .env file, copy and paste the code from the .env.example
- Change the DB_HOST value to `127.0.0.1`
- Remove the value of DB_PASSWORD

### Step 3: Build the application

Run the following commands within the directory of the project. That is within the /ecommerce folder

- Run `npm run build`
- Run `php artisan serve`

### Step 4: Access the application

- Open a web browser and type `http://localhost:8000` in the search bar to start using the application
