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


## Sing-box

[Sing-box](https://github.com/sagernet/sing-box) is a well-known platform for running different kinds of proxies.
VLESS, VMESS, Hysteria, you name it. It allows you to extensively customize how you handle incoming (inbounds) data
and how that data goes out (outbounds) via specified rules. Extensive documentation of sing-box is available [here](https://sing-box.sagernet.org/configuration/).

Another alternative, which is a also probably way more mature is [xray-core](https://github.com/xtls/xray-core). The provided documentation
is also way more complete, but I'm just going to explain this for sing-box since I'm more used to it. The gist
of the method should be the same though, and you can most likely apply the same idea for xray as well.


> [!Note]
> After writing this, I have noticed that this method, which is done with sing-box is actually way more hassle-free
> compared to the xray method. The xray method still requires playing around with route tables to make it properly work.

> [!WARNING]
> This guide assumes that you already have a stable proxy that you have already configured. e.g. a VLESS/VMESS/Hytseria/... proxy.

## What made this happen

Back then, this whole dilemma of routing data through a port was done by configuring firewall-related tools like
`iptables` and `tun2socks`. This whole hassle of configuring these tools and scenarios was quite bothersome. Especially if you didn't
have much idea of what was happening behind the scenes.

Overtime cores like sing-box and xray became more mature, and they have added a way of receiving data through virtual
network interfaces. Now, all you have to do is to route your data through route tables to these interfaces and then 
the cores would handle the rest without headache.

## The setup 

One of my main goals for this setup was to make sure that it was isolated from my home server. I did not want this to
affect my home server by any means. So, an idea was to containerize it and thankfully, docker gave me the ability to run
a docker container with an IP address of its own which my devices could send their data to. 

Here is the `docker-compose.yml` file that I have written for my setup:

```yml
networks:
  transparent_lan:
    driver: macvlan
    driver_opts:
      parent: br0 (Your home server's interface name, find it from ip a)
    ipam:
      config:
        - subnet: YOUR HOME NETWORK SUBNET (e.g 192.168.2.0/24)
          gateway: YOUR HOME NETWORK GATEWAY (e.g. 192.168.2.1)

services:
  transparent-gateway:
    image: ghcr.io/sagernet/sing-box:latest-testing
    container_name: transparent-gateway
    command: run -c /etc/sing-box/config.json
    networks:
      transparent_lan:
        ipv4_address: THE IP YOU WANT FOR THE CONTAINER TO HAVE (e.g 192.168.2.10)
    cap_add:
      - CAP_NET_ADMIN
    devices:
      - /dev/net/tun
    volumes:
      - ./config.json:/etc/sing-box/config.json
    restart: unless-stopped
```


Make sure to change the values of the variables I have set as above. If everything goes according to the plan,
you will just have to point your local network's device gateways to the `ipv4_address` that you set for your container.

Pay attention that since I needed a feature that was available on the latest git pre-release, I set the docker image tag to
`latest-testing`.

### The configuration

Now, you will need to also feed a `config.json` to the sing-box container. For this matter, I recommend that you first import
your configuration to [throne](https://github.com/throneproj/Throne) and export your configration json from this application by right-clicking
on your proxy and `Share -> Export Sing-box config -> Copy core config`. This will copy a json to your configuration that
you should be able to run in the sing-box core itself no problem.

After getting this configuration in a file (`config.json`). You will just have to add a `tun` inbound to the `inbounds` section of it:

```json
  "inbounds": [
    // Other inbounds ...
    {
      "type": "tun",
      "tag": "tun-in",
      "interface_name": "tun0",
      "address": "172.19.0.1/30",
      "strict_route": true,
      "auto_route": true,
      "auto_redirect": true
    }
  ],
```

You can tag and name it however you like but just adding this to the `inboudns` array should just work fine.

Here is why
sing-box is way more hassle-free compared to xray:
> Sing-box handles the routing table itself by using the `strict_route`, `auto_route`, `auto_redirect` flags. So you don't
> have to tinker with the iptables or nftables

Or maybe... not? This just worked for me magically right out of the box. I did not need to really play around with it that much.

## Using it on devices 

Now after running the docker container and hopefully without errors, you should be able to set any of your network
device's gateway to the IP of this docker container, and the docker container should handle any traffic going into it no problem.

Another fun thing that you might want to do so that you wouldn't go through setting this in every single device would be to change
your router's DHCP settings to automatically hand out your container's IP address as gateway to any device that connects to it.
