const config = require('express').Router();
const express = require("express");

const bodyParser = require('body-parser')
config.use(bodyParser.json());

require("dotenv").config();

const path = require('path');

const dir = path.join(__dirname, 'public');
config.use(express.static(dir));

express().set('view engine', 'ejs');
express().set('views', path.join(__dirname, 'views'));


module.exports = config;
