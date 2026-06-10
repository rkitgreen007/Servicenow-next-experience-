import { createHttpEffect } from '@servicenow/ui-effect-http';

// Validation helper
const validateForm = (data) => {
    const errors = {};
    if (!data.productType) errors.productType = 'Product type is required.';
    if (!data.serialNumber || data.serialNumber.trim() === '') errors.serialNumber = 'Serial number is required.';
    if (!data.purchaseDate) errors.purchaseDate = 'Purchase date is required.';
    return errors;
};

export default {
    // 1. Triggered when the user clicks submit
    'FORM_SUBMITTED': ({ action, updateState, dispatch }) => {
        const { formData } = action.payload;
        const errors = validateForm(formData);

        if (Object.keys(errors).length > 0) {
            updateState({ errors });
            return;
        }

        // Lock form and trigger HTTP Request
        updateState({ isSubmitting: true, statusMessage: '' });
        dispatch('REGISTER_PRODUCT_API', { data: formData });
    },

    // 2. HTTP Effect to send data to ServiceNow Table API
    'REGISTER_PRODUCT_API': createHttpEffect('api/now/table/u_product_registrations', {
        method: 'POST',
        data: ({ action }) => action.payload.data,
        successActionType: 'REGISTRATION_SUCCESS',
        errorActionType: 'REGISTRATION_FAILURE'
    }),

    // 3. Handle API Success
    'REGISTRATION_SUCCESS': ({ updateState }) => {
        updateState({
            isSubmitting: false,
            statusMessage: '🎉 Product registered successfully!',
            formData: { serialNumber: '', productType: '', purchaseDate: '' } // Reset form
        });
    },

    // 4. Handle API Failure
    'REGISTRATION_FAILURE': ({ action, updateState }) => {
        const backendError = action.payload.data?.error?.message || 'Failed to register product. Please try again.';
        updateState({
            isSubmitting: false,
            statusMessage: `❌ Error: ${backendError}`
        });
    }
};
