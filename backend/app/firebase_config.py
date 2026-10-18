from firebase_admin import credentials, firestore, initialize_app

firebase_app = initialize_app(
    credentials.ApplicationDefault(),
    {"projectId": "garageiq-510316"}
)

db = firestore.client(
    app=firebase_app,
    database_id="garageiq"
)
