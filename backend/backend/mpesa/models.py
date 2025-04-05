from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

# Initialize SQLAlchemy
db = SQLAlchemy()


class MpesaTransaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    transaction_type = db.Column(db.String(50))
    transaction_id = db.Column(db.String(50), unique=True)
    transaction_time = db.Column(db.DateTime)
    amount = db.Column(db.Float)
    phone_number = db.Column(db.String(15))
    customer_name = db.Column(db.String(200), nullable=True)  # Combined name field
    reference = db.Column(db.String(50))
    company_ref = db.Column(db.String(10), nullable=True)  # Company reference
    status = db.Column(db.String(20), default='PENDING')
    raw_response = db.Column(db.Text)  # JSON as text
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"{self.transaction_id} - {self.amount}"

    @property
    def formatted_phone(self):
        """Return the phone number in the format 0XXX XXX XXX"""
        if self.phone_number and self.phone_number.startswith('254'):
            # Convert 254XXXXXXXXX to 0XXX XXX XXX format
            local_num = '0' + self.phone_number[3:]  # Replace 254 prefix with 0
            if len(local_num) == 10:  # Ensuring it's 10 digits (0XXX XXX XXX)
                return f"{local_num[:4]} {local_num[4:7]} {local_num[7:]}"
        return self.phone_number  # Return original if format doesn't match expected

    # Convert raw_response JSON string to dict when needed
    def get_raw_response(self):
        if isinstance(self.raw_response, str):
            return json.loads(self.raw_response)
        return self.raw_response