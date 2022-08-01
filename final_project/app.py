from flask import Flask, render_template, request
import pandas as pd
from sklearn.linear_model import LinearRegression
import os
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn import preprocessing
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import pickle
import numpy as np


app = Flask(__name__)
app = Flask(__name__, static_folder="templates")
app.config['CORS_HEADERS'] = 'Content-Type'
filename = 'finalized_model.sav'
filename_minmax ='min_max_scalar.sav'


def calculate_outcomes(day, venue, xg, xga, team, opponent):
    ## Column number is 2 for xg and 3 for xga
    df_mew = pd.DataFrame(columns=['day','venue','team','opponent'])
    df_mew.loc[0] = [day, venue, team, opponent]


    print(df_mew)

    file = open("dict_all.obj",'rb')
    dict_all_loaded = pickle.load(file)
    file.close()

    for col in df_mew.columns:
        df_mew.replace(dict_all_loaded[col], inplace=True)
    
    df_mew.insert(loc=2, column='xg', value=[xg])
    df_mew.insert(loc=3, column='xga', value=[xga])
    
    X=df_mew

    #     load.model(filename_ml, read)
    finalized_model = pickle.load(open(filename, 'rb'))
    #finalized_model = load.model(filename, read)
    y=finalized_model.predict(X)
    
    return y[0]


@app.route("/", methods=['GET', 'POST'])
def streambyte():
    # your file processing code is here...
    if request.method=='POST':
        day = request.form['day']
        venue = request.form['venue']
        xg = request.form['xg']
        if xg == '':
            xg = 0.1
        xg = float(xg)

        xga = request.form['xga']
        if xga == '':
            xga = 0.1
        xga = float(xga)
        team = request.form['team']
        opponent = request.form['opponent']
        

        result = calculate_outcomes(day, venue, xg, xga, team, opponent)

        if result==0:
            result = 'Draw'
        elif result==1:
            result = 'Loss'
        else:
            result = 'Win'

        return result
    
    else:
        return render_template('index.html')


if __name__ == '__main__':
   app.run(debug = True)