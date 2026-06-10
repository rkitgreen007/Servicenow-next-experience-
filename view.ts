export default (state, { updateState, dispatch }) => {
    const { formData, errors, isSubmitting, statusMessage } = state;

    // Handle input changes dynamically
    const handleInputChange = (field, value) => {
        updateState({
            formData: {
                ...formData,
                [field]: value
            },
            // Clear error for this field as the user types
            errors: {
                ...errors,
                [field]: ''
            }
        });
    };

    return (
        <div className="registration-container">
            <h2>Product Registration</h2>
            <p className="subtitle">Register your new device to activate your warranty.</p>
            
            {statusMessage && (
                <div className={`status-banner ${statusMessage.includes('success') ? 'success' : 'error'}`}>
                    {statusMessage}
                </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); dispatch('FORM_SUBMITTED', { formData }); }}>
                
                {/* Product Type Dropdown */}
                <div className="form-group">
                    <now-select
                        label="Product Type"
                        placeholder="Select a product category"
                        selectedItems={[formData.productType]}
                        items={[
                            { id: 'laptop', label: 'Laptop / PC' },
                            { id: 'mobile', label: 'Mobile Phone' },
                            { id: 'server', label: 'Enterprise Server' }
                        ]}
                        invalid={!!errors.productType}
                        invalidMessage={errors.productType}
                        on-now-select-selected-items-set={(e) => handleInputChange('productType', e.detail.value[0])}
                    />
                </div>

                {/* Serial Number Input */}
                <div className="form-group">
                    <now-input
                        label="Serial Number"
                        placeholder="e.g., SN-12345-XYZ"
                        value={formData.serialNumber}
                        invalid={!!errors.serialNumber}
                        invalidMessage={errors.serialNumber}
                        on-input={(e) => handleInputChange('serialNumber', e.target.value)}
                    />
                </div>

                {/* Purchase Date Input */}
                <div className="form-group">
                    <now-input
                        type="date"
                        label="Purchase Date"
                        value={formData.purchaseDate}
                        invalid={!!errors.purchaseDate}
                        invalidMessage={errors.purchaseDate}
                        on-input={(e) => handleInputChange('purchaseDate', e.target.value)}
                    />
                </div>

                {/* Submit Button */}
                <div className="form-actions">
                    <now-button
                        label={isSubmitting ? "Registering..." : "Register Product"}
                        variant="primary"
                        disabled={isSubmitting}
                        on-click={() => dispatch('FORM_SUBMITTED', { formData })}
                    />
                </div>
            </form>
        </div>
    );
};
      
