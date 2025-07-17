import express from "express";
import {validateCreateShortUrl,validateOpenDestinationUrl} from '../middleware/url.js'
import {createShortUrl,openDestinationUrl} from '../controller/urlController.js'
const urlRouter = express.Router();

urlRouter.post("/", validateCreateShortUrl,createShortUrl);
urlRouter.get("/:id" ,validateOpenDestinationUrl,openDestinationUrl);

export default urlRouter;
