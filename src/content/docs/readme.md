# Introduction

You'll find resources dedicated to Handshake and Namebase here. Feel free to use, copy, and share the information as you please!

<iframe width="100%" height="400" src="https://www.youtube.com/embed/8I82AFjVJfE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Handshake



As part of the decentralized web movement, our community is taking the Internet back from the handful of corporations who currently own it and placing it into the hands of the people by dismantling ICANN's monopoly on top-level domains (.com, .org, .io are all top-level domains controlled by ICANN).&#x20;

When you attempt to visit a website like <https://namebase.io>, your browser will first need to figure out how to get to .io's servers.&#x20;

To find .io, your browser will consult something called the root zone file. You can think of this file like a spreadsheet where:

* Column A are the TLDs, .com, .net, .org, .io
* Column B are the servers each TLD points to

Controlling the spreadsheet is a single entity called ICANN. They alone dictate whether you’re allowed to have a top-level domain. So if you want to add a row on the spreadsheet for [.yourname](https://namebase.io/domains), you'd need to submit an application and pay a fee for ICANN to review your request.

What this means is the entire domain name system that everyone uses around the world is effectively controlled at its core by a single organization, ICANN. Handshake changes this by moving the spreadsheet onto a decentralized blockchain that nobody controls, so now anyone can get a top-level domain.

Handshake decentralizes the Internet by shifting control of the root zone file away from ICANN and onto a decentralized blockchain.

[About Handshake](/docs/about-handshake/about-handshake)

### HNS <a href="#hns" id="hns"></a>



[HNS](/docs/about-handshake/handshake-coin) refers to the [Handshake coin](/docs/about-handshake/handshake-coin), which is the digital currency of the Handshake blockchain. HNS is used to bid in [Handshake name auctions](/docs/about-handshake/handshake-auction) and the winning bids are burned from the blockchain (the winning bids do not get paid to *anybody),* which has a deflationary effect on the coin's price. HNS is also used to pay transaction fees to the miners, who add bidding, renewal, and other transactions to the Handshake blockchain.‌

[HNS coin economics](/docs/about-handshake/handshake-coin)

## Namebase <a href="#namebase" id="namebase"></a>



[Namebase](/docs/about-namebase/vision-and-mission) is an onramp for Handshake. We did *not* create Handshake, but just like you, we are Directors of Handshake. Our goal is to make Handshake easy-to-use to enable mass adoption, and you can use our platform to easily [buy](/docs/starting-from-zero/buy-hns) and sell HNS as well as [bid on](/docs/starting-from-zero/how-to-get-a-name), purchase, [sell](/docs/starting-from-zero/how-to-use-handshake-names#sell-your-name), and [use](/docs/starting-from-zero/how-to-use-handshake-names) Handshake names.

## Getting started

To get started on Handshake, you just need to buy some Handshake coins, use your Handshake coins to get a name, and begin using your new Handshake name.

1. [Buy Handshake coins](/docs/starting-from-zero/buy-hns)
2. [Get a Handshake name](/docs/starting-from-zero/how-to-get-a-name)
3. [Use your Handshake name](/docs/starting-from-zero/how-to-use-handshake-names)


---

# Agent Instructions: Querying This Documentation

If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://learn.namebase.io/readme.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
