# Table of Contents

- [简介](#introduction)
- [安装](#installation)
- [快速开始](#quick-start)
- [命令行](#shell-access)

# Introduction

Dockerfile to build a jd-backend container image.
Run a container based on this image.

#installation

```bash
docker build -t jd-frontend .
```

# Quick Start

Run the jd-backend image
```bash
docker run -it --rm --name jd-frontend -p 80:3002 jd-frontend
```

# Shell Access

```bash
docker exec -it jd-frontend bash
```

