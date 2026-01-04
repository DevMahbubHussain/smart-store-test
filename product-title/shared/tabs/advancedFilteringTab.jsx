/**
 * Advanced Filtering Tab Component
 * 
 * Filter by Categories, Tags, Brands, Attributes, Price Range, SKUs
 * Matching smart-post-show-pro design
 */

import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { MultipleSelect, InputControl } from '@woo-product-slider-pro/components';

const AdvancedFilteringTab = ({ attributes, setAttributes }) => {
	const { query = {} } = attributes || {};

	// Get WooCommerce categories
	const categories = useSelect(
		(select) => {
			return select(coreStore).getEntityRecords('taxonomy', 'product_cat', {
				per_page: -1,
			});
		},
		[]
	);

	// Get WooCommerce tags
	const tags = useSelect(
		(select) => {
			return select(coreStore).getEntityRecords('taxonomy', 'product_tag', {
				per_page: -1,
			});
		},
		[]
	);

	// Get product attributes (pa_* taxonomies)
	const attributesTax = useSelect(
		(select) => {
			const allTaxonomies = select(coreStore).getTaxonomies({ per_page: -1 });
			if (!allTaxonomies) return [];
			// Filter for product attributes (pa_*)
			return allTaxonomies.filter((tax) => tax.slug?.startsWith('pa_'));
		},
		[]
	);

	// Get attribute terms (for a specific attribute)
	// For now, we'll get all attribute terms
	const attributeTerms = useSelect(
		(select) => {
			if (!attributesTax || attributesTax.length === 0) return [];
			// Get terms from first attribute taxonomy as example
			const firstAttr = attributesTax[0];
			if (!firstAttr) return [];
			return select(coreStore).getEntityRecords('taxonomy', firstAttr.slug, {
				per_page: -1,
			});
		},
		[attributesTax]
	);

	// Get brands (assuming it's a custom taxonomy)
	const brands = useSelect(
		(select) => {
			return select(coreStore).getEntityRecords('taxonomy', 'product_brand', {
				per_page: -1,
			});
		},
		[]
	);

	// Convert to options format for MultipleSelect
	const categoryOptions = Array.isArray(categories)
		? categories.map((cat) => ({
				label: cat.name,
				value: cat.id,
			}))
		: [];

	const tagOptions = Array.isArray(tags)
		? tags.map((tag) => ({
				label: tag.name,
				value: tag.id,
			}))
		: [];

	const brandOptions = Array.isArray(brands)
		? brands.map((brand) => ({
				label: brand.name,
				value: brand.id,
			}))
		: [];

	const attributeOptions = Array.isArray(attributeTerms)
		? attributeTerms.map((term) => ({
				label: term.name,
				value: term.id,
			}))
		: [];

	// Get SKUs - this would need to fetch products and extract SKUs
	// For now, we'll use a simple array structure
	const skuOptions = [];

	return (
		<>
			{/* Filter by Categories */}
			<MultipleSelect
				label={__('Filter by Categories', 'woo-product-slider-pro')}
				attributes={query?.filterByCategories || []}
				attributesKey="tempCategories"
				setAttributes={() => {}}
				onChange={(selectedOptions) => {
					const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
					setAttributes({
						query: {
							...query,
							filterByCategories: values,
						},
					});
				}}
				items={categoryOptions}
			/>

			{/* Filter by Tags */}
			<MultipleSelect
				label={__('Filter by Tags', 'woo-product-slider-pro')}
				attributes={query?.filterByTags || []}
				attributesKey="tempTags"
				setAttributes={() => {}}
				onChange={(selectedOptions) => {
					const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
					setAttributes({
						query: {
							...query,
							filterByTags: values,
						},
					});
				}}
				items={tagOptions}
			/>

			{/* Filter by Brands */}
			<MultipleSelect
				label={__('Filter by Brands', 'woo-product-slider-pro')}
				attributes={query?.filterByBrands || []}
				attributesKey="tempBrands"
				setAttributes={() => {}}
				onChange={(selectedOptions) => {
					const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
					setAttributes({
						query: {
							...query,
							filterByBrands: values,
						},
					});
				}}
				items={brandOptions}
			/>

			{/* Filter by Attributes */}
			<MultipleSelect
				label={__('Filter by Attributes', 'woo-product-slider-pro')}
				attributes={query?.filterByAttributes || []}
				attributesKey="tempAttributes"
				setAttributes={() => {}}
				onChange={(selectedOptions) => {
					const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
					setAttributes({
						query: {
							...query,
							filterByAttributes: values,
						},
					});
				}}
				items={attributeOptions}
			/>

			{/* Filter by Price Range */}
			<InputControl
				label={__('Min price', 'woo-product-slider-pro')}
				placeholder={__('Min price', 'woo-product-slider-pro')}
				attributes={query?.priceRange?.min || ''}
				attributesKey="tempMinPrice"
				setAttributes={() => {}}
				onChange={(value) => {
					setAttributes({
						query: {
							...query,
							priceRange: {
								...query.priceRange,
								min: value ? parseFloat(value) : undefined,
							},
						},
					});
				}}
				flex={false}
				inputType="number"
				min={0}
			/>
			<InputControl
				label={__('Max price', 'woo-product-slider-pro')}
				placeholder={__('Max price', 'woo-product-slider-pro')}
				attributes={query?.priceRange?.max || ''}
				attributesKey="tempMaxPrice"
				setAttributes={() => {}}
				onChange={(value) => {
					setAttributes({
						query: {
							...query,
							priceRange: {
								...query.priceRange,
								max: value ? parseFloat(value) : undefined,
							},
						},
					});
				}}
				flex={false}
				inputType="number"
				min={0}
			/>

			{/* Filter by SKUs */}
			<MultipleSelect
				label={__('Filter by SKUs', 'woo-product-slider-pro')}
				attributes={query?.filterBySKUs || []}
				attributesKey="tempSKUs"
				setAttributes={() => {}}
				onChange={(selectedOptions) => {
					const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
					setAttributes({
						query: {
							...query,
							filterBySKUs: values,
						},
					});
				}}
				items={skuOptions}
			/>
		</>
	);
};

export default AdvancedFilteringTab;
