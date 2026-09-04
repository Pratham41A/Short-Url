import { body, param, validationResult, checkExact } from 'express-validator';
//bail stops upcoming validation checks for current input if current validation check fails
export async function validateCreateShortUrl(req, res, next) {
  try {
    await Promise.all([
      body('destinationUrl')
        .notEmpty().withMessage("Missing Destination Url")
        .bail()
        .isURL().withMessage("Invalid Destination Url")
        .run(req),
      body('expirySeconds')
        .notEmpty().withMessage("Missing Expiry Seconds")
        .bail()
        .isInt({ min: 60, max: 86400 }).withMessage("Invalid Expiry Seconds")
        .run(req),
    ]);

    await checkExact().run(req);
    
    const validationErrors = validationResult(req).array();
    const { length : validationErrorsLength } = validationErrors || {};
    if (validationErrorsLength > 0) {

      const missingErrors = validationErrors
        .filter(error => {
          const { msg } = error || {};
          return msg.startsWith("Missing");
        })
        .map(error => {
          const { msg } = error || {};
          return msg;
        });

const { length : missingErrorsLength } = missingErrors || {};

      if (missingErrorsLength > 0) {
        return res.status(400).json({
          error: missingErrors.join(", ")
        });
      }

      const otherErrors = validationErrors
        .filter(error => {
          const { msg } = error || {};
          return !msg.startsWith("Missing");
        })
        .map(error => {
          const { msg } = error || {};
          return msg;
        } );

      const { length : otherErrorsLength } = otherErrors || {};
      if (otherErrorsLength > 0) {
        return res.status(422).json({
          error: otherErrors.join(", ")
        });
      }
    }

    return next();
  } catch (error) {
    const { message } = error || {};
    return res.status(500).json({ error: message });
  }
}

export async function validateOpenDestinationUrl(req, res, next) {
  try {
    await param('id')
      .notEmpty().withMessage("Missing Id")
      .bail()
      .isInt({ min: 1 }).withMessage("Invalid Id")
      .run(req);

    const validationErrors = validationResult(req).array();

    const { length : validationErrorsLength } = validationErrors || {};
    if (validationErrorsLength > 0) {
      const missingErrors = validationErrors
        .filter(error => {
          const { msg } = error || {};
          return msg.startsWith("Missing");
        })
        .map(error => {
          const { msg } = error || {};
          return msg;
        });

      const { length : missingErrorsLength } = missingErrors || {};
      if (missingErrorsLength > 0) {
        return res.status(400).json({
          error: missingErrors.join(", ")
        });
      }

      const otherErrors = validationErrors
        .filter(error => {
          const { msg } = error || {};
          return !msg.startsWith("Missing");
        })
        .map(error => {
          const { msg } = error || {};
          return msg;
        } );

      const { length : otherErrorsLength } = otherErrors || {};
      if (otherErrorsLength > 0) {
        return res.status(422).json({
          error: otherErrors.join(", ")
        });
      }
    }

    return next();
  } catch (error) {
    const { message } = error || {};
    return res.status(500).json({ error: message });
  }
}
