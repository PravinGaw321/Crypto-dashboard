export const getPriceChangeStyle = (value) => {
    return {
        color: value < 0 ? 'red' : '#000', // Red for negative, green for positive
    };
};

