import cherrypy
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import urllib3
import json
http = urllib3.PoolManager()
from random import randint
from firebase_admin import auth
from mailjet_rest import Client
import os
api_key = 'MailJet api key'
api_secret = 'Mail Jet api Secrey'
mailjet=Client(auth=(api_key,api_secret),
version='v3.1')
# Use a service account
cred = credentials.Certificate('firebase.json')
firebase_admin.initialize_app(cred)

db = firestore.client()
class Root:
    @cherrypy.expose
    def lib_b_email(self,to,name,date):
        data = {
    'Messages': [
		    {
			    "From": {
				    "Email": "library@unreached.com",
				"Name": "St Johns Library"
			},
			"To": [
				{
					"Email": to,
					"Name": "passenger 1"
				}
			],
			"TemplateID": 1066457,
			"TemplateLanguage": True,
			"Subject": "Thank you for taking a book out",
			"Variables": {
    "book_name": name,
    "user": to,
    "date": date
  }
		}
	]
}
        result=mailjet.send.create(data=data)
        return "console.log('sent to mailjet"+str(result.json())+"')"


    
    @cherrypy.expose
    def add_new_user(self,email,password,rfid):
		#print(password)
        user=auth.create_user(
            uid=rfid,email=email,password="123456"
        )
        print(password)
        return 'window.ok=true'
	    

    @cherrypy.expose
    def internal_user_api_sn(self,key):
        #require key as this acesses recources that are quotad
        if key=="UsBdrPXctXpLYTBSQv3zcVFiB7H5WfjjLmtiaYpdJGqxCGPWc27EpVBQnom":
            docs=db.collection(u"print").stream()
            for docs in docs:
                return "{ id:'"+docs.id+"',name:'"+docs.to_dict()+"'}"
                break
    @cherrypy.expose
    def internal_camera_api(self,url,key,user):
        if key=="UsBdrPXctXpLYTBSQv3zcVFiB7H5WfjjLmtiaYpdJGqxCGPWc27EpVBQnom":
            doc_ref=db.collection(u"pictures").document(url)
            doc_ref.set({
            u'url':url,
            u'user':user
            })
	    
            return '{"status":"ok"}'
    @cherrypy.expose
    def new_book(self,isbn):
      
        uri="https://www.googleapis.com/books/v1/volumes?q=isbn:"+isbn

        r = http.request('GET', uri)
        ol=json.loads(r.data)
        s=ol['items']
        z=s[0]['volumeInfo']
        y=z['imageLinks']
        a=z['authors']
        q=str(z['pageCount'])
        
        #data={
            #u'name':z['title'],
            #u'author':a[0],
           # u'desc':z['description'],
          #  u'cover':y['thumbnail'],
         #   u'b':b

        #}
        #db.collection(u'books').document(isbn).set(data)

        return "set(`"+z['title']+"`,`"+a[0]+"`,`"+z['description']+"`,`"+y['thumbnail']+"`,"+q+")"
    @cherrypy.expose
    def add_new_book(self,isbn,b):
        uri="https://www.googleapis.com/books/v1/volumes?q=isbn:"+isbn

        r = http.request('GET', uri)
        ol=json.loads(r.data)
        s=ol['items']
        z=s[0]['volumeInfo']
        y=z['imageLinks']
        a=z['authors']
        
        #useref=db.collection(u"user_data")
        #qref=useref.where(u"email"+u'=='+b)
        cities_ref = db.collection(u'cities')

        query = cities_ref.where(u'rfid_id', u'==', b)
        return query
        data={
            u'name':z['title'],
            u'author':a[0],
            u'desc':z['description'],
            u'cover':y['thumbnail'],
            u'b':b

        }
        db.collection(u'books').document(isbn).set(data)

        #return "set('"+z['title']+"','"+a[0]+"','"+z['description']+"','"+y['thumbnail']+"')"
   





        






cherrypy.config.update({'server.socket_host': '0.0.0.0'})
#cherrypy.server.socket_host = 'www.unreached.com'
cherrypy.quickstart(Root())
#
#
