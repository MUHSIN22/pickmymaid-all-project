SHELL := /bin/bash
ENV_FILE := .env
export $(shell sed 's/=.*//' $(ENV_FILE))

DC := docker compose

.PHONY: help dev prod up down self-signed cert-issue cert-concat

help:
	@echo "make dev          -> start dev stack (docker-compose.dev.yml)"
	@echo "make prod         -> start prod stack (docker-compose.prod.yml) (generate haproxy config first)"
	@echo "make up PROFILE=dev/prod"
	@echo "make self-signed  -> create self-signed certs for dev (placed in haproxy/certs)"
	@echo "make cert-issue   -> issue LetsEncrypt certs for production (requires certbot-web running)"
	@echo ""

dev:
	docker compose -f docker-compose.dev.yml up --build
