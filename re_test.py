#-*- coding=utf-8 -*-
from flask import Flask, render_template, request, jsonify
import re
import requests

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/regex_ajax', methods=["POST"])
def regex_check():
    url = request.form.get('url')
    regex = request.form.get('regex')
    data = {}
    try:
        cont = requests.get(url, timeout=5).content
    except Exception, e:
        data['code'] = 1
        data['data'] = [{'result': str(e)}]
    try:
        result = re.findall(regex, cont)
        if len(result) > 0:
            data['code'] = 0
            for res in result:
                res = ' | '.join(res) if len(res) > 1 else res
                data.setdefault('data', []).append({'result': res})
        else:
            data['code'] = 1
            data['data'] = [{'result': 'find nothing'}]
    except Exception, e:
        data['code'] = 1
        data['data'] = [{'result': str(e)}]
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
