from flask import Flask, send_file, jsonify
import json

app = Flask(__name__, static_url_path='')

@app.route("/")
def load_page():
    return send_file('page.html')

@app.route("/map_points")
def get_map_points():
    print('poop')
    with open("../../data/exdata.json") as f:
        data = json.load(f)

    return jsonify(data)