import tornado.web

from sklearn.cross_validation import train_test_split
from sklearn.preprocessing import StandardScaler
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import OneHotEncoder
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestRegressor
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

#rfc = RandomForestClassifier(n_estimators = 15, criterion = 'gini')
#rfc.fit(X_train,y_train)

#y_pred = rfc.predict(X_test)
#y_pred = (y_pred>0.5)

#cm = confusion_matrix(y_test,y_pred)
#print(cm)


classifier = Sequential()
#
classifier.add(Dense(output_dim = 6, init = 'uniform', activation = 'relu', input_dim = 11))
#
classifier.add(Dense(output_dim = 6, init = 'uniform', activation = 'relu'))
#
classifier.add(Dense(output_dim = 1, init = 'uniform', activation = 'sigmoid'))
#
classifier.compile(optimizer = 'adam', loss = 'binary_crossentropy', metrics = ['accuracy'])
#
#
classifier.fit(X_train, y_train, epochs = 100)
#
y_pred = classifier.predict(X_test)
y_pred = (y_pred > 0.5)

