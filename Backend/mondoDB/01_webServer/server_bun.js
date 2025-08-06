import { serve } from "bun";
//in bun serve does the listen part internally so it is easy to write
serve({
  fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/") {
      return new Response("hello friends", { status: 200 });
    } else if (url.pathname === "/about") {
      return new Response("know about us", { status: 200 });
    } else {
      return new Response("404 not found", { status: 404 });
    }
  },
  port: 3000,
  hostname: "127.0.0.1",
});
