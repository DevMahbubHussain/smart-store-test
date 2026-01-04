/**
 * Advance Tab Component
 *
 * Tab for advanced styling and settings with three sub-tabs: General, Responsive, Advanced
 */

import { __ } from "@wordpress/i18n";
import {
  ToggleControl,
  TextControl,
  PanelRow,
  FontSizePicker,
  RangeControl,
  GradientPicker,
} from "@wordpress/components";
import TabControls from "@woo-product-slider-pro/components/tabControls/tabControls";
import {
  Background,
  Border,
  BoxShadow,
  Spacing,
  SPToggleGroupControl,
  Toggle,
  TypographyNew,
  SpColorPicker,
  ButtonSet,
} from "@woo-product-slider-pro/components";
import { ColorPalette } from "@wordpress/components";
import { AlignCenter, AlignLeft, AlignRight } from "../../icons";

// General Sub-tab
const GeneralSubtab = ({ attributes, setAttributes }) => {
  const sectionHeadingHTMLTag = attributes.sectionHeadingHTMLTag || "h2";
  const layoutOptions = attributes.layoutOptions || {};
  const advancedStyle = attributes.advancedStyle || {};
  const showProductLink = attributes.showProductLink || false;
  const linkTarget = attributes.linkTarget || "";

  // console.log("open in new tab", linkTarget);

  const typography = advancedStyle.typography || {};
  const shadow = advancedStyle.shadow || {};

  // Helper function for deep updates
  const updateTypography = (updates) => {
    setAttributes({
      advancedStyle: {
        ...advancedStyle,
        typography: {
          ...typography,
          ...updates,
        },
      },
    });
  };

  const updateLayout = (newValue) => {
    setAttributes({
      layoutOptions: {
        ...layoutOptions, // Keep existing settings (like alignment)
        titleLength: newValue, // Update only the length
      },
    });
  };

  return (
    <>
      <SPToggleGroupControl
        label={__("HTML Tag", "smart-post-show-pro")}
        attributes={sectionHeadingHTMLTag}
        attributesKey={"sectionHeadingHTMLTag"}
        setAttributes={setAttributes}
        items={[
          { label: "H1", value: "h1" },
          { label: "H2", value: "h2" },
          { label: "H3", value: "h3" },
          { label: "H4", value: "h4" },
          { label: "H5", value: "h5" },
          { label: "H6", value: "h6" },
          { label: "P", value: "p" },
        ]}
      />
      <SPToggleGroupControl
        label={__("Title Length", "woo-product-slider-pro")}
        items={[
          { label: "Full", value: "full" },
          { label: "Limited", value: "limited" },
        ]}
        attributes={layoutOptions.titleLength}
        attributesKey={"titleLength"}
        setAttributes={(updatedObject) => {
          setAttributes({
            layoutOptions: {
              ...layoutOptions,
              ...updatedObject,
            },
          });
        }}
      />
      {layoutOptions.titleLength === "limited" && (
        <RangeControl
          label={__("Title Limit", "woo-product-slider-pro")}
          help={__("Title Limit", "woo-product-slider-pro")}
          value={layoutOptions.limitCount}
          min={0}
          max={100}
          onChange={(value) =>
            setAttributes({
              layoutOptions: {
                ...layoutOptions,
                limitCount: value,
              },
            })
          }
        />
      )}
      <SPToggleGroupControl
        attributes={layoutOptions.alignment}
        attributesKey={"alignment"}
        label={__("Alignment", "woo-product-slider-pro")}
        items={[
          { label: <AlignLeft />, value: "left" },
          { label: <AlignCenter />, value: "center" },
          { label: <AlignRight />, value: "right" },
        ]}
        setAttributes={(updatedObject) => {
          setAttributes({
            layoutOptions: {
              ...layoutOptions,
              ...updatedObject,
            },
          });
        }}
      />
      {/* Make title a link */}
      <Toggle
        label={__("Make Title a Link", "woo-product-slider-pro")}
        checked={showProductLink}
        attributes={showProductLink}
        attributesKey={"showProductLink"}
        onChange={() =>
          setAttributes({
            showProductLink: !showProductLink,
          })
        }
      />
      {/* link opne in New Link */}
      {showProductLink && (
        <Toggle
          label={__("Open Link in New Tab", "woo-product-slider-pro")}
          checked={linkTarget}
          attributes={linkTarget}
          attributesKey={"linkTarget"}
          onChange={() =>
            setAttributes({
              linkTarget: !linkTarget,
            })
          }
        />
      )}
    </>
  );
};

// Responsive Sub-tab
const StyleTab = ({ attributes, setAttributes }) => {
  //Attributes for deep updates
  const {
    productTitleTypography = {},
    productTitleFontsize = {},
    productTitleGlobalTypo = {},
    productTitleLineHeight = {},
    productTitleFontSpacing = {},
    productTitleWordSpacing = {},
    productTitleMargin = {},
    productTitlePadding = {},
    productUnderline = true,
    productTitleState = "normal",
    productTitleColorType = "solid",
    productTitleColor = {},
    productTitleGradient = {},
  } = attributes;

  console.log("Check Underline State", productUnderline);

  return (
    <>
      <Toggle
        label={__("Underline on Hover", "smart-post-show-pro")}
        checked={productUnderline}
        attributes={productUnderline}
        attributesKey={"productUnderline"}
        onChange={() =>
          setAttributes({
            productUnderline: !productUnderline,
          })
        }
      />

      <div className="sp-style-panel">
        {/* State Switcher */}
        <ButtonSet
          attributes={productTitleState}
          attributesKey="productTitleState"
          setAttributes={setAttributes}
          columns={2}
          items={[
            { label: "Normal", value: "normal" },
            { label: "Hover", value: "hover" },
          ]}
        />

        {/* Color Type Switcher */}
        <ButtonSet
          label={__("Color Type", "text-domain")}
          attributes={productTitleColorType}
          attributesKey="productTitleColorType"
          setAttributes={setAttributes}
          columns={2}
          items={[
            { label: "Solid", value: "solid" },
            { label: "Gradient", value: "gradient" },
          ]}
        />

        {/* Conditional Rendering of Pickers */}
        {productTitleColorType === "solid" ? (
          <SpColorPicker
            label={
              productTitleState === "normal"
                ? "Solid Color"
                : "Hover Solid Color"
            }
            value={
              productTitleState === "normal"
                ? productTitleColor.color
                : productTitleColor.hover
            }
            onChange={(newColor) => {
              setAttributes({
                productTitleColor: {
                  ...productTitleColor,
                  [productTitleState === "normal" ? "color" : "hover"]:
                    newColor,
                },
              });
            }}
          />
        ) : (
          <div className="sp-gradient-wrapper">
            <p className="sp-label">
              {productTitleState === "normal"
                ? "Normal Gradient"
                : "Hover Gradient"}
            </p>
            <GradientPicker
              key={`gradient-picker-${productTitleState}`}
              value={
                productTitleState === "normal"
                  ? productTitleGradient?.normal || ""
                  : productTitleGradient?.hover || ""
              }
              onChange={(newGradient) => {
                setAttributes({
                  productTitleGradient: {
                    ...(productTitleGradient || { normal: "", hover: "" }),
                    [productTitleState === "normal" ? "normal" : "hover"]:
                      newGradient,
                  },
                });
              }}
              gradients={[
                {
                  name: "Vivid Cyan Blue",
                  gradient:
                    "linear-gradient(135deg,rgba(6,147,227,1) 0%,rgb(155,81,224) 100%)",
                  slug: "vivid-cyan-blue",
                },
                {
                  name: "Light Green Cyan",
                  gradient:
                    "linear-gradient(135deg,rgb(122,220,180) 0%,rgb(0,208,130) 100%)",
                  slug: "light-green-cyan",
                },
              ]}
            />
          </div>
        )}
      </div>

      {/* {
        productUnderline && (
         <SPToggleGroupControl
            label={__("Underline Style", "smart-post-show-pro")}
            items={[
               { label: "Normal", value: "normal" },
               { label: "Hover", value: "Hover" },
            ]}
            attributes={productUnderline}
            attributesKey={"productUnderline"}
            setAttributes={setAttributes}
         />
            
        )
      } */}
      {/* <SpColorPicker
        label={__("Product Title Color", "smart-post-show-pro")}
        value={productTitleColor.color}
        onChange={(newColor) =>
          setAttributes({
            productTitleColor: {
              ...productTitleColor,
              color: newColor,
            },
          })
        }
        defaultColor="#2271B1"
      /> */}

      <Spacing
        label={__("Padding", "smart-post-show-pro")}
        attributes={productTitlePadding}
        attributesKey={"productTitlePadding"}
        setAttributes={setAttributes}
        units={["px", "%", "em"]}
        labelItem={{
          top: __("Top", "smart-post-show-pro"),
          right: __("Right", "smart-post-show-pro"),
          bottom: __("Bottom", "smart-post-show-pro"),
          left: __("Left", "smart-post-show-pro"),
        }}
        defaultValue={{
          unit: "px",
          value: {
            top: "",
            right: "",
            bottom: "",
            left: "",
          },
        }}
      />
      <Spacing
        label={__("Margin", "smart-post-show-pro")}
        attributes={productTitleMargin}
        attributesKey={"productTitleMargin"}
        setAttributes={setAttributes}
        units={["px", "%", "em"]}
        labelItem={{
          top: __("Top", "smart-post-show-pro"),
          right: __("Right", "smart-post-show-pro"),
          bottom: __("Bottom", "smart-post-show-pro"),
          left: __("Left", "smart-post-show-pro"),
        }}
        defaultValue={{
          unit: "px",
          value: {
            top: "",
            right: "",
            bottom: "",
            left: "",
          },
        }}
      />
      {/* <TypographyNew
        attributes={{
          family: productTitleTypography,
          familyKey: "productTitleTypography",
          fontSize: productTitleFontsize,
          fontSizeKey: "productTitleFontsize",
          fontSpacing: productTitleFontSpacing,
          fontSpacingKey: "productTitleFontSpacing",
          lineHeight: productTitleLineHeight,
          lineHeightKey: "productTitleLineHeight",
          wordSpacing: productTitleWordSpacing,
          wordSpacingKey: "productTitleWordSpacing",
          globalTypo: productTitleGlobalTypo,
          globalTypoKey: "productTitleGlobalTypo",
        }}
        setAttributes={setAttributes}
        spacingDefaultValue={{ unit: "px", value: 0 }}
        fontSizeDefault={{ unit: "px", value: 32 }}
        lineDefaultValue={1.2}
        fontSizePresetType="heading"
      /> */}
      <p>Style Tab</p>

      {/* <ToggleControl
        label={__("Hide on Desktop", "woo-product-slider-pro")}
        checked={advancedOptions.hideOnDesktop || false}
        onChange={(value) => updateAdvancedOptions({ hideOnDesktop: value })}
        help={__(
          "Hide this block on desktop devices",
          "woo-product-slider-pro"
        )}
      />

      <ToggleControl
        label={__("Hide on Tablet", "woo-product-slider-pro")}
        checked={advancedOptions.hideOnTablet || false}
        onChange={(value) => updateAdvancedOptions({ hideOnTablet: value })}
        help={__("Hide this block on tablet devices", "woo-product-slider-pro")}
      />

      <ToggleControl
        label={__("Hide on Mobile", "woo-product-slider-pro")}
        checked={advancedOptions.hideOnMobile || false}
        onChange={(value) => updateAdvancedOptions({ hideOnMobile: value })}
        help={__("Hide this block on mobile devices", "woo-product-slider-pro")}
      /> */}
    </>
  );
};

// Advanced Sub-tab

// Main Advance Tab Component
const AdvanceTab = ({ attributes, setAttributes }) => {
  return (
    <TabControls
      attributes={attributes}
      setAttributes={setAttributes}
      displayIcon={true}
      GeneralTab={GeneralSubtab}
      StyleTab={StyleTab}
      initialTab="general"
      styleTabTitle={__("Style", "woo-product-slider-pro")}
      advancedTabTitle={__("General", "woo-product-slider-pro")}
    />
  );
};

export default AdvanceTab;
