/**
 * Module dependencies.
 */
import app from "../app";
import debugLib from "debug";
//import morgan from "morgan";
//import http from "http";
//const debug = debugLib("api-server:server");

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "3006");
app.set("port", port);
app.listen(app.get("port"), () => {
  console.log(`API server is lisening on port:${port}`);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}
