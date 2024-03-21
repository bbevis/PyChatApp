from flask import Flask, request, render_template, redirect, url_for, session, flash
from flask_socketio import SocketIO, join_room, leave_room, send, emit
import random
import string
from testExternalCall import testFunc

app = Flask(__name__)
app.config["SECRET_KEY"] = "supersecretkey"
socketio = SocketIO(app)

# A mock database to persist data
rooms = {}


def generate_room_code(length: int, existing_codes: list[str]) -> str:
    while True:
        code_chars = [random.choice(string.ascii_letters) for _ in range(length)]
        code = ''.join(code_chars)
        if code not in existing_codes:
            return code

@app.route('/', methods=["GET", "POST"])
def home():
    session.clear()
    
    if request.method == "POST":
        name = request.form.get('name')

        create = request.form.get('create', False)
        code = request.form.get('code')
        join = request.form.get('join', False)
        if not name:
            return render_template('home.html', error="Name is required", code=code)
        if create != False:
            room_code = generate_room_code(6, list(rooms.keys())) # keys should be generated independently and ensures that all keys are unique
            new_room = {
                'members': 0,
                'messages': []
            }
            rooms[room_code] = new_room

        if join != False:
            # e.g. for 2nd participants, the room aleady exists.
            if not code:
                return render_template('home.html', error="Please enter a room code to enter a chat room", name=name)
            # invalid code
            if code not in rooms:
                return render_template('home.html', error="Room code invalid", name=name)
            room_code = code
        session['room'] = room_code
        session['name'] = name
        return redirect(url_for('room'))
    else:
        return render_template('home.html')
    
@app.route('/room')
def room():
    room = session.get('room')
    name = session.get('name')
    if name is None or room is None or room not in rooms:
        return redirect(url_for('home'))
    messages = rooms[room]['messages']
    return render_template('room.html', room=room, user=name, messages=messages)

@socketio.on('connect')
def handle_connect():
    name = session.get('name')
    room = session.get('room')
    if name is None or room is None:
        return
    if room not in rooms:
        leave_room(room)
    join_room(room)
    send({
        "sender": "",
        "message": f"{name} has entered the chat"
    }, to=room)
    rooms[room]["members"] += 1

# todo: probably create a new socketio event (candidate message?) and
# @socketio.on('candidateMessage')
# def handle_candidate_message(payload):
#     room = session.get('room')
#     name = session.get('name')
# etc.
    # message = {
    #     "sender": name,
    #     "message": gpt response
    # }
# emit('modalMessage', message, to=room)
    # Todo: send new data to database


@socketio.on('message')
def handle_message(payload):
    
    testFuncReturn = testFunc()

    room = session.get('room')
    name = session.get('name')
    if room not in rooms:
        return
    message = {
        "sender": name,
        "message": payload["message"]
    }
    send(message, to=room)
    # Todo: send new data to database
    rooms[room]["messages"].append(message)

    modalMessage = {
        "mainText": "what do you want to display in the modal?",
        "suggestedRevision": "I am now polite"
    }
    emit('modalMessage', modalMessage, to=room)
    

    
@socketio.on('disconnect')
def handle_disconnect():
    room = session.get("room")
    name = session.get("name")
    leave_room(room)
    if room in rooms:
        rooms[room]["members"] -= 1
        if rooms[room]["members"] <= 0:
            del rooms[room]
        send({
        "message": f"{name} has left the chat",
        "sender": ""
    }, to=room)

if __name__ == "__main__":
    socketio.run(app, debug=True)
