import { createCustomElement } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import view from './view';
import actionHandlers from './actionHandlers';

createCustomElement('sn-product-registration', {
    renderer: { type: snabbdom },
    view,
    styles,
    initialState: {
        formData: {
            serialNumber: '',
            productType: '',
            purchaseDate: ''
        },
        errors: {},
        isSubmitting: false,
        statusMessage: ''
    },
    actionHandlers
});
