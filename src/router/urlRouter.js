import express from "express";
import {validateCreateShortUrl, validateOpenDestinationUrl} from '../middleware/urlMiddleware.js'
import {createShortUrl, openDestinationUrl} from '../controller/urlController.js'
export const urlRouter = express.Router();
urlRouter.post("/", validateCreateShortUrl,createShortUrl);
urlRouter.get("/:id" ,validateOpenDestinationUrl,openDestinationUrl);