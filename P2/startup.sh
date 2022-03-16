#!/bin/bash
# Set up the virtual environment
python3 -m pip install virtualenv
virtualenv -p which python3 venv

# Activate
source venv/bin/activate
# Install requirements
python3 -m pip install -r requirements.txt

# Run all migrations
python3 manage.py makemigrations
python3 manage.py migrate
