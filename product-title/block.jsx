/**
 * Product Title Block Component
 *
 * Based on WooCommerce's product-title block architecture
 */

import { useBlockProps } from "@wordpress/block-editor";
import { useProductDataContext } from "../../shared/productContext.jsx";
import { withProductDataContext } from "../../shared/withProductDataContext.jsx";

export const Block = (props) => {
  const {
    className,
    headingLevel = 2,
    showProductLink = true,
    linkTarget,
    align,
    isAdmin,
    product: productProp,
    blockProps,
    sectionHeadingHTMLTag = "h2",
    titleColor = "#000000",
    titleFontSize = "16px",
    queryId,
    layoutOptions={},
  } = props;

  const { titleLength = 'full', limitCount = 20, alignment } = layoutOptions;

  const { product, isLoading } = useProductDataContext();
  const currentProduct = productProp || product;

  const TagName = sectionHeadingHTMLTag; // "h1", "h2", or "p"
  const titleStyle = { color: titleColor, fontSize: titleFontSize ? `${titleFontSize}` : undefined };
  // console.log("Title Font Size",titleStyle.fontSize);

  let displayTitle =
    currentProduct?.name ||
    (isAdmin ? __("Product Title", "woo-product-slider-pro") : "");
  const permalink = currentProduct?.permalink || "";

  //displayTitle
if (titleLength === 'limited' && displayTitle.length > limitCount) {
        displayTitle = displayTitle.substring(0, limitCount) + '...';
    }

  const titleContent =
    showProductLink && permalink ? (
      <a	
        href={permalink}
        className="wpsp-product-title-link"
        target={linkTarget ? "_blank" : "_self"}
        rel={linkTarget ? "noopener noreferrer" : undefined}
        onClick={(e) => e.preventDefault()}
        
      >
        {displayTitle}
      </a>
    ) : (
      displayTitle
    );
    
return (
    <div {...blockProps} className={`spssp-instance-${props.queryId}`}>
        <TagName className={`wpsp-product-title align-${alignment}`}>
            {isLoading && !currentProduct ? "Loading..." : titleContent}
        </TagName>
    </div>
);
};

export default withProductDataContext(Block);
