

export function validateCreateShortUrl(req, res, next) {

    

  var { url, minute } = req.body;


  if (!url || !minute) {
     throw new Error("Both 'url' and 'minute' are required." );
  }


  if (isNaN(minute) || minute <= 0) {
    throw new Error("'minute' must be a positive number." );
  }

new URL(url);
  next();



}


export function validateOpenDestinationUrl(req, res, next) {

  var { id } = req.params;

  if(!id){
    throw new Error(`'id' is required`)
  }
  if  (id.length !== 5 || isNaN(id)) {
    throw new Error(`'id' must be a 5 digit positive number `);
  }

  next();


}