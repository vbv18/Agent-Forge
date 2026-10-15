export function getCurrentUser(req, res) {
  try {
    const user = req.user;

    return res.status(200).json(user);
  } catch (error) {
    console.error("[Get-Current-User Error]", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
