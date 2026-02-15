# Local-Share

**Local-Share** is a lightweight LAN file transfer service built on a
client--server architecture.\
It enables devices within the same local network to upload and download
files through a centralized file service node, without sending data over
the internet.

## Overview

Local-Share is designed for trusted local environments such as homes,
labs, or small offices where fast and controlled file transfer is
required.

The system operates entirely inside a local network (LAN).\
All data transfers occur directly between clients and the internal
server.

## Architecture

    Client  --->  
                  \
                   -->  Local-Share Server  --> File Storage
                  /
    Client  --->

-   A single server node acts as the file service.
-   Clients connect to the server over the local network.
-   The server manages file storage, access control, and transfer
    sessions.
-   No external cloud or internet connection is required.

## Key Features

-   Centralized file transfer within LAN
-   Controlled upload/download permissions
-   Internet-independent operation
-   Suitable for wired or wireless local networks
-   Designed for reliability and simplicity

## Design Goals

-   Explore network programming concepts
-   Implement reliable file transfer mechanisms
-   Understand client--server communication models
-   Build a minimal but structured LAN service

## Screenshot

![Local-Share
Screenshot](https://raw.githubusercontent.com/Roseedee/Local-Share/main/image/Screenshot%202026-02-15%20223932.png)
