import requests
import json
from datetime import datetime
import random
import string
import sys
from .fake_users import FAKE_USERS, list_users, get_user_by_id

# Configuration variables - easy to modify
BASE_URL = "https://0582-105-161-11-79.ngrok-free.app"  # Change this to your Flask server URL
VALIDATION_URL = f"{BASE_URL}/api/validation/"
CONFIRMATION_URL = f"{BASE_URL}/api/confirmation/"
CHECK_TRANSACTIONS_URL = f"{BASE_URL}/api/check-transactions/"
DEFAULT_AMOUNT = "1000.00"
DEFAULT_REFERENCE = "TEST123"
BUSINESS_SHORT_CODE = "600979"
DEFAULT_ORG_BALANCE = "115000.00"


def generate_mpesa_receipt():
    """Generate a realistic M-Pesa receipt number"""
    prefix = random.choice(["PGH", "PGB", "PGF", "PGK", "PGJ"])
    numbers = ''.join(random.choices(string.digits, k=8))
    return f"{prefix}{numbers}"


def simulate_transaction(interactive=True):
    """
    Simulate an M-Pesa transaction
    If interactive=True, prompt user for details
    If interactive=False, use random data
    """
    # Initialize default data
    user = None
    amount = DEFAULT_AMOUNT
    reference = DEFAULT_REFERENCE

    if interactive:
        # Display list of users
        list_users()

        # Ask for user selection
        while user is None:
            try:
                user_id = int(input("\nSelect a user ID to send money from: "))
                user = get_user_by_id(user_id)
                if user is None:
                    print("Invalid user ID. Please try again.")
            except ValueError:
                print("Please enter a valid number.")

        # Ask for amount
        while True:
            try:
                amount = input("Enter amount to send (KES): ")
                # Ensure the amount is a valid number
                float(amount)
                break
            except ValueError:
                print("Please enter a valid amount.")

        # Ask for reference number (optional)
        custom_ref = input("Enter reference number (or press Enter for auto-generated): ")
        if custom_ref:
            reference = custom_ref
    else:
        # Pick a random user
        user = random.choice(FAKE_USERS)

    # Generate a unique M-Pesa receipt number
    mpesa_receipt = generate_mpesa_receipt()

    # Generate current timestamp in M-Pesa format
    current_time = datetime.now().strftime('%Y%m%d%H%M%S')

    # Build the test payload
    test_payload = {
        "TransactionType": "CustomerPayBillOnline",
        "TransID": mpesa_receipt,
        "TransTime": current_time,
        "TransAmount": amount,
        "BusinessShortCode": BUSINESS_SHORT_CODE,
        "BillRefNumber": reference,
        "InvoiceNumber": "",
        "OrgAccountBalance": f"{float(amount) + float(DEFAULT_ORG_BALANCE):.2f}",
        "ThirdPartyTransID": "",
        "MSISDN": user["phone_number"],
        "FirstName": user["first_name"],
        "MiddleName": "",
        "LastName": user["last_name"],
        "ResultCode": "0",
        "ResultDesc": "The service request is processed successfully.",
        "CallbackMetadata": {
            "Item": [
                {
                    "Name": "Amount",
                    "Value": float(amount)
                },
                {
                    "Name": "MpesaReceiptNumber",
                    "Value": mpesa_receipt
                },
                {
                    "Name": "Balance"
                },
                {
                    "Name": "TransactionDate",
                    "Value": current_time
                },
                {
                    "Name": "PhoneNumber",
                    "Value": int(user["phone_number"])
                }
            ]
        }
    }

    headers = {
        "Content-Type": "application/json"
    }

    # Display transaction details
    print("\n----- Transaction Details -----")
    print(f"Sender: {user['first_name']} {user['last_name']} ({user['phone_number']})")
    print(f"Amount: KES {amount}")
    print(f"M-Pesa Receipt: {mpesa_receipt}")
    print(f"Reference: {reference}")
    print(f"Time: {datetime.strptime(current_time, '%Y%m%d%H%M%S').strftime('%Y-%m-%d %H:%M:%S')}")
    print("--------------------------------")

    company_ref = None

    # Simulate validation request
    print("\n1. Sending Validation Request...")
    try:
        validation_response = requests.post(VALIDATION_URL, json=test_payload, headers=headers)
        print(f"Status Code: {validation_response.status_code}")

        if validation_response.status_code == 200:
            response_json = validation_response.json()
            print("Response:")
            print(json.dumps(response_json, indent=2))

            # Store company reference for confirmation
            if "CompanyRef" in response_json:
                company_ref = response_json["CompanyRef"]
                print(f"Company Reference ID: {company_ref}")
        else:
            print(f"Error: {validation_response.text}")
    except Exception as e:
        print(f"Validation Error: {str(e)}")

    # Add company reference to payload if received
    if company_ref:
        test_payload["CompanyRef"] = company_ref

    # Simulate confirmation request
    print("\n2. Sending Confirmation Request...")
    try:
        confirmation_response = requests.post(CONFIRMATION_URL, json=test_payload, headers=headers)
        print(f"Status Code: {confirmation_response.status_code}")

        if confirmation_response.status_code == 200:
            print("Response:")
            print(json.dumps(confirmation_response.json(), indent=2))
        else:
            print(f"Error: {confirmation_response.text}")
    except Exception as e:
        print(f"Confirmation Error: {str(e)}")

    # Check stored transactions
    print("\n3. Checking stored transactions...")
    try:
        check_response = requests.get(CHECK_TRANSACTIONS_URL)
        if check_response.status_code == 200:
            print("Stored Transactions:")
            transactions = check_response.json()

            if not transactions:
                print("No transactions found.")
            else:
                for i, tx in enumerate(transactions):
                    print(f"\nTransaction #{i + 1}:")
                    print(f"  ID: {tx.get('transaction_id')}")
                    print(f"  Company Ref: {tx.get('company_ref')}")
                    print(f"  Amount: KES {tx.get('amount')}")
                    print(f"  Phone: {tx.get('phone_number')}")
                    print(f"  Time: {tx.get('transaction_time')}")
                    print(f"  Status: {tx.get('status')}")
        else:
            print(f"Error: {check_response.text}")
    except Exception as e:
        print(f"Check Transactions Error: {str(e)}")


def main():
    """Main menu for the simulation"""
    while True:
        print("\n===== M-PESA TRANSACTION SIMULATOR =====")
        print("1. Send money (interactive)")
        print("2. Send random transaction")
        print("3. Check stored transactions")
        print("4. Exit")

        try:
            choice = input("\nEnter your choice (1-4): ")

            if choice == "1":
                simulate_transaction(interactive=True)
            elif choice == "2":
                simulate_transaction(interactive=False)
            elif choice == "3":
                # Just check transactions
                try:
                    check_response = requests.get(CHECK_TRANSACTIONS_URL)
                    print("\nStored Transactions:")
                    transactions = check_response.json()

                    if not transactions:
                        print("No transactions found.")
                    else:
                        for i, tx in enumerate(transactions):
                            print(f"\nTransaction #{i + 1}:")
                            print(f"  ID: {tx.get('transaction_id')}")
                            print(f"  Company Ref: {tx.get('company_ref')}")
                            print(f"  Amount: KES {tx.get('amount')}")
                            print(f"  Phone: {tx.get('phone_number')}")
                            print(f"  Time: {tx.get('transaction_time')}")
                            print(f"  Status: {tx.get('status')}")
                except Exception as e:
                    print(f"Check Transactions Error: {str(e)}")
            elif choice == "4":
                print("Exiting simulator. Goodbye!")
                sys.exit(0)
            else:
                print("Invalid choice. Please enter a number between 1 and 4.")
        except KeyboardInterrupt:
            print("\nExiting simulator. Goodbye!")
            sys.exit(0)


if __name__ == "__main__":
    main()