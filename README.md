# danhngon-api
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0) [![CircleCI](https://circleci.com/gh/nsonanh/danhngon-api/tree/master.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/nsonanh/danhngon-api/tree/master)

API Documentation
 - https://nsonanh.github.io/danhngon-api/public/apidoc/index.html

Brain storm:

Architecture:
- REST single service (NodeJS, ExpressJS, MongoDB)
- Backend app to manipulate data (pagination + filter must have)
- JS lib to utilize with ajax (with end-user intro site)

Specification:
- One quote, many languages (profile & google translate ?)
- Support latin & latin quotes
- quote <-> author <-> category <-> original language

Dev Ops
- Cloud deployment (AWS ?)
- Structure :
    - danhngon-api <-> danhngon-admin
    - danhngon-api -> danhngon-js
    - danhngon-js -> Intro website

DOC:
- design diagrams
- api
- js

Research:
- Restify framework
- Test framework
- CI tool
- npm deployment
- Data contribution
- Avoid redundancy/duplication of quotes
