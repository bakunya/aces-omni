import { Hono } from "hono";
import { dev } from "./dev";

const app = new Hono<{ Bindings: Env }>()


app.route("/dev", dev)
export default app