# Using Handshake Login

> **Warning**
> **Offline (June 2026):** The Namebase identity manager at id.namebase.io is no longer available. Use the [handshake-id-manager](https://github.com/namebasehq/handshake-id-manager) repo to run your own identity manager, or set TXT records manually as described below.

## Set up the TXT record manually

The former Namebase identity manager (`id.namebase.io`) is offline. Configure records in [Bob Wallet](https://bobwallet.org/download/bob-learnhns) or your preferred DNS tool instead.

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
