/**
 * Product Title Block Editor Component
 *
 * Based on WooCommerce's product-title edit component
 */

import { __ } from "@wordpress/i18n";
import { Disabled, PanelBody, ToggleControl } from "@wordpress/components";
import {
  InspectorControls,
  BlockControls,
  AlignmentToolbar,
  useBlockProps,
} from "@wordpress/block-editor";
import Block from "./block.jsx";
import { useProduct } from "../../shared/useProduct.js";
import HeadingLevelSelector from "../../../components/headingLevelSelector/index.jsx";
import ProductTitleInspectorControls from "./edit/inspectorControls.jsx";
import { useEffect, useMemo } from "@wordpress/element";
import dynamicCss3 from "./dynamicCss.js";

export default function Edit({ attributes, setAttributes, context }) {
  // Get the attributes
  const {
    showProductLink = true,
    align,
    linkTarget,
    sectionHeadingHTMLTag='h2',
	  queryId,
    layoutOptions={},
  } = attributes;



// Generate a random queryId if one isn't provided
  useEffect(() => {
    if (!attributes.queryId) {
        setAttributes({ queryId: Math.random().toString(36).substr(2, 9) });
    }
}, []);

  // console.log("Query ID",attributes.queryId);

  // Get the block props
  const blockProps = useBlockProps({
    className: align ? `has-text-align-${align}` : "",
  });

  // Use WooCommerce-style product fetching
  const { product: productData, isResolving } = useProduct(context?.postId);

  // Transform product data to match our format
  const product = productData
    ? {
        id: productData.id,
        name: productData.name || productData.title?.rendered || "",
        permalink: productData.permalink || productData.link || "",
      }
    : null;

  // Get the toolbar level
  const toolbarLevel = sectionHeadingHTMLTag.startsWith("h")
    ? parseInt(sectionHeadingHTMLTag.replace("h", ""))
    : 0;
    
	// Generate Dynamic Css using memo 
	const dynamicStyles = useMemo(() => {
		return dynamicCss3(attributes, attributes.queryId);
	}, [attributes, attributes.queryId]);

  return (
    <div id={attributes.queryId}>
      <BlockControls>
        <HeadingLevelSelector
          value={toolbarLevel}
          onChange={(newLevel) => {
            const newTag = newLevel === 0 ? "p" : `h${newLevel}`;
            setAttributes({ sectionHeadingHTMLTag: newTag });
          }}
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
      <div {...blockProps}>
		<style>{dynamicStyles}</style>
        <Disabled>
          <Block
            {...attributes}
            isAdmin={true}
            product={product}
            blockProps={blockProps}
          />
        </Disabled>
      </div>
    </div>
  );
}
