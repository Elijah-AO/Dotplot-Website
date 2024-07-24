# Dotplot-Website

Website for Tech Academia X Dotplot Hackathon

# Usage

## Initialising the database

1. Install PostgreSQL
2. start the psql shell (remember your username and password)
3. in the psql shell, run `CREATE DATABASE <database name>`
4. Install python
5. cd to the `dotplot-backend` folder
6. run: `pip install -r requirements.txt`
7. Edit the values in the .env.example file to match the PostgreSQL server configuration on your device
8. Rename .env.example to .env
9. run: `python init_database.py`

## Running the Server

1. Install python
2. cd to the `dotplot-backend` folder
3. run: `pip install -r requirements.txt`
4. run: `python main.py`

## Running the frontend dev server

1. Install node & npm
2. cd to `dotplot-website` folder
3. run: `npm install`
4. run: `npm run dev`

# Endpoints

Where applicable, body should be send in json format.

## /api/patient

### GET

**Required body**: none
**Returns**: All patient info and their US scan info

### POST

**Required body**: patient_name, age,height, weight and breast cancer history
**Returns**: The id of the newly created patient

## /api/patient/<id>

### GET

**Required body**: none
**Returns**: The info of the patient with the given id

## /api/us-scan

### GET

**Required body**: none
**Returns**: All US scan info

## /api/us-scan/<id>

### GET

**Required body**: none
**Returns**: US scan info for given id

### POST

**Required body**: coordinates, scan_date, diagnosis and patient_id
**Returns**: The id of the newly created US scan

## /api/us-scan/image/<id>

### GET

**Required body**: none
**Returns**: US scan image for given id

### POST

**Required body**: image in png format
**Returns**: Success message
