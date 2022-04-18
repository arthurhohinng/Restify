#!/bin/bash
cd restify-ui
npm start & python3 ../restify-backend/manage.py runserver

# DEFAULT USER WHO IS AN OWNER: testowner
# PASSWORDS FOR ALL USERS: password
# ADMIN USER AND PASSWORD: admin, admin