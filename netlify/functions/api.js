import jsonServer from "json-server";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(join(__dirname, "../data/db.json"));
const middlewares = jsonServer.defaults();


server.use(middlewares);


server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


server.use(router);

export const handler = async (event) => {

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      },
      body: "",
    };
  }

  const req = {
    method: event.httpMethod,
    url: event.path.replace("/.netlify/functions/api", ""),
    headers: event.headers,
    body: event.body,
  };

  const res = {
    statusCode: 200,
    headers: {},
    body: "",
    setHeader: (name, value) => {
      res.headers[name] = value;
    },
    json: (data) => {
      res.body = JSON.stringify(data);
      res.headers["Content-Type"] = "application/json";
    },
  };

  try {
    await new Promise((resolve, reject) => {
      server(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    return {
      statusCode: res.statusCode || 200,
      headers: res.headers,
      body: res.body,
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
