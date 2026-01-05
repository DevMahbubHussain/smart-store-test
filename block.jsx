/**
 * Product Title Block Component
 * 
 * Based on WooCommerce's product-title block architecture
 */

import { useBlockProps } from '@wordpress/block-editor';
import { useProductDataContext } from '../../shared/productContext.jsx';
import { withProductDataContext } from '../../shared/withProductDataContext.jsx';

const TagName = ({
	children,
	headingLevel = 2,
	...props
}) => {
	const ElementType = `h${headingLevel}`;
	return <ElementType {...props}>{children}</ElementType>;
};

export const Block = (props) => {
	const {
		className,
		headingLevel = 2,
		showProductLink = true,
		linkTarget,
		align,
		isAdmin,
		product: productProp,
	} = props;



	const { product, isLoading } = useProductDataContext();
	const blockProps = useBlockProps({
		className: `wpsp-block-components-product-title ${className || ''} ${
			align ? `wpsp-block-components-product-title--align-${align}` : ''
		}`,
	});

	// Use product from context or prop
	const currentProduct = productProp || product;

	if (!currentProduct?.id && !isAdmin) {
		return (
			<div {...blockProps}>
				<TagName  className="wpsp-product-title">
					{isLoading ? 'Loading...' : ''}
				</TagName>
			</div>
		);
	}

	const title = currentProduct?.name || '';
	const permalink = currentProduct?.permalink || '';

	const titleContent = showProductLink && permalink ? (
		<a
			href={permalink}
			className="wpsp-product-title-link"
			target={linkTarget}
			rel={linkTarget === '_blank' ? 'noopener noreferrer' : undefined}
		>
			{title}
		</a>
	) : (
		title
	);

	return (
		<div {...blockProps}>
			<TagName headingLevel={headingLevel} className="wpsp-product-title">
				{titleContent}
			</TagName>
		</div>
	);
};

export default withProductDataContext(Block);
