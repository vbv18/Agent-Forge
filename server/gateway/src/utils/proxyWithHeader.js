import proxy from "express-http-proxy";

export default function proxyWithHeader(url) {
  return proxy(url, {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers["x-user-id"] = srcReq.user.userId;
    },
  });
}
