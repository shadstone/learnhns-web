# Decentralized login

Use the Authentication Protocol spec to get a high level overview of the proposed system design behind Handshake login.

If you're looking to see how we implemented login with Handshake on services like [Namer News](https://news.namebase.io), or you're looking to create an OIDC provider yourself for an application you're building, use the Implementation Guide.

{% content-ref url="/pages/LyYXzQLYv5SUsucMnwBy" %}
[Handshake-based OIDC Authentication Protocol](/development/guides/handshake-login/handshake-based-oidc-authentication-protocol.md)
{% endcontent-ref %}

{% content-ref url="/pages/OW13YbOqu4xyXpZMpj3F" %}
[Handshake Login Implementation Guide](/development/guides/handshake-login/oidc.md)
{% endcontent-ref %}


---

# Agent Instructions: Querying This Documentation

If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://learn.namebase.io/development/guides/handshake-login.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
