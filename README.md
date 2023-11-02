# Boralabs - TBA Project

## Introduction

BORAlabs - TBA Project is an Token Bound Account Standard project. We present a groundbreaking NFT market that
transcends traditional NFT trading by incorporating the ERC-1155 Multi Token Standard. This project introduces a
transformative feature, enabling the transfer of entire wallet (account) ownership through NFT trades. At its core, this
project introduces ERC-6551, Token Bound Accounts (TBA) Standard that are tightly connected to NFTs, allowing the
seamless transfer of all assets within an account during TBA trades. Join us as we explore these concepts, their
real-world applications, and reshape the landscape of blockchain asset ownership and management.

## Table of Contents

### 0. [Prerequisite](#prerequisite)

### 1. [Quick Start](#quick-start)

### 2. [Features](#features)

### 3. [Examples](#examples)

### 4. [Licenses](#licenses)

### 5. [References & Docs](#references---docs)

---

## Prerequisite

### System Requirement

- 🐳 **Docker Desktop** (latest with docker-compose)
- 🥮 **Ganache GUI** [download](https://trufflesuite.com/ganache/)
- 🟩 **Node v18.17** (latest)
- 🐱 **Yarn v1.22.19**
- 🌐 **Chrome Web Browser / with Metamask Extension** 🦊
- **WSL 2** (for windows only)
---

## Quick Start

### Visit our 👉 [live demo]()

### Local Environment Setup

**Step 1. Install required packages via Yarn**</br>
```shell
cd <project_root_dir>

```

**Step 2. Open Ganache GUI** </br>
- Open Ganache > Click Quick start
- Get the Private Key for the first account
- Import your private to Metamask


**Step 3. Deploy Contracts** </br>
```shell
cd <project_root_dir>/storage
hardhat compile
hardhat run --network ganache scripts/deploy.ts
```

**step 4. Build & Run Application**
```shell
cd <project_root_dir>
docker-compose up -d
```
- open http://localhost:8080 on Chrome
- Login with Metamask

---
## Features

---

## Examples

---

## Licenses

---

## References & Docs

