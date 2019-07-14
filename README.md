# Brian - Core

:construction: [Work in Progress] :construction:

[![wercker status](https://app.wercker.com/status/f1efa13b6eefcdb923fa4762d53e5dae/s/master 'wercker status')](https://app.wercker.com/project/byKey/f1efa13b6eefcdb923fa4762d53e5dae)

## Purpose

(To be Updated)
The main purpose of Brian is to be one and provide easy ways to configure and automate your life assistant.

Create routines, add knowledge or control your spotify and devices while you learn a few new concepts :)

## Pre Requisites

Make sure to have all libraries installed to both mic and speaker.

- [Speaker](https://www.npmjs.com/package/speaker#audio-backend-selection)
- [node-record-lpcm16](https://github.com/rhclayto/node-record-lpcm16#dependencies)

**NOTE:** If your are on a Debian/Ubuntu System (as a rasp) be sure to have the alsa.h header file in place:

```sh
$ sudo apt-get install libasound2-dev
```

## Tech stack:

- node-nlp
- AWS Polly
- RethinkDB
- Wit.ai
- BrainJS
- Synaptic
- Snowboy
- mapquest
- hoopa-looger
- rethinkly
- weather-js
- rabbitmq

## Features breakdown

- [x] Spotify Controller, playlist suggestion, volume controller
- [x] Pre scheduled Routines (Start day, birthdays etc)
- [x] Accept voice commands and a give a conversational answer
- [x] Hot keywork (Hey, Brian!)
- [x] Knowledge growth (Create a internal database to store his knowledge development)
- [ ] Fluently speak with context
- [ ] Handle ordinary tasks (schedule events, turn on/off electrical devices)
- [ ] Audio Sample Analyzing (Voice recognition)
- [ ] Face Recognition
- [ ] Social network database
- [ ] Smart home control

## How Brian works?

Brian is a polite, friendly and nice personal life helper, written in Node JS consuming a few apis to charge his powers, having Jarvis as his uncle it's easy to be awesome.

Brian was divided into two major parts (his Brain(core) and the [Synapse API](https://github.com/brian-ai/synapse)) to make the running environment more flexible, but both of them should work separatedly without problems. The idea is to run a server (core) into a more capable device (as A PI 3B+ or a unix machine) and widgets installed to receive outputs (as anothers PI's zeros for example running the voice recognition system and working with synapse to interact with the core).

Brian was designed to be a personal assistant with a goal. Give to your life a little more of organization
productivity and facility, with privacy, and no forget about the fun.

## Architectural Scheme

NOTE: It's possible to run brian for almost any device running Node JS with audio in and output, tested on MacOSX, Ubuntu, Mint and Raspbian.

# Integrations

As mentioned Brian is connected to a few services to charge his powers, they are described below:

- [MapQuest](https://www.mapquest.com/) to routes and traffic information
- Spotify for music control and home ambientantion
- WIT.ai for Speech recognition
- AWS Polly for Voice synthetizing

# Instalation

1. Clone and install dependencies
   ```sh
   $ git clone git@github.com:brian-ai/core.git
   $ cd core && yarn
   ```
2. Copy the sample env file to configure services
   ```sh
   $ cp .sample-env .env
   ```
3. Add all API keys and secrets to the env file

4. Run the execution command:
   ```sh
   $ yarn call:brian
   ```
