import fetch from "node-fetch";

const handler = async (req, res) => {
  let url = `https://tile.googleapis.com/v1/3dtiles/root.json`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "X-GOOG-API-KEY": import.meta.env.VITE_GOOGLE_API_KEY,
      },
    });

    if (!response.ok) {
      res.status(response.status).json({ error: response.statusText });
      return;
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
