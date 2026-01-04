/**
 * Product Grid Options Component
 * 
 * Only the grid tab options: Columns, Products Per Page, Column Gap, Row Gap, Smart Pagination
 */

import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { SPRangeControl, Toggle } from '@woo-product-slider-pro/components';
import GapControlWithLink from './gapControlWithLink.jsx';

const ProductGridOptions = ({ attributes, setAttributes }) => {
	const { gridStyle, query } = attributes;

	// Get or initialize grid style - convert to device format for SPRangeControl
	const columnsValue = gridStyle?.columns || { Desktop: 4, Tablet: 2, Mobile: 1 };
	const columns = typeof columnsValue === 'object' && !columnsValue.device 
		? { device: columnsValue }
		: columnsValue;

	const columnGap = gridStyle?.horizontalGap || {
		device: { Desktop: 0, Tablet: 0, Mobile: 0 },
		unit: { Desktop: 'px', Tablet: 'px', Mobile: 'px' },
	};
	const rowGap = gridStyle?.verticalGap || {
		device: { Desktop: 0, Tablet: 0, Mobile: 0 },
		unit: { Desktop: 'px', Tablet: 'px', Mobile: 'px' },
	};
	const productsPerPage = query?.perPage || 8;
	const smartPagination = attributes.smartPagination !== undefined ? attributes.smartPagination : true;
	const linkColumnGap = gridStyle?.linkColumnGap !== undefined ? gridStyle.linkColumnGap : false;
	const linkRowGap = gridStyle?.linkRowGap !== undefined ? gridStyle.linkRowGap : false;

	return (
		<PanelBody title={__('Product Gridsss', 'woo-product-slider-pro')} initialOpen={true}>
			{/* Columns */}
			<SPRangeControl
				attributes={columns}
				attributesKey="tempColumns"
				setAttributes={() => {}}
				onValueChange={({ value, deviceType }) => {
					const currentColumns = columns.device || { Desktop: 4, Tablet: 2, Mobile: 1 };
					setAttributes({
						gridStyle: {
							...gridStyle,
							columns: {
								...currentColumns,
								[deviceType]: value,
							},
						},
					});
				}}
				label={__('Columns', 'woo-product-slider-pro')}
				min={1}
				max={12}
				defaultValue={{ device: { Desktop: 4, Tablet: 2, Mobile: 1 } }}
			/>

			{/* Products Per Page */}
			<SPRangeControl
				attributes={productsPerPage}
				attributesKey="tempPerPage"
				setAttributes={() => {}}
				onValueChange={({ value }) => {
					setAttributes({
						query: {
							...query,
							perPage: value,
						},
					});
				}}
				label={__('Products Per Page', 'woo-product-slider-pro')}
				min={1}
				max={50}
				defaultValue={8}
			/>

			{/* Column Gap */}
			<GapControlWithLink
				label={__('Column Gap', 'woo-product-slider-pro')}
				attributes={columnGap}
				attributesKey="tempColumnGap"
				setAttributes={(newGap) => {
					setAttributes({
						gridStyle: {
							...gridStyle,
							horizontalGap: newGap,
						},
					});
				}}
				linkEnabled={linkColumnGap}
				onLinkToggle={() => {
					setAttributes({
						gridStyle: {
							...gridStyle,
							linkColumnGap: !linkColumnGap,
						},
					});
				}}
				min={0}
				max={100}
				units={['px']}
				defaultValue={{
					device: { Desktop: 0, Tablet: 0, Mobile: 0 },
					unit: { Desktop: 'px', Tablet: 'px', Mobile: 'px' },
				}}
			/>

			{/* Row Gap */}
			<GapControlWithLink
				label={__('Row Gap', 'woo-product-slider-pro')}
				attributes={rowGap}
				attributesKey="tempRowGap"
				setAttributes={(newGap) => {
					setAttributes({
						gridStyle: {
							...gridStyle,
							verticalGap: newGap,
						},
					});
				}}
				linkEnabled={linkRowGap}
				onLinkToggle={() => {
					setAttributes({
						gridStyle: {
							...gridStyle,
							linkRowGap: !linkRowGap,
						},
					});
				}}
				min={0}
				max={100}
				units={['px']}
				defaultValue={{
					device: { Desktop: 0, Tablet: 0, Mobile: 0 },
					unit: { Desktop: 'px', Tablet: 'px', Mobile: 'px' },
				}}
			/>

			{/* Smart Pagination */}
			<Toggle
				label={__('Smart Pagination', 'woo-product-slider-pro')}
				attributes={smartPagination}
				setAttributes={setAttributes}
				attributesKey="smartPagination"
			/>
		</PanelBody>
	);
};

export default ProductGridOptions;
