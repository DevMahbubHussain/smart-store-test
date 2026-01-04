/**
 * Product Title Block Registration
 * 
 * Based on WooCommerce's product-title block registration
 */

import { registerBlockType } from '@wordpress/blocks';
import { BLOCK_ICON } from './constants.jsx';
import edit from './edit.jsx';
import { Save } from './save.jsx';
import metadata from './block.json';

registerBlockType(metadata.name, {
	...metadata,
	apiVersion: 3,
	icon: {
		src: BLOCK_ICON,
	},
	edit,
	save: Save,
});
