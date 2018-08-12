import tornado.web

from sklearn.cross_validation import train_test_split
from sklearn.preprocessing import StandardScaler
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import OneHotEncoder
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import AdaBoostClassifier
from sklearn.svm import SVR
from sklearn.svm import SVC
from sklearn.metrics import confusion_matrix
import statsmodels.api as sm
import matplotlib.pyplot as plt
from sklearn.metrics import r2_score
import json
import csv
import random
import pickle
import keras
from keras.models import Sequential
from keras.layers import Dense


file = 'churn.model'



def train_data_with_keras():
    
    data = pd.read_csv('data/Churn_Modelling.csv')  
    
    data_x = data.iloc[:,3:13].values
    data_y = data.iloc[:,13].values
    
    #Her bir değer için onları sayısal değere çevirir)
    label_encoder = LabelEncoder()
    #Çalıştırıp tekrar içine yazmak için fit_transform kullanılıyor.
    data_x[:, 1] = label_encoder.fit_transform(data_x[:, 1])
    
    label_encoder_2 = LabelEncoder()
    data_x[:, 2] = label_encoder_2.fit_transform(data_x[:, 2])
    
    #labelEncoderla oluşan array'i sadece 1 ve 0 lar cinsinden ifade edebilmek için
    ohe = OneHotEncoder(categorical_features=[1])
    data_x = ohe.fit_transform(data_x).toarray()
    
    #dummy variable konumuna düşmemesi için bir kolonu kaldırdık zaten 2 kolondan anlayabiliyor.
    data_x = data_x[:, 1:]
        
    x_train, x_test, y_train, y_test = train_test_split(
            data_x, data_y, 
            test_size=0.33, random_state=0)
        
    sc = StandardScaler()
    X_train = sc.fit_transform(x_train)
    X_test = sc.transform(x_test)
    
    rfc = RandomForestRegressor(n_estimators = 15,random_state=0)
    rfc.fit(X_train,y_train)
    
    
    classifier = Sequential()
    classifier.add(Dense(
            output_dim = 6, init = 'uniform', 
            activation = 'relu', input_dim = 11))
    classifier.add(Dense(
            output_dim = 6, init = 'uniform', 
            activation = 'relu'))
    classifier.add(Dense(
            output_dim = 1, init = 'uniform',
            activation = 'sigmoid'))
    
    classifier.compile(
            optimizer = 'adam', loss = 'binary_crossentropy', 
            metrics = ['accuracy'])
    
    classifier.fit(X_train, y_train, epochs = 100)
    
    y_pred = classifier.predict(X_test)
    y_pred = (y_pred > 0.5)

    cm = confusion_matrix(y_test,y_pred)
    print(cm)


def train_data():

    data = pd.read_csv('data/Churn_Modelling.csv')  
    
    data_x = data.iloc[:,3:13].values
    data_y = data.iloc[:,-1:].values
    
    #Her bir değer için onları sayısal değere çevirir)
    label_encoder = LabelEncoder()
    #Çalıştırıp tekrar içine yazmak için fit_transform kullanılıyor.
    data_x[:, 1] = label_encoder.fit_transform(data_x[:, 1])
    
    label_encoder_2 = LabelEncoder()
    data_x[:, 2] = label_encoder_2.fit_transform(data_x[:, 2])

    #labelEncoderla oluşan array'i sadece 1 ve 0 lar cinsinden ifade edebilmek için
    ohe = OneHotEncoder(categorical_features=[1])
    data_x = ohe.fit_transform(data_x).toarray()
    
    #dummy variable konumuna düşmemesi için bir kolonu kaldırdık zaten 2 kolondan anlayabiliyor.
    data_x = data_x[:, 1:]
        
    x_train, x_test, y_train, y_test = train_test_split(
            data_x, data_y, 
            test_size=0.33, random_state=0)
        
    #svc = SVC(kernel = 'linear')
    #svc.fit(x_train,y_train)
    #y_pred = svc.predict(x_test)
    #
    #svc.fit(x_train,y_train)
    
#    knn=KNeighborsClassifier(n_neighbors=10,metric='minkowski')
#    knn.fit(x_train,y_train)
#    y_pred = knn.predict(x_test)


    rfc = RandomForestClassifier(n_estimators = 15, criterion = 'gini')
    rfc.fit(x_train,y_train)
    
    pickle.dump(rfc,open(file,'wb'))
    #y_pred = rfc.predict(x_test)
    
    cm = confusion_matrix(y_test,y_pred)
    print(cm)
    #print(rfc.predict([[0,0,502,0,42,8,159661,3,1,0,113931]]))






def data_classifier(obj):   
    model_file = pickle.load(open(file,'rb'))
    gender = 1 if obj["Gender"] == "Male" else  0  

    print(obj["Geography"])
    if(obj["Geography"] == 'France'):
        result  =  model_file.predict([
            [0,0,obj["CreditScore"],gender,obj["Age"],obj["Tenure"],
            obj["Balance"],obj["NumOfProducts"],obj["HasCrCard"],
            obj["IsActiveMember"],obj["EstimatedSalary"]]])[0]
        return json.dumps({ "result" : int(result) }) 

    elif(obj["Geography"] == 'Spain'):
        result  =  model_file.predict([
            [0,1,obj["CreditScore"],
            gender,obj["Age"],obj["Tenure"],obj["Balance"],
            obj["NumOfProducts"],obj["HasCrCard"],obj["IsActiveMember"],
            obj["EstimatedSalary"]]])[0]   
        return json.dumps({ "result" : int(result) }) 
    
    elif(obj["Geography"] == 'Germany'):
        result  =  model_file.predict([
            [1,0,obj["CreditScore"],
            gender,obj["Age"],obj["Tenure"],obj["Balance"],
            obj["NumOfProducts"],obj["HasCrCard"],obj["IsActiveMember"],
            obj["EstimatedSalary"]]])[0]
        return json.dumps({ "result" : int(result) }) 
    

def write_new_record(obj):
    
    row_numbers = []
    
    with open('data/Churn_Modelling.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in  reader:
            row_numbers.append(row['RowNumber'])
    
    
    with open('data/Churn_Modelling.csv','a') as csvfile:
        fieldnames = [
                'RowNumber','CustomerId','Surname',
                'CreditScore', 'Geography','Gender',
                'Age','Tenure','Balance','NumOfProducts',
                'HasCrCard','IsActiveMember','EstimatedSalary',
                'Exited']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writerow({'RowNumber':  int(row_numbers[-1]) + 1,
                         'CustomerId' : random.randint(100000000,9999999999), 
                         'Surname' : 'doe',
                         'CreditScore':obj['CreditScore'],
                         'Geography' :obj['Geography'],
                         'Gender' :obj['Gender'],
                         'Age' :obj['Age'],
                         'Tenure' :obj['Tenure'],
                         'Balance' :obj['Balance'],
                         'NumOfProducts' :obj['NumOfProducts'],
                         'HasCrCard' :obj['HasCrCard'],
                         'IsActiveMember' :obj['IsActiveMember'],
                         'EstimatedSalary' :obj['EstimatedSalary'],
                         'Exited' :obj['Exited']   })
        


class ClassifierHandler(tornado.web.RequestHandler):
    
    def set_default_headers(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Access-Control-Allow-Headers', '*')
        self.set_header('Access-Control-Max-Age', 1000)
        self.set_header('Content-type', 'application/json')
    def get(self):
        self.finish()
    def post(self):
        data = json.loads(self.request.body)
        self.write(data_classifier(data))
    def options(self):
        self.set_status(204)
        self.finish()



class WriterHandler(tornado.web.RequestHandler):
    
    def set_default_headers(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Access-Control-Allow-Headers', '*')
        self.set_header('Access-Control-Max-Age', 1000)
        self.set_header('Content-type', 'application/json')
    def get(self):
          print("get")
    def post(self):
        data = json.loads(self.request.body)
        write_new_record(data)
    def options(self):
        self.set_status(204)
        self.finish()


class TrainHandler(tornado.web.RequestHandler):
    
    def set_default_headers(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Access-Control-Allow-Headers', '*')
        self.set_header('Access-Control-Max-Age', 1000)
        self.set_header('Content-type', 'application/json')
    def get(self):
        try :
            train_data() 
            self.write({ "result" : "success" }) 
        except:      
            self.write({ "result" : "fail" })
    def post(self):
        self.finish()
    def options(self):
        self.set_status(204)
        self.finish()



def make_app():
    return tornado.web.Application([
        (r"/", WriterHandler),
        (r'/train', TrainHandler),
        (r'/classifier', ClassifierHandler),
    ])


if __name__ == "__main__":  
     app = make_app()
     app.listen(8888)
     print("listening 8888 ")
     tornado.ioloop.IOLoop.current().start()
    





