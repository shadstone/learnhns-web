# Resolving Handshake

This guide walks through how to visit Handshake websites using HNS.to, browsers, public Handshake DNS resolvers, and local resolvers. Each method may be more or less useful to you depending on the situation.

## HNS.to

HNS.to is a simple gateway that doesn't require local software or configuration. It's useful for sharing Handshake websites publicly.

{% content-ref url="/pages/MUK0HmGdkOBwwRA5UkeR" %}
[HNS.to](/development/resolving-handshake/hns.to.md)
{% endcontent-ref %}

## Browsers

[Puma Browser](https://www.pumabrowser.com/) is a mobile browse that supports Handshake websites. Join the [community](https://community.namebase.io) to stay up-to-date on efforts to get other browsers to support Handshake as well.

## Public Handshake DNS Resolvers

### HNSDoH

[HNSDoH](https://welcome.hnsdoh.com/) is a public DNS resolver that supports Handshake domains.

{% content-ref url="/pages/H0RCmmGCZrYXQM9h2RMU" %}
[HNSDoH](/development/resolving-handshake/hnsdoh.md)
{% endcontent-ref %}

## Local Resolution

You can run a Handshake resolver locally using the Handshake fullnode or SPV client without relying on any third party providers. This is the most trustless way to resolve Handshake.

{% content-ref url="/pages/CDtb6CLWuAZmv4CrqXbJ" %}
[Resolving Handshake locally](/development/resolving-handshake/resolving-handshake-locally.md)
{% endcontent-ref %}


---

# Agent Instructions: Querying This Documentation

If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://learn.namebase.io/development/resolving-handshake.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
