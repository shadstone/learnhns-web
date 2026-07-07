# Traditional website

With Handshake, you can use both your root name (i.e. [nb/](https://nb.hns.to)) and a subdomain (i.e. [welcome.nb/](http://welcome.nb.hns.to)) as the domain for your traditional websites.

Conceptually all you have to do is set resource records like A records and CNAME records just like you would with a traditional domain. However, root resource records are [limited](https://hsd-dev.org/guides/resource-records.html), so you need to set an NS record on your root name pointing to a nameserver in order to set A and CNAME records.

With [Bob Wallet](https://bobwallet.org/download/bob-learnhns) or self-custody, you set NS and glue records yourself — see [how to add DNS records](/docs/starting-from-zero/how-to-add-dns-records).



You can also follow this guide to use your own nameserver: [Setting up a Handshake TLD with a hosted DNS service](https://dev.to/rithvikvibhu/setting-up-a-handshake-tld-with-a-hosted-dns-service-2g6c)

Once you've set up your Handshake website, follow this guide to learn how to resolve them on any of your devices.

[Resolving Handshake](/docs/development/resolving-handshake)

## Hosting providers

Many hosting providers such as Vercel, Heroku, and GitHub Pages work with Handshake names. Community members have documented how to use many of them in our general [Learning Center](/docs/starting-from-zero/how-to-create-a-handshake-website).

If a hosting provider doesn't support Handshake, it's most likely because they have a verification step for custom domains that checks if the custom domain is a valid ICANN domain. In that case, we recommend writing to the hosting provider to relax their verification so that Handshake domains work as well. This is what was done in the case of Vercel.

## HTTPS

One of Handshake's primary goals is to replace CAs with a more secure blockchain-based root of trust. See [About Handshake](/docs/about-handshake/about-handshake#a-more-secure-internet) for an overview, and community members have documented how to set up HTTPS websites in our [Create Handshake websites](/docs/starting-from-zero/how-to-create-a-handshake-website) guide.

Note that end-user configuration is necessary to visit Handshake HTTPS sites until browsers support it natively. The [SkyInclude Browser](https://skyinclude.com/browser) and [HNSDoH](https://welcome.hnsdoh.com/) resolver make this easier today. Join the [Handshake Telegram community](https://t.me/handshake_hns) if you want to help improve tooling.
