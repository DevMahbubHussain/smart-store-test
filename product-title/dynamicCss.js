export default function dynamicCss3(attributes, queryId) {
  const {
    advancedStyle = {},
    sectionHeadingHTMLTag,
    layoutOptions,
  } = attributes;
  // Deep destructuring with fallbacks
  const {
    typography = {},
    border = {},
    shadow = {},
    spacing = {},
  } = advancedStyle;

  // Selector
  const selector = `.spssp-instance-${queryId}`;
  return `
         ${selector} .wpsp-product-title{
           text-align: ${layoutOptions.alignment || "left"};
           margin:${spacing.margin || "0px"};
           padding:${spacing.padding || "0px"};
         }
            ${selector} .wpsp-product-title,
            ${selector} .wpsp-product-title a{
              color: ${typography.color || "#333333"};
              font-size: ${typography.fontSize || "18px"};
              font-weight: ${typography.fontWeight || "600"};
              text-decoration: "none";
              transition: all 0.3s ease-in-out;
            }
              ${selector} .wpsp-product-title a:hover {
               color: ${typography.hoverColor || "#333333"};
             }
       `;

  // Helper to safely format shadow strings
  //   const formatShadow = (shd) => {
  //     if (!shd) return "none";
  //     return `${shd.hOffset || 0}px ${shd.vOffset || 0}px ${shd.blur || 0}px ${
  //       shd.spread || 0
  //     }px ${shd.color || "transparent"}`;
  //   };

  //   const selector = `.spssp-product-grid-${queryId} .wpsp-product-title`;

  //   // REMOVED the semicolon after return
  //   return `
  //         ${selector}
  //         {
  //             /* Typography - Matching block.json keys */
  //             color: ${typography.color || "inherit"};
  //             font-size: ${typography.fontSize || "inherit"};
  //             font-weight: ${typography.fontWeight || "inherit"};
  //             text-transform: ${typography.textTransform || "inherit"};

  //             /* Spacing */
  //             margin: ${spacing.margin || "0px"};
  //             padding: ${spacing.padding || "0px"};

  //             /* Border */
  //             border-style: ${border.style || "none"};
  //             border-width: ${border.width || "0px"};
  //             border-color: ${border.color || "transparent"};
  //             border-radius: ${border.radius || "0px"};

  //             /* Shadow */
  //             box-shadow: ${formatShadow(shadow)};
  //             transition: all 0.3s ease-in-out;
  //         }

  //         ${selector}:hover {
  //             color: ${typography.hoverColor || "inherit"};
  //             box-shadow: ${formatShadow(shadow.hover)};
  //         }

  //         ${selector}:active {
  //             box-shadow: ${formatShadow(shadow.active)};
  //         },
  //         ${selector} a {
  //         color: ${typography.color || "inherit"};
  //         font-size: ${typography.fontSize || "inherit"};
  //         transition: all 0.3s ease;
  //     }
  //     `;
}
