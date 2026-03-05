const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/visualise", async (req, res) => {
  const { image, prompt } = req.body;
  const response = await openai.images.edit({
    model: "dall-e-2",
    image: Buffer.from(image.split(",")[1], "base64"),
    prompt,
    n: 1,
    size: "1024x1024",
  });
  res.json({ resultUrl: response.data[0].url });
});
