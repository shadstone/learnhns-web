# HNS.to

HNS.to (`https://hns.to`) was a simple gateway that let anyone visit Handshake websites without downloading special software or changing computer settings. It was useful for sharing Handshake websites with people who had not used Handshake before. Anyone can still create their own gateway. The original hostname is historical and no longer resolves.

There were three ways to use HNS.to to visit a Handshake website:

1. Go to `https://hns.to` and type in a Handshake domain in the search bar
2. Visit `hns.to/{handshake_domain}` in your browser
3. Visit `{handshake_domain}.hns.to` in your browser

Try visiting welcome.nb/ using each of the three methods above if a replacement gateway is available.

## HTTPS

You could resolve a root Handshake domain using HTTPS with HNS.to like `https://nb.hns.to`. HNS.to was an HTTP proxy, so that only secured the connection between your browser and HNS.to's servers. It did not secure the connection between HNS.to and the Handshake domain.

Subdomains like `http://welcome.nb.hns.to` did not support HTTPS because wildcard certs only support one level (`https://*.hns.to` was supported but not `https://*.*.hns.to`).
