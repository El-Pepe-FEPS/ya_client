export const email = {
    required: {
        value: true,
        message: 'This is required field.',
    },
    pattern: {
        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        message: 'Invalid email address.',
    },
};

export const password = {
    required: {
        value: true,
        message: 'This is required field.',
    },
    minLength: {
        value: 8,
        message: 'Password must be at least 8 characters long.',
    },
    maxLength: {
        value: 16,
        message: 'Password must be at most 16 characters long.',
    },
};

export const phoneNumber = {
    required: {
        value: true,
        message: 'This is required field.',
    },
    pattern: {
        value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        message: 'Invalid phone number.',
    },
};

export const fullName = {
    required: {
        value: true,
        message: 'This is required field.',
    },
    maxLength: {
        value: 150,
        message: 'Full name must be at most 150 characters long.',
    },
};
