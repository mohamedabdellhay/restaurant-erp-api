import ResponseHandler from "../utils/responseHandler.js";
import asyncHandler from "../utils/asyncHandler.js";
import { appendBaseUrl } from "../utils/urlHelper.js";

class UploadController {
  upload = asyncHandler(async (req, res) => {
    if (!req.file) {
      return ResponseHandler.error(res, "No file uploaded", 400);
    }

    const filePath = `/uploads/images/${req.file.filename}`;
    ResponseHandler.success(
      res,
      { 
        path: filePath,
        url: appendBaseUrl(filePath) 
      },
      "File uploaded successfully",
    );
  });
}

export default new UploadController();
