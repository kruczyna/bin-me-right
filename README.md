# bin-me-right

This repository aims to public an API which will tell the client where to put his trash. There is still a lot of confusion on how to properly segragate, and this API aims to deal with that problem.
The idea is that a client fetches a product name, and the API returns him the full set of informations:
- Does he have to break a particular package into smaller pieces and throw it in two different trash bins?
- Where to put his empty pierogi's or sausage package?
- Does a boiled egg really goes into 'Bio' trash bin?

## Installation

1. Fork or clone this repo on your remote device
2. Run `npm install` to install all the neccessary packages
3. In `database.ts` file change the `mongo_uri` to you own DB URI
4. Save the file with changed variable
5. Run `npm start`
  ... and that's all! At least for now :)
