class ResponseHandler {
  // Success response
  static success(res, data, message = "Success", statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  // Created response
  static created(res, data, message = "Resource created successfully") {
    return res.status(201).json({
      success: true,
      message,
      data,
    });
  }

  // updated response
  static updated(res, data, message = "Resource updated successfully") {
    return res.status(201).json({
      success: true,
      message,
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
    errors = null
  ) {
    const response = {
      success: false,
      message,
    };

    if (errors) {
      response.errors = errors;
    }

    return res.status(statusCode).json(response);
  }

  // Paginated response
  static paginated(res, data, page, limit, total, message = "Success") {
    return res.status(200).json({
      success: true,
      message,
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
