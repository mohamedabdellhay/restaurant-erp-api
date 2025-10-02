class AuthController {
  // Register new user
  async register(req, res) {
    res.json({
      message: "register new user",
    });
  }

  // Login user
  async login(req, res) {
    res.json({
      message: "logged user",
    });
  }

  // Logout user
  async logout(req, res) {
    res.json({
      message: "user logged out",
    });
  }

  // Get current user profile
  async getProfile(req, res) {
    res.json({
      message: "user data",
    });
  }

  // Update user profile
  async updateProfile(req, res) {}

  // Change password
  async changePassword(req, res) {}

  // Forgot password - send reset link
  async forgotPassword(req, res) {}

  // Reset password with token
  async resetPassword(req, res) {}

  // Refresh access token
  async refreshToken(req, res) {}

  // Verify email
  async verifyEmail(req, res) {}
}

export default new AuthController();
