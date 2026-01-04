/**
 * Product Grid Inspector Controls
 * 
 * Using InspectorControl wrapper from smart_store components
 */

import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { InspectorControl } from '@woo-product-slider-pro/components';
import { AdvanceTab } from '../shared/tabs/index.js';

const Inspector = ({ attributes, setAttributes }) => {
	return (
		<>
			<PanelBody title={__('General', 'woo-product-slider-pro')} initialOpen={true}>
				<AdvanceTab attributes={attributes} setAttributes={setAttributes} />
			</PanelBody>
		</>
	);
};

const ProductTitleInspectorControls = ({
	attributes,
	setAttributes,
}) => {
	return (
		<InspectorControl
			Inspector={Inspector}
			attributes={attributes}
			setAttributes={setAttributes}
		/>
	);
};

export default ProductTitleInspectorControls;
