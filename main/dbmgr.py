import mariadb

conn = pymysql.connect(
    'host': '127.0.0.1',
    'port': 5000,
    'user': 'root',
    'password': 'Password123!',
    'database': 'demo'
)

cur = conn.cursor()

def getDoc(username):
    sqli = "select * from flaskdata where name='%s'" %(username)
    res = cur.execute(sqli)
    if res == 0:
        return False
    else:
        return True