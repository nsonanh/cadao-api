# danhngon-api
[![Documentation Status](https://readthedocs.org/projects/cadao-api/badge/?version=latest)](http://cadao-api.readthedocs.io/en/latest/?badge=latest)

[![Documentation Status](https://circleci.com/gh/:owner/:repo.png?circle-token=:circle-token)](http://cadao-api.readthedocs.io/en/latest/?badge=latest)

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
