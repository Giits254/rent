from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS extension
from mpesa.models import db, MpesaTransaction
from mpesa.views import validation_route, confirmation_route, check_transactions_route, confirm_transaction_route, update_transaction_route, generate_receipt_route
import os

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)  # This enables CORS for all routes
# For more specific CORS configuration
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000"],  # Replace with your frontend URL
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Configure the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mpesa.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database with the app
db.init_app(app)

# Register routes without trailing slashes
app.route('/api/validation', methods=['POST'])(validation_route)
app.route('/api/confirmation', methods=['POST'])(confirmation_route)
app.route('/api/check-transactions', methods=['GET'])(check_transactions_route)
app.route('/api/confirm-transaction', methods=['POST'])(confirm_transaction_route)
app.route('/api/update-transaction', methods=['POST'])(update_transaction_route)
app.route('/api/generate-receipt/<transaction_id>', methods=['GET'])(generate_receipt_route)

@app.route('/')
def home():
    return jsonify({"message": "M-Pesa Integration API"})

if __name__ == '__main__':
    with app.app_context():
        # Create database tables
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)