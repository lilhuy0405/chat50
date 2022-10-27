from flask import Blueprint, render_template, request, flash, redirect, url_for, abort
from flask_login import login_required, current_user
from . import db

views = Blueprint('views', __name__)


@views.route('/')
@login_required
def home():
    return render_template('home.html', user=current_user)


@views.route('/users/update/avatar', methods=['POST'])
@login_required
def update_user():
    data = request.json
    current_user.avatar = data['avatarUrl']
    db.session.commit()
    return {'status': 'success'}
