export function POST(req, res) {
  try {
    const body = req.body;

    console.log("Core Web Vital:", body);

    // Example:
    // Save to DB
    // Send to analytics
    // Push to Datadog / Sentry / GA

    return res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ success: false });
  }
}
