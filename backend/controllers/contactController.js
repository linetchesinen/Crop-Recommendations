// Example without database (simple working version)

export const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // ✅ Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields"
      });
    }

    // 👉 You can save to DB here later

    console.log("📩 New Contact:", req.body);

    res.status(201).json({
      success: true,
      message: "Contact submitted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// GET all contacts (dummy)
export const getContacts = async (req, res) => {
  res.json({
    success: true,
    data: []
  });
};