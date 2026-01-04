/**
 * Order By Control
 * 
 * Based on WooCommerce's order-by-control
 */

import { __ } from '@wordpress/i18n';
import {
	SelectControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
const OrderByControl = ({
	query,
	setQueryAttribute,
	defaultQuery = {
		orderBy: 'title',
		order: 'asc',
	},
}) => {
	// Order by options with specific labels
	const orderOptions = [
		{ value: 'title-asc', label: __('A - Z', 'woo-product-slider-pro') },
		{ value: 'title-desc', label: __('Z - A', 'woo-product-slider-pro') },
		{ value: 'date-desc', label: __('Newest to Oldest', 'woo-product-slider-pro') },
		{ value: 'date-asc', label: __('Oldest to Newest', 'woo-product-slider-pro') },
		{ value: 'price-desc', label: __('Price - High to Low', 'woo-product-slider-pro') },
		{ value: 'price-asc', label: __('Price - Low to High', 'woo-product-slider-pro') },
		{ value: 'sales-desc', label: __('Sales - High to Low', 'woo-product-slider-pro') },
		{ value: 'sales-asc', label: __('Sales - Low to High', 'woo-product-slider-pro') },
		{ value: 'rating-desc', label: __('Rating - High to Low', 'woo-product-slider-pro') },
		{ value: 'rating-asc', label: __('Rating - Low to High', 'woo-product-slider-pro') },
		{ value: 'random', label: __('Random', 'woo-product-slider-pro') },
	];

	const orderOptionsWithOrder = orderOptions;

	// Safely get orderBy and order with defaults
	const orderBy = query?.orderBy || defaultQuery.orderBy;
	const order = query?.order || defaultQuery.order;
	
	// Handle random order (no orderBy/order split needed)
	let currentValue;
	if (orderBy === 'random') {
		currentValue = 'random';
	} else {
		// Map sales to popularity for WooCommerce compatibility
		const mappedOrderBy = orderBy === 'popularity' ? 'sales' : orderBy;
		currentValue = `${mappedOrderBy}-${order}`;
		
		// Check if this value exists in our options, if not use default
		const valueExists = orderOptions.some(opt => opt.value === currentValue);
		if (!valueExists) {
			currentValue = 'title-asc'; // Default to A-Z
		}
	}

	return (
		<ToolsPanelItem
			label={__('Order by', 'woo-product-slider-pro')}
			hasValue={() => {
				const currentOrderBy = query?.orderBy || defaultQuery.orderBy;
				const currentOrder = query?.order || defaultQuery.order;
				return currentOrderBy !== defaultQuery.orderBy || currentOrder !== defaultQuery.order;
			}}
			isShownByDefault
			onDeselect={() => {
				setQueryAttribute({
					orderBy: defaultQuery.orderBy,
					order: defaultQuery.order,
				});
			}}
		>
			<SelectControl
				value={currentValue}
				options={orderOptionsWithOrder}
				label={__('Order by', 'woo-product-slider-pro')}
				onChange={(value) => {
					if (value === 'random') {
						setQueryAttribute({
							orderBy: 'random',
							order: 'desc',
						});
					} else {
						const [orderBy, order] = value.split('-');
						// Map sales back to popularity for WooCommerce compatibility
						const mappedOrderBy = orderBy === 'sales' ? 'popularity' : orderBy;
						setQueryAttribute({
							orderBy: mappedOrderBy,
							order: order,
						});
					}
				}}
			/>
		</ToolsPanelItem>
	);
};

export default OrderByControl;
