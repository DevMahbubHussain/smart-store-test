/**
 * Shared Utils for Showcase Blocks
 * 
 * Common utility functions used across product-grid and product-carousel blocks
 */

/**
 * Sets the new query arguments of a showcase block
 * @param {Object} block - The block object with attributes and setAttributes
 * @param {Object} queryParams - Query parameters to merge
 */
export function setQueryAttribute(block, queryParams) {
	const { query } = block.attributes;

	block.setAttributes({
		query: {
			...query,
			...queryParams,
		},
	});
}

/**
 * Helper to create setQueryAttribute function for use in components
 * @param {Object} attributes - Block attributes
 * @param {Function} setAttributes - Function to set attributes
 * @returns {Function} setQueryAttribute function
 */
export function createSetQueryAttribute(attributes, setAttributes) {
	return (queryParams) => {
		const { query = {} } = attributes;
		setAttributes({
			query: {
				...query,
				...queryParams,
			},
		});
	};
}
