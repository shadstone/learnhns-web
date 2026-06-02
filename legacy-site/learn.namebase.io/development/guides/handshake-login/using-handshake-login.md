# Using Handshake Login

## Set up the TXT record manually

Open the identity manager:[ https://id.namebase.io](https://id.namebase.io)

Create a new identity by entering a name you own. Click on "Copy my record".

This will copy the key fingerprint in your clipboard.

Set a new TXT record on subdomain domain {prefix}**\_auth** with a short TTL:

```
v=0;fingerprint=<hash>
```

The prefix is generated with a hash function SHA-256 of the concatenated targeted name and the randomly generated deviceId:

```
const prefix = hash(name + deviceId, 'SHA-256');
```

TLD or subdomain records will look like this:

| Domain   | Type | Host                      | Value                   | TTL |
| -------- | ---- | ------------------------- | ----------------------- | --- |
| TLD      | TXT  | {prefix}.\_auth           | v=0;fingerprint=\<hash> | 60  |
| Sudomain | TXT  | {prefix}.\_auth.subdomain | v=0;fingerprint=\<hash> | 60  |

## Set up a custom identity manager

You have the possibility to configure your own application to carry your identity. In order to configure your name to point to your custom identity manager, you will need to add a TXT record on the subdomain \_idmanager of your name.

#### \_idmanager.\<handshake>

```
v=0;url=<https://your application>
```


---

# Agent Instructions: Querying This Documentation

If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://learn.namebase.io/development/guides/handshake-login/using-handshake-login.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
