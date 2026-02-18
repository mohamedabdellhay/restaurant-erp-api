import { getTranslations } from "./translations.js";

class ResponseHandler {
  // Helper to get language from request
  static getLanguage(req) {
    // Check Accept-Language header, default to 'en'
    const acceptLanguage = req?.headers?.["accept-language"] || "en";
    return acceptLanguage.startsWith("ar") ? "ar" : "en";
  }

  // Success response
  static success(res, data, message = "Success", statusCode = 200) {
    const lang = this.getLanguage(res.req);
    const translations = getTranslations(message);

    return res.status(statusCode).json({
      success: true,
      message: lang === "ar" ? translations.ar : translations.en,
      translations,
      data,
    });
  }

  // Created response
  static created(res, data, message = "Resource created successfully") {
    const lang = this.getLanguage(res.req);
    const translations = getTranslations(message);

    return res.status(201).json({
      success: true,
      message: lang === "ar" ? translations.ar : translations.en,
      translations,
      data,
    });
  }

  // updated response
  static updated(res, data, message = "Resource updated successfully") {
    const lang = this.getLanguage(res.req);
    const translations = getTranslations(message);

    return res.status(201).json({
      success: true,
      message: lang === "ar" ? translations.ar : translations.en,
      translations,
      data,
    });
  }

  // No content response
  static noContent(res) {
    return res.status(204).send();
  }

  // Error response
  static error(
    res,
    message = "Something went wrong",
    statusCode = 500,
    errors = null,
  ) {
    const lang = this.getLanguage(res.req);
    const translations = getTranslations(message);

    const response = {
      success: false,
      message: lang === "ar" ? translations.ar : translations.en,
      translations,
    };

    if (errors) {
      response.errors = errors;
    }

    return res.status(statusCode).json(response);
  }

  // Paginated response
  static paginated(res, data, page, limit, total, message = "Success") {
    const lang = this.getLanguage(res.req);
    const translations = getTranslations(message);

    return res.status(200).json({
      success: true,
      message: lang === "ar" ? translations.ar : translations.en,
      translations,
      data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  }
}

export default ResponseHandler;
