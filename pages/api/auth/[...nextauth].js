// Replaced by Clerk authentication.
// NextAuth route removed — Clerk handles auth via @clerk/nextjs and middleware.
export default function handler(req, res) {
  res.status(404).json({ error: "Auth route moved to Clerk" });
}
