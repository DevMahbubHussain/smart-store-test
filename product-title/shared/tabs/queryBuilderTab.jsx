/**
 * Query Builder Tab Component
 *
 * Tab with subtabs for query building: Query Builder, Advanced Filtering, Common Filtering
 */

import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { PanelBody } from '@wordpress/components';
import { MultipleSelect, Toggle, SelectField, SPRangeControl, InputControl, Divider } from '@woo-product-slider-pro/components';
import TabControls from '@woo-product-slider-pro/components/tabControls/tabControls';
import OrderByControl from '../orderByControl.jsx';
import AdvancedFilteringTab from './advancedFilteringTab.jsx';
import { createSetQueryAttribute } from '../utils.js';

// Query Builder Subtab (Filter Product by, Filter by Date, Order by).
const QueryBuilderSubtab = ({ attributes, setAttributes }) => {
	const { query = {} } = attributes || {};
	const setQueryAttribute = createSetQueryAttribute(attributes, setAttributes);

	// Filter Product by options
	const filterProductByOptions = [
		{ label: __('Latest', 'woo-product-slider-pro'), value: 'latest' },
		{ label: __('Featured', 'woo-product-slider-pro'), value: 'featured' },
		{ label: __('Best Selling', 'woo-product-slider-pro'), value: 'best-selling' },
		{ label: __('On Sale', 'woo-product-slider-pro'), value: 'on-sale' },
		{ label: __('Top Rated', 'woo-product-slider-pro'), value: 'top-rated' },
		{ label: __('Related', 'woo-product-slider-pro'), value: 'related' },
		{ label: __('Upsells', 'woo-product-slider-pro'), value: 'upsells' },
		{ label: __('Cross-sells', 'woo-product-slider-pro'), value: 'cross-sells' },
		{ label: __('Random', 'woo-product-slider-pro'), value: 'random' },
		{ label: __('Specific', 'woo-product-slider-pro'), value: 'specific' },
		{ label: __('Development', 'woo-product-slider-pro'), value: 'development' },
	];

	// Filter by Date options
	const filterByDateOptions = [
		{ label: __('All Times', 'woo-product-slider-pro'), value: 'all' },
		{ label: __('Last 3 Days', 'woo-product-slider-pro'), value: 'last-3-days' },
		{ label: __('Last 7 Days', 'woo-product-slider-pro'), value: 'last-7-days' },
		{ label: __('Last 15 Days', 'woo-product-slider-pro'), value: 'last-15-days' },
		{ label: __('Last 30 Days', 'woo-product-slider-pro'), value: 'last-30-days' },
		{ label: __('Custom Period', 'woo-product-slider-pro'), value: 'custom' },
	];

	return (
		<>
			{/* Filter Product by */}
			<SelectField
				label={__('Filter Product by', 'woo-product-slider-pro')}
				attributes={query?.filterProductBy || 'latest'}
				attributesKey="tempFilterProductBy"
				setAttributes={() => {}}
				onChange={(newValue) => {
					setQueryAttribute({ filterProductBy: newValue });
				}}
				items={filterProductByOptions}
				flexStyle={false}
			/>

			{/* Filter by Date */}
			<SelectField
				label={__('Filter by Date', 'woo-product-slider-pro')}
				attributes={query?.filterByDate || 'all'}
				attributesKey="tempFilterByDate"
				setAttributes={() => {}}
				onChange={(newValue) => {
					setQueryAttribute({ filterByDate: newValue });
				}}
				items={filterByDateOptions}
				flexStyle={false}
			/>

			{/* Order by */}
			<OrderByControl
				query={query}
				setQueryAttribute={setQueryAttribute}
			/>
		</>
	);
};

// Common Filtering Subtab (All common filtering options + Offset Products, No Result Found Label)
const CommonFilteringSubtab = ({ attributes, setAttributes }) => {
	const { query = {} } = attributes || {};
	const setQueryAttribute = createSetQueryAttribute(attributes, setAttributes);

	// Get WooCommerce product types (simple, variable, grouped, external)
	const productTypes = useSelect(
		(select) => {
			return [
				{ label: __('Simple', 'woo-product-slider-pro'), value: 'simple' },
				{ label: __('Variable', 'woo-product-slider-pro'), value: 'variable' },
				{ label: __('Grouped', 'woo-product-slider-pro'), value: 'grouped' },
				{ label: __('External', 'woo-product-slider-pro'), value: 'external' },
			];
		},
		[]
	);

	// Get all products for selection
	const products = useSelect(
		(select) => {
			return select(coreStore).getEntityRecords('postType', 'product', {
				per_page: -1,
			});
		},
		[]
	);

	// Get categories for exclusion
	const categories = useSelect(
		(select) => {
			return select(coreStore).getEntityRecords('taxonomy', 'product_cat', {
				per_page: -1,
			});
		},
		[]
	);

	// Get authors/users
	const authors = useSelect(
		(select) => {
			return select(coreStore).getUsers({ per_page: -1 });
		},
		[]
	);

	// Convert to options format
	const productOptions = Array.isArray(products)
		? products.map((product) => ({
				label: product.title?.rendered || product.name || `Product #${product.id}`,
				value: product.id,
			}))
		: [];

	const categoryOptions = Array.isArray(categories)
		? categories.map((cat) => ({
				label: cat.name,
				value: cat.id,
			}))
		: [];

	const authorOptions = Array.isArray(authors)
		? authors.map((author) => ({
				label: author.name,
				value: author.id,
			}))
		: [];

	return (
		<>
			{/* Product Type */}
			<MultipleSelect
				label={__('Product Type', 'woo-product-slider-pro')}
				attributes={query?.productType || []}
				attributesKey="tempProductType"
				setAttributes={() => {}}
				onChange={(selectedOptions) => {
					const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
					setQueryAttribute({ productType: values });
				}}
				items={productTypes}
			/>

			{/* Include Product */}
			<MultipleSelect
				label={__('Include Product', 'woo-product-slider-pro')}
				attributes={query?.includeProducts || []}
				attributesKey="tempIncludeProducts"
				setAttributes={() => {}}
				onChange={(selectedOptions) => {
					const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
					setQueryAttribute({ includeProducts: values });
				}}
				items={productOptions}
			/>

			{/* Exclude Products */}
			<MultipleSelect
				label={__('Exclude Products', 'woo-product-slider-pro')}
				attributes={query?.excludeProducts || []}
				attributesKey="tempExcludeProducts"
				setAttributes={() => {}}
				onChange={(selectedOptions) => {
					const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
					setQueryAttribute({ excludeProducts: values });
				}}
				items={productOptions}
			/>

			{/* Exclude Categories */}
			<MultipleSelect
				label={__('Exclude Categories', 'woo-product-slider-pro')}
				attributes={query?.excludeCategories || []}
				attributesKey="tempExcludeCategories"
				setAttributes={() => {}}
				onChange={(selectedOptions) => {
					const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
					setQueryAttribute({ excludeCategories: values });
				}}
				items={categoryOptions}
			/>

			{/* Exclude Author */}
			<MultipleSelect
				label={__('Exclude Author', 'woo-product-slider-pro')}
				attributes={query?.excludeAuthor || []}
				attributesKey="tempExcludeAuthor"
				setAttributes={() => {}}
				onChange={(selectedOptions) => {
					const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
					setQueryAttribute({ excludeAuthor: values });
				}}
				items={authorOptions}
			/>

			{/* Out of Stock Products */}
			<Toggle
				label={__('Out of Stock Products', 'woo-product-slider-pro')}
				attributes={query?.outOfStockProducts || false}
				attributesKey="tempOutOfStock"
				setAttributes={() => {}}
				onChange={(invertedValue) => {
					setQueryAttribute({ outOfStockProducts: !invertedValue });
				}}
			/>

			{/* Hide On Sale Products */}
			<Toggle
				label={__('Hide On Sale Products', 'woo-product-slider-pro')}
				attributes={query?.hideOnSaleProducts || false}
				attributesKey="tempHideOnSale"
				setAttributes={() => {}}
				onChange={(invertedValue) => {
					setQueryAttribute({ hideOnSaleProducts: !invertedValue });
				}}
			/>

			{/* Hide Free Products */}
			<Toggle
				label={__('Hide Free Products', 'woo-product-slider-pro')}
				attributes={query?.hideFreeProducts || false}
				attributesKey="tempHideFree"
				setAttributes={() => {}}
				onChange={(invertedValue) => {
					setQueryAttribute({ hideFreeProducts: !invertedValue });
				}}
			/>

			{/* Products without Thumb */}
			<Toggle
				label={__('Products without Thumb', 'woo-product-slider-pro')}
				attributes={query?.productsWithoutThumb || false}
				attributesKey="tempWithoutThumb"
				setAttributes={() => {}}
				onChange={(invertedValue) => {
					setQueryAttribute({ productsWithoutThumb: !invertedValue });
				}}
			/>

			{/* Show Hidden Products */}
			<Toggle
				label={__('Show Hidden Products', 'woo-product-slider-pro')}
				attributes={query?.showHiddenProducts || false}
				attributesKey="tempShowHidden"
				setAttributes={() => {}}
				onChange={(invertedValue) => {
					setQueryAttribute({ showHiddenProducts: !invertedValue });
				}}
			/>
		</>
	);
};

// Main Query Builder Tab Component
const QueryBuilderTab = ({ attributes, setAttributes }) => {
	const { query = {} } = attributes || {};
	const offsetValue = query?.offset || 0;
	const setQueryAttribute = createSetQueryAttribute(attributes, setAttributes);

	// Custom panel structure with Common Filtering and Advanced Filtering panels
	return (
		<>
			{/* Query Builder Section */}
			<QueryBuilderSubtab attributes={attributes} setAttributes={setAttributes} />

			{/* Common Filtering Panel */}
			<PanelBody className="spssp-child-panel-body" title={__('Common Filtering', 'woo-product-slider-pro')} initialOpen={false}>
				<CommonFilteringSubtab attributes={attributes} setAttributes={setAttributes} />
			</PanelBody>

			{/* Advanced Filtering Panel */}
			<PanelBody className="spssp-child-panel-body" title={__('Advanced Filtering', 'woo-product-slider-pro')} initialOpen={false}>
				<AdvancedFilteringTab attributes={attributes} setAttributes={setAttributes} />
			</PanelBody>
<Divider/>
			{/* Offset Products */}
			<SPRangeControl
				label={__('Offset Products', 'woo-product-slider-pro')}
				attributes={offsetValue}
				attributesKey="tempOffset"
				setAttributes={() => {}}
				onValueChange={({ value }) => {
					setQueryAttribute({ offset: value });
				}}
				min={0}
				max={100}
				defaultValue={0}
				resetIcon={true}
				units={false}
			/>

			{/* No Result Found Label */}
			<InputControl
				label={__('No Result Found Label', 'woo-product-slider-pro')}
				placeholder={__('No Products Found', 'woo-product-slider-pro')}
				attributes={query?.noResultFoundLabel || ''}
				attributesKey="tempNoResultLabel"
				setAttributes={() => {}}
				onChange={(value) => {
					setQueryAttribute({ noResultFoundLabel: value });
				}}
				flex={false}
				inputType="string"
			/>
		</>
	);
};

export default QueryBuilderTab;
