#!/bin/bash
cd restify-ui
npm start & python3 ../restify-backend/manage.py runserver

# USER WHO IS AN OWNER: testowner
# USER WHO IS NOT AN OWNER: testuser
# PASSWORDS FOR ALL USERS: password
# ADMIN USER AND PASSWORD: admin, admin