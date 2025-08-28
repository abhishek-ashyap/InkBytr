// This middleware checks if the user has the 'admin' role.
// It should be used AFTER the verifyToken middleware.

export const adminAuth = (req, res, next) => {
  // We assume verifyToken has already run and attached the user to the request.
  if (req.user && req.user.role === 'admin') {
    next(); // User is an admin, proceed to the next middleware/controller.
  } else {
    // User is not an admin or user is not attached.
    res.status(403).json({ error: 'Forbidden: Access is restricted to administrators.' });
  }
};
