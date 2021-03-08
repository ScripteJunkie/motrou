import json

from flask import Flask, render_template, send_file
app = Flask(__name__)
app.config["DEBUG"] = True


@app.route('/')
def main():
    return render_template('index.html')

@app.route('/ascii.json', methods = ['GET'])
def ascii():
    return send_file('./static/content/ascii.json', as_attachment=True)

@app.errorhandler(404)
def not_found(e):
    return render_template('error.html')

if __name__ == '__main__':
   app.run()