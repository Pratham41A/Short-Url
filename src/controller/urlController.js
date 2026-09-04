import { sanitize } from '../service/sanitize.js';
import { redisDbClient } from '../config/redisDb.js';
export async function createShortUrl(req, res) {
    try {
      const { env: { BACKEND_SERVER_URL } = {} } = process || {};
      let {body: {expirySeconds, destinationUrl} = {}} = req || {};
      expirySeconds=Number(sanitize(expirySeconds));
      destinationUrl=String(sanitize(destinationUrl));
  
  const id=String(await redisDbClient.incr("short-url"));
  
  const shortUrl=BACKEND_SERVER_URL+"/"+id;
  
  redisDbClient.set(id, destinationUrl , {
      EX: expirySeconds,
    });
  
    return  res.status(201).json({ shortUrl });
  } catch (error) {
    const {message} = error || {};
   return res.status(500).json({ error: message });
  }
}
export async function openDestinationUrl(req, res) {
  try {
    let {params: {id} = {}} = req || {};
    id=String(sanitize(id));

    const destinationUrl=String(await redisDbClient.get(id));
  
    if(!destinationUrl) 
      {
        return res.status(404).json({ error: "Invalid / Expired Id" });
      }
      return res.redirect(destinationUrl);
  }
  catch (error) {
    const {message} = error || {};
    return res.status(500).json({ error: message });
  }
};