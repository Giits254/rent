// api.js - M-Pesa Transaction API Integration

/**
 * Fetch all M-Pesa transactions from the backend
 * @returns {Promise} Promise object representing the transaction data
 */
export const fetchTransactions = async () => {
  try {
    console.log('Fetching transactions...');
    const response = await fetch('/api/check-transactions');
    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check content type before parsing
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      // Handle non-JSON response
      const text = await response.text();
      console.error('Received non-JSON response:', text.substring(0, 200) + '...');
      throw new Error(`Expected JSON response but got ${contentType || 'unknown content type'}`);
    }
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

/**
 * Confirm a pending M-Pesa transaction
 * @param {string} transactionId - The M-Pesa transaction ID to confirm
 * @returns {Promise} Promise object representing the confirmation result
 */
export const confirmTransaction = async (transactionId) => {
  try {
    const response = await fetch('/api/confirm-transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transaction_id: transactionId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      const text = await response.text();
      throw new Error(`Expected JSON response but got ${contentType || 'unknown content type'}`);
    }
  } catch (error) {
    console.error('Error confirming transaction:', error);
    throw error;
  }
};

/**
 * Update a transaction's details
 * @param {Object} transactionData - The transaction data to update
 * @returns {Promise} Promise object representing the update result
 */
export const updateTransaction = async (transactionData) => {
  try {
    const response = await fetch('/api/update-transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      const text = await response.text();
      throw new Error(`Expected JSON response but got ${contentType || 'unknown content type'}`);
    }
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};

/**
 * Generate a receipt for a transaction
 * @param {string} transactionId - The transaction ID to generate a receipt for
 * @returns {Promise} Promise object representing the receipt data
 */
export const generateReceipt = async (transactionId) => {
  try {
    const response = await fetch(`/api/generate-receipt/${transactionId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      const text = await response.text();
      throw new Error(`Expected JSON response but got ${contentType || 'unknown content type'}`);
    }
  } catch (error) {
    console.error('Error generating receipt:', error);
    throw error;
  }
};