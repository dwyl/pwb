# pwb

pwb (proxy web browser) is a lightweight node.js app to proxy a website.

## Why?

While testing our web application(s) we ~~are~~ were unable to
run [***arbitrary code***](http://en.wikipedia.org/wiki/Arbitrary_code_execution)
to execute tests against the "target" web page.  
This is a ***security feature*** called [***same-origin policy***](http://en.wikipedia.org/wiki/Same-origin_policy) of *all* browsers and in 99.99% of cases we *want* our browsers to ***protect*** us from ***bad people*** who want to make our browsers do harmful things! While testing, *however*, we ***want*** to be able to run ["***penetration tests***"](http://en.wikipedia.org/wiki/Penetration_test) to
get some insight into how our project(s) would handle being attacked!


## What?

If you are new to the concept of a proxy:

> In computer networks, a proxy server is a server (a computer system or an
> application) that acts as an intermediary for requests from clients seeking
> resources from other servers. A client connects to the proxy server,
> requesting some service, such as a file, connection, web page, or other
> resource available from a different server and the proxy server evaluates
> the request as a way to simplify and control its complexity.  
> ~ http://en.wikipedia.org/wiki/Proxy_server

If proxies still confuse you, watch "***What is a Proxy Server?***": https://www.youtube.com/watch?v=qU0PVSJCKcs


## How? > MVP


## Notes

### NOT a General Purpose Proxy

This project is ***not*** intended to be a "**full featured**" proxy server
anyone can use for *any* purpose. We are building this for use in our
[***alvo***](https://github.com/dwyl/alvo) project (to allow us to load
pages and scripts from different domains for ***testing purposes***!)
and decided to split the functionality out
into a separate module *in case* anyone else had a similar requirement.

### Security

#### Clarity/Simplicity

***Clear/Simple code*** is ***always*** a ***requirement*** in crafting any
code, more so in an application that hopes to *avoid* security issues.
Despite the availability of We have have built this using "***only core node.js modules***"
so its easy for *anyone* (*with basic node experience*) to read our code.


## Research

### General Background Reading

+ Proxy Server wiki article: http://en.wikipedia.org/wiki/Proxy_server
+ Cross-origin resource sharing (CORS): http://en.wikipedia.org/wiki/Cross-origin_resource_sharing
+ Content Security Policy (CSP):
http://en.wikipedia.org/wiki/Content_Security_Policy
+ Using a proxy server for privacy and security:
http://www.techrepublic.com/blog/it-security/the-basics-of-using-a-proxy-server-for-privacy-and-security/
