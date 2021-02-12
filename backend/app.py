from flask import Flask, request
from flask_restful import Resource, Api, abort
from flask_cors import CORS
from flask_mysqldb import MySQL
import yaml

app = Flask(__name__)

CORS(app)

app.config['SECRET_KEY'] = 'disable the web security'
app.config['CORS_HEADERS'] = 'Content-Type'

db = yaml.load(open("db.yaml")) 

app.config['MYSQL_HOST'] = db['mysql_host']
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']

mysql = MySQL(app)

api = Api(app)

def input_handler(input_json):
    name = input_json["name"]
    url = input_json["url"]
    caption =  input_json["caption"]
    cur = mysql.connection.cursor()
    cur.execute('''INSERT INTO data(name, url, caption) VALUES("{}", "{}", "{}")'''.format(name, url, caption)) 
    cur.execute('''select last_insert_id()''')
    id = cur.fetchall()
    mysql.connection.commit()
    return {"id": id[0][0]}
    

class Meme(Resource):
    def post(self):
        input_json = request.get_json(force=True)
        output_json = input_handler(input_json)
        return output_json 

    def get(self):
        cur = mysql.connection.cursor()
        cur.execute('''SELECT * FROM ( SELECT * FROM data ORDER BY id DESC LIMIT 100 ) sub ORDER BY id ASC''')
        memes = cur.fetchall()
        memes_list = []
        for meme in memes:
            meme_dict = {}
            meme_dict['id'] = meme[0]
            meme_dict['name'] = meme[1]
            meme_dict['url'] = meme[2]
            meme_dict['caption'] = meme[3]
            memes_list.append(meme_dict)
        # print(res)
        # print(res[-1][0])
        return memes_list

class Meme1(Resource):
    def get(self, meme_id):
        cur = mysql.connection.cursor()
        cur.execute('''SELECT * FROM data WHERE id = {}'''.format(meme_id))
        meme = cur.fetchall()
        if meme:
            meme_dict = {}
            meme_dict['id'] = meme[0][0]
            meme_dict['name'] = meme[0][1]
            meme_dict['url'] = meme[0][2]
            meme_dict['caption'] = meme[0][3]
            return meme_dict
        else:
            abort(404, message="Page not found")

api.add_resource(Meme, '/memes')

api.add_resource(Meme1, '/memes/<int:meme_id>')

if __name__ == '__main__':
    app.run(threaded=True)