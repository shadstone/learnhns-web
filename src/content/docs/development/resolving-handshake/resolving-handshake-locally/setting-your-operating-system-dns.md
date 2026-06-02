# Setting your Operating System DNS

## Overview

Regardless of operating system, once you have a Handshake resolver - either by spinning up a Docker instance, or compiling the resolver yourself - you'll need to point your DNS resolver to your local machine.

The address 127.0.0.1 is the standard address for IPv4 loopback traffic. This is the DNS IP we'll be pointing our computer's Wi-Fi network service to.

## OSX

### Using the GUI

You can point your DNS settings to your local machine by navigating to System Preferences > Network > Advanced > DNS, and adding 127.0.0.1 to your DNS provider list. Drag it to the top, and your browser will then utilize the light client running on your local machine to resolve Handshake domains.

### Using the command line

To set your DNS Server from the command line, simply run

```
networksetup -setdnsservers Wi-Fi 127.0.0.1
```

> **Info**
> Once set up, we recommend clearing your DNS servers of potentially previously cached domains to fully test whether the resolver is setup correctly.
> 
> To flush your DNS settings, run:`sudo killall -HUP mDNSResponder`

## Windows 10

To update your DNS settings on Windows 10, follow the instructions below.

1. Open Network and Internet settings in Control Panel.
2. Select Change Adapter Settings.
3. Right click your Network Adapter and select Properties.
4. Select Internet Protocol Version 4 (TCP/IPv4) and then Properties.
5. Toggle Use the following DNS server addresses and type in two DNS addresses (e.g., 127.0.0.1 and 1.1.1.1).
6. Select OK when done.

## Linux

Please refer to the following guide on setting your DNS settings on Linux, only you will point your DNS server to


---

# Agent Instructions: Querying This Documentation

If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://learn.namebase.io/development/resolving-handshake/resolving-handshake-locally/setting-your-operating-system-dns.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
