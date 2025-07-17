import {sanitize} from '../service/sanitize.js'
import { redisDbClient } from '../config/redisDb.js'
export async function createShortUrl(req, res) {
  try {

    var { url, minute } = req.body;

  minute=sanitize(minute);
    const id = String(Math.floor(Math.random() * 100000)).padStart(5, '0'); 
   
    const serverUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    const shortUrl = serverUrl+'/'+id;

   
    await redisDbClient.set(id, url , {
      EX: Number(minute) * 60,
    });

    res.status(201).json({ shortUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function openDestinationUrl(req, res) {
  try {
    var { id } = req.params;  
      id=sanitize(id);
    if (await redisDbClient.exists(id)) {
      const destionationUrl = await redisDbClient.get(id);
      res.redirect(destionationUrl);
    } else {
      res.status(404).json({ error: "Short-Url Doesn't Exist Or Expired" });
    }
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};
