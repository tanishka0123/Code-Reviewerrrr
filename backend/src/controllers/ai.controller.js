import aiService from "../services/ai.service.js";

export const aiController = async (req, res) => {
  const code = req.body.code;

  if (!code) {
    return res.status(400).send({
      message: "Prompt is required",
    });
  }
  const result = await aiService(code);
  res.send(result);
};
