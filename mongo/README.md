# Init script format

The initialization scripts must be placed in the folder `scripts`, located in the same directory as this readme.

The script name consists in various parts:
* Phase: incremental number string of phase (see below for codes)
* Order: incremental number string for ordering
* Name: string
* Extension: `.js`

An example of this format is `00-01-init_collectionX.js`, which will be executed after the script `00-00-XYZ.js` and before the script `01-00-populateCollectionX.js`.

The phases are, in order:
1. Init phase (Code: `00`)
1. Populate phase (Code: `01`)

The order code is just a number used to order the execution of scripts which may be dependent from another script.