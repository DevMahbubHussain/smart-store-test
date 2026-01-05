/**
 * Product Title Block Editor Component
 * 
 * Based on WooCommerce's product-title edit component
 */

import { __ } from '@wordpress/i18n';
import { Disabled, PanelBody, ToggleControl } from '@wordpress/components';
import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	useBlockProps,
} from '@wordpress/block-editor';
import Block from './block.jsx';
import { useProduct } from '../../shared/useProduct.js';
import HeadingLevelSelector from '../../../components/headingLevelSelector/index.jsx';
import ProductTitleInspectorControls from './edit/inspectorControls.jsx';

export default function Edit({ attributes, setAttributes, context }) {
	// productTitleHtmlTag="h2",
	const { productTitleHtmlTag } = attributes||'h2';
	const{productTitleAlignment} = attributes||'left';
	// console.log("productTitleHtmlTag State Change from Edit", productTitleHtmlTag);
	// console.log("productTitleAlignment State Change from Edit", productTitleAlignment);
	const blockProps = useBlockProps();
	const { headingLevel = 2, showProductLink = true, align, linkTarget } = attributes;
	
	// Use WooCommerce-style product fetching
	const { product: productData, isResolving } = useProduct(context?.postId);
	
	// Transform product data to match our format
	const product = productData ? {
		id: productData.id,
		name: productData.name || productData.title?.rendered || '',
		permalink: productData.permalink || productData.link || '',
	} : null;

	return (
		<div {...blockProps}>
			<BlockControls>
				<HeadingLevelSelector
					value={headingLevel}
					onChange={(newLevel) => setAttributes({ headingLevel: newLevel })}
				/>
				<AlignmentToolbar
					value={align}
					onChange={(newAlign) => {
						setAttributes({ align: newAlign || undefined });
					}}
				/>
			</BlockControls>
			<InspectorControls>
                 <ProductTitleInspectorControls
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
			</InspectorControls>
			<Disabled>
				<Block
					{...attributes}
					isAdmin={true}
					product={product}
				/>
			</Disabled>
		</div>
	);
}
