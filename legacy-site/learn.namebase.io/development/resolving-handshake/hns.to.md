# HNS.to

[HNS.to](https://hns.to) is a simple gateway that lets anyone visit Handshake websites without downloading special software or changing their computer settings. It's useful for sharing Handshake websites publicly with people who haven't used Handshake before. Note that anyone can create their own gateway and use that instead of using HNS.to.

There are three ways to use HNS.to to visit a Handshake website

1. Go to [HNS.to](https://hns.to) and type in a Handshake domain in the search bar
2. Visit hns.to/{handshake\_domain} in your browser
3. Visit {handshake\_domain}.hns.to in your browser

Try visiting welcome.nb/ using each of the three methods above to test out HNS.to!

## HTTPS

You can resolve a root Handshake domain using HTTPS with HNS.to like [https:/nb.hns.to](https://nb.hns.to). Note that HNS.to is (currently) just a HTTP proxy so this will only secure the connection between your browser and HNS.to's servers — it does not secure the connection between HNS.to and the Handshake domain.

Subdomains like <http://welcome.nb.hns.to> do not support HTTPS because Wildcard Certs only support one level (https\://\*.hns.to is supported but not https\://\*.\*.hns.to).


---

# Agent Instructions: Querying This Documentation

If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://learn.namebase.io/development/resolving-handshake/hns.to.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
