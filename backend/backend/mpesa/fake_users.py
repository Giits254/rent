# List of fake users for M-Pesa simulation
FAKE_USERS = [
    {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "phone_number": "254712345678",
    },
    {
        "id": 2,
        "first_name": "Jane",
        "last_name": "Smith",
        "phone_number": "254723456789",
    },
    {
        "id": 3,
        "first_name": "Michael",
        "last_name": "Wanjala",
        "phone_number": "254734567890",
    },
    {
        "id": 4,
        "first_name": "Sarah",
        "last_name": "Kamau",
        "phone_number": "254745678901",
    },
    {
        "id": 5,
        "first_name": "David",
        "last_name": "Ochieng",
        "phone_number": "254756789012",
    },
    {
        "id": 6,
        "first_name": "Grace",
        "last_name": "Muthoni",
        "phone_number": "254767890123",
    },
    {
        "id": 7,
        "first_name": "Brian",
        "last_name": "Kiprop",
        "phone_number": "254778901234",
    },
    {
        "id": 8,
        "first_name": "Faith",
        "last_name": "Akinyi",
        "phone_number": "254789012345",
    },
]

def get_user_by_id(user_id):
    """Get a user by their ID"""
    for user in FAKE_USERS:
        if user["id"] == user_id:
            return user
    return None

def list_users():
    """List all users in a formatted way"""
    print("\nAvailable Users:")
    print("ID | Name                | Phone Number")
    print("-" * 45)
    for user in FAKE_USERS:
        print(f"{user['id']:2} | {user['first_name']} {user['last_name']:16} | {user['phone_number']}")