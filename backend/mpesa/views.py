from flask import request, jsonify, abort
from datetime import datetime
import json
import random
import string
from .models import db, MpesaTransaction

def generate_reference_id():
    """Generate a unique 10-character reference ID for the company"""
    # Combination of letters and numbers
    chars = string.ascii_uppercase + string.digits
    return ''.join(random.choices(chars, k=10))


def validation_route():
    """
    Handle M-Pesa validation callback
    """
    try:
        # Log the raw request for debugging in a formatted JSON
        print("\n======= VALIDATION REQUEST =======")
        print(json.dumps(request.json, indent=4))
        print("==================================\n")

        # Generate a unique reference ID for this transaction
        company_ref = generate_reference_id()
        print(f"Generated Company Reference ID: {company_ref}")

        # Create response
        response = {
            "ResultCode": 0,
            "ResultDesc": "Accepted",
            "CompanyRef": company_ref
        }

        # Log the response
        print("\n======= VALIDATION RESPONSE =======")
        print(json.dumps(response, indent=4))
        print("===================================\n")

        return jsonify(response)
    except Exception as e:
        error_response = {
            "ResultCode": 1,
            "ResultDesc": f"Failed: {str(e)}"
        }
        print(f"\n======= VALIDATION ERROR =======")
        print(f"Error: {str(e)}")
        print(json.dumps(error_response, indent=4))
        print("================================\n")
        return jsonify(error_response)


def confirmation_route():
    """
    Handle M-Pesa confirmation callback
    """
    try:
        # Log the raw request in formatted JSON
        print("\n======= CONFIRMATION REQUEST =======")
        print(json.dumps(request.json, indent=4))
        print("====================================\n")

        # Extract transaction details
        data = request.json

        # Generate a unique company reference ID if not already provided
        company_ref = data.get('CompanyRef', generate_reference_id())

        # Combine first and middle name (if exists) and last name
        first_name = data.get('FirstName', '')
        middle_name = data.get('MiddleName', '')
        last_name = data.get('LastName', '')

        # Create full name with proper spacing
        full_name_parts = [n for n in [first_name, middle_name, last_name] if n]
        full_name = " ".join(full_name_parts)

        # Create transaction record
        transaction = MpesaTransaction(
            transaction_type=data.get('TransactionType', ''),
            transaction_id=data.get('TransID', ''),
            transaction_time=datetime.strptime(
                data.get('TransTime', ''), '%Y%m%d%H%M%S'
            ),
            amount=float(data.get('TransAmount', 0)),
            phone_number=data.get('MSISDN', ''),
            customer_name=full_name,  # Use combined name field
            reference=data.get('BillRefNumber', ''),
            company_ref=company_ref,  # Store the company reference
            status='PENDING',  # Default status is pending until confirmed
            raw_response=json.dumps(data)  # Store as JSON string
        )
        db.session.add(transaction)
        db.session.commit()

        # Get formatted phone number
        formatted_phone = transaction.formatted_phone

        # Log transaction details
        transaction_details = {
            "transaction_id": transaction.transaction_id,
            "company_ref": company_ref,
            "amount": transaction.amount,
            "phone_number": formatted_phone,
            "customer_name": full_name,
            "status": transaction.status
        }
        print("\n======= TRANSACTION SAVED =======")
        print(json.dumps(transaction_details, indent=4))
        print("================================\n")

        # Create response
        response = {
            "ResultCode": 0,
            "ResultDesc": "Success",
            "CompanyRef": company_ref
        }

        # Log the response
        print("\n======= CONFIRMATION RESPONSE =======")
        print(json.dumps(response, indent=4))
        print("=====================================\n")

        return jsonify(response)
    except Exception as e:
        error_response = {
            "ResultCode": 1,
            "ResultDesc": f"Failed: {str(e)}"
        }
        print(f"\n======= CONFIRMATION ERROR =======")
        print(f"Error: {str(e)}")
        print(json.dumps(error_response, indent=4))
        print("==================================\n")
        return jsonify(error_response)


def check_transactions_route():
    """
    Return all stored transactions
    """
    try:
        transactions = MpesaTransaction.query.order_by(MpesaTransaction.transaction_time.desc()).all()
        data = []

        for transaction in transactions:
            data.append({
                "transaction_id": transaction.transaction_id,
                "company_ref": transaction.company_ref,
                "amount": transaction.amount,
                "phone_number": transaction.formatted_phone,  # Use the formatted phone property
                "customer_name": transaction.customer_name,
                "reference": transaction.reference,
                "transaction_time": transaction.transaction_time.strftime('%Y-%m-%d %H:%M:%S'),
                "status": transaction.status,
            })

        print("\n======= TRANSACTIONS FETCHED =======")
        print(f"Count: {len(data)} transactions")
        print("====================================\n")

        return jsonify(data)
    except Exception as e:
        error_response = {"error": str(e)}
        print(f"\n======= CHECK TRANSACTIONS ERROR =======")
        print(f"Error: {str(e)}")
        print(json.dumps(error_response, indent=4))
        print("========================================\n")
        return jsonify(error_response)


def confirm_transaction_route():
    """
    Confirm a pending transaction
    """
    try:
        transaction_id = request.json.get('transaction_id')
        print(f"\n======= CONFIRMING TRANSACTION =======")
        print(f"Transaction ID: {transaction_id}")

        transaction = MpesaTransaction.query.filter_by(transaction_id=transaction_id).first_or_404()

        # Update the status to COMPLETED
        transaction.status = 'COMPLETED'
        db.session.commit()

        response = {
            "success": True,
            "message": f"Transaction {transaction_id} confirmed successfully"
        }

        print(json.dumps(response, indent=4))
        print("=====================================\n")

        return jsonify(response)
    except Exception as e:
        error_response = {
            "success": False,
            "error": str(e)
        }
        print(f"\n======= CONFIRM TRANSACTION ERROR =======")
        print(f"Error: {str(e)}")
        print(json.dumps(error_response, indent=4))
        print("=========================================\n")
        return jsonify(error_response)


def update_transaction_route():
    """
    Update transaction details
    """
    try:
        transaction_id = request.json.get('transaction_id')
        print(f"\n======= UPDATING TRANSACTION =======")
        print(json.dumps(request.json, indent=4))

        transaction = MpesaTransaction.query.filter_by(transaction_id=transaction_id).first_or_404()

        # Update fields if provided
        if 'group' in request.json:
            transaction.reference = request.json.get('group')

        if 'customer_name' in request.json:
            transaction.customer_name = request.json.get('customer_name')

        if 'status' in request.json:
            # Convert UI status to database status
            status_map = {
                'Confirmed': 'COMPLETED',
                'Pending': 'PENDING'
            }
            transaction.status = status_map.get(request.json.get('status'), transaction.status)

        db.session.commit()

        response = {
            "success": True,
            "message": f"Transaction {transaction_id} updated successfully"
        }

        print(json.dumps(response, indent=4))
        print("===================================\n")

        return jsonify(response)
    except Exception as e:
        error_response = {
            "success": False,
            "error": str(e)
        }
        print(f"\n======= UPDATE TRANSACTION ERROR =======")
        print(f"Error: {str(e)}")
        print(json.dumps(error_response, indent=4))
        print("========================================\n")
        return jsonify(error_response)


def generate_receipt_route(transaction_id):
    """
    Generate a receipt for a transaction
    """
    try:
        print(f"\n======= GENERATING RECEIPT =======")
        print(f"Transaction ID: {transaction_id}")

        transaction = MpesaTransaction.query.filter_by(transaction_id=transaction_id).first_or_404()

        # Generate receipt data
        receipt = {
            "receipt_number": f"RCP{random.randint(10000, 99999)}",
            "transaction_id": transaction.transaction_id,
            "company_ref": transaction.company_ref,
            "amount": transaction.amount,
            "phone_number": transaction.formatted_phone,  # Use formatted phone
            "customer_name": transaction.customer_name,
            "date": transaction.transaction_time.strftime('%Y-%m-%d %H:%M:%S'),
            "status": transaction.status,
            "reference": transaction.reference,
            "generated_at": datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }

        print(json.dumps(receipt, indent=4))
        print("==================================\n")

        return jsonify(receipt)
    except Exception as e:
        error_response = {
            "success": False,
            "error": str(e)
        }
        print(f"\n======= GENERATE RECEIPT ERROR =======")
        print(f"Error: {str(e)}")
        print(json.dumps(error_response, indent=4))
        print("======================================\n")
        return jsonify(error_response)