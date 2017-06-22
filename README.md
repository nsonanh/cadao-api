# danhngon-api
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0) [![CircleCI](https://circleci.com/gh/nsonanh/danhngon-api/tree/master.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/nsonanh/danhngon-api/tree/master)

## API Documentation
### [danhngon-api documentation](https://nsonanh.github.io/danhngon-api/public/apidoc/index.html)

## Brain storm:
### Basic visual:
![Danhngon brainstorm](./doc-img/danhngon.jpg?raw=true "Basic brainstorm of danhngon")

### Architecture:
- REST single service (NodeJS, ExpressJS, MongoDB)
- Backend app to manipulate data (pagination + filter must have)
- JS lib to utilize with ajax (with end-user site)
### Specification:
- One quote, many languages (browser language & google translate)
- Support latin & latin quotes
- quote <-> author <-> category <-> original language
### Dev Ops
- Cloud deployment
- Structure :
    - danhngon-api <-> danhngon-admin
    - danhngon-api -> danhngon-js
    - danhngon-js -> danhngon.global
### DOC:
- design diagrams
- apidoc
- js doc
### Research:
- Elasticsearch
- mongodb indexing
- Restify framework
- npm deployment
- Data contribution
- Avoid redundancy/duplication of quotes