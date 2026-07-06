---
title: "Routing all of my home network through (transparent) proxy"
pubDatetime: 2026-06-26T22:10:00+03:30
description: "Using sing-box's transparent proxy feature to route home data through proxy"
ShowToc: true
tags: ["sing-box", "Debian", "docker", "routing", "proxy"]
author: "Milad Zarei"
---

## What is it about?

When you have a constrained internet connection where the internet connection is severely limited, you might
want to consider running a transparent proxy (TProxy for short) in your home network. By using this method, any
device that connects to your home network automatically is routed through the proxy you desire, which means they
don't have to go through the hassle of managing VPNs and Proxies on their devices. This leads to less battery usage
on the mobile devices, and a way *freer* experience.

## How is this different from my previous method?

This post is actually in continuation to my old post of [routing home network through proxy using OpenWRT](lanproxyroute/).
This post was written like two years ago and back then I was quite clueless about networking and that approach
included running an OpenWRT VM solely for routing traffic through a proxy.

This approach was nasty. It used a lot of resources, it sometimes didn't function well, and you had to sometimes
play around with the Passwall package, which is not well documented at all.

> [!NOTE]
> Supplementary information the reader should be aware of.

> [!TIP]
> Helpful advice, shortcuts, or best practices.

> [!WARNING]
> Something that could go wrong or have unintended consequences.

> [!DANGER]
> Serious risk of failure, data loss, or incorrect behavior.

> [!INFO]
> Neutral informational context — less urgent than a note.

> [!SUCCESS]
> Confirmation that something worked or is correct.

## Sing-box

[Sing-box](https://github.com/sagernet/sing-box) is a well-known platform for running different kinds of proxies.
VLESS, VMESS, Hysteria, you name it. It allows you to extensively customize how you handle incoming (inbounds) data
and how that data goes out (outbounds) via specified rules. Extensive documentation of sing-box is available [here](https://sing-box.sagernet.org/configuration/).

Another alternative, which is a also probably way more mature is [xray-core](https://github.com/xtls/xray-core). The provided documentation
is also way more complete, but I'm just going to explain this for sing-box since I'm more used to it. The gist
of the method should be the same though, and you can most likely apply the same idea for xray as well.

## What made this happen

Back then, this whole dilemma of routing data through a port was done by configuring firewall-related tools like
`iptables` and `tun2socks`. This whole hassle of configuring these tools and scenarios was quite bothersome. Especially if you didn't
have much idea of what was happening behind the scenes.

Overtime cores like sing-box and xray became more mature, and they have added a way of receiving data through virtual
network interfaces. Now, all you have to do is to route your data through route tables to these interfaces and then 
the cores would handle the rest without headache.

## The setup 

One of my main goals for this setup is 
