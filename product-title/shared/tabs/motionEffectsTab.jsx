/**
 * Motion Effects Tab Component
 * 
 * Tab for animation and transition effects
 */

import { __ } from '@wordpress/i18n';
import {
	ToggleControl,
	SelectControl,
	RangeControl,
	PanelBody,
} from '@wordpress/components';

const MotionEffectsTab = ({ attributes, setAttributes }) => {
	const motionEffects = attributes.motionEffects || {};

	const updateMotionEffects = (updates) => {
		setAttributes({
			motionEffects: {
				...motionEffects,
				...updates,
			},
		});
	};

	return (
		<>
			<PanelBody title={__('Animation Settings', 'woo-product-slider-pro')} initialOpen={true}>
				<ToggleControl
					label={__('Enable Animation', 'woo-product-slider-pro')}
					checked={motionEffects.enableAnimation || false}
					onChange={(value) => updateMotionEffects({ enableAnimation: value })}
				/>

				{motionEffects.enableAnimation && (
					<>
						<SelectControl
							label={__('Animation Type', 'woo-product-slider-pro')}
							value={motionEffects.animationType || 'fade'}
							options={[
								{ label: __('Fade', 'woo-product-slider-pro'), value: 'fade' },
								{ label: __('Slide', 'woo-product-slider-pro'), value: 'slide' },
								{ label: __('Zoom', 'woo-product-slider-pro'), value: 'zoom' },
								{ label: __('Flip', 'woo-product-slider-pro'), value: 'flip' },
								{ label: __('None', 'woo-product-slider-pro'), value: 'none' },
							]}
							onChange={(value) => updateMotionEffects({ animationType: value })}
						/>

						<RangeControl
							__next40pxDefaultSize
							label={__('Animation Duration (ms)', 'woo-product-slider-pro')}
							value={motionEffects.animationDuration || 500}
							onChange={(value) => updateMotionEffects({ animationDuration: value || 500 })}
							min={100}
							max={2000}
							step={50}
						/>

						<RangeControl
							__next40pxDefaultSize
							label={__('Animation Delay (ms)', 'woo-product-slider-pro')}
							value={motionEffects.animationDelay || 0}
							onChange={(value) => updateMotionEffects({ animationDelay: value || 0 })}
							min={0}
							max={1000}
							step={50}
						/>

						<ToggleControl
							label={__('Stagger Animation', 'woo-product-slider-pro')}
							checked={motionEffects.staggerAnimation || false}
							onChange={(value) => updateMotionEffects({ staggerAnimation: value })}
						/>

						{motionEffects.staggerAnimation && (
							<RangeControl
								__next40pxDefaultSize
								label={__('Stagger Delay (ms)', 'woo-product-slider-pro')}
								value={motionEffects.staggerDelay || 100}
								onChange={(value) => updateMotionEffects({ staggerDelay: value || 100 })}
								min={0}
								max={500}
								step={25}
							/>
						)}
					</>
				)}
			</PanelBody>

			<PanelBody title={__('Hover Effects', 'woo-product-slider-pro')} initialOpen={false}>
				<SelectControl
					label={__('Hover Effect', 'woo-product-slider-pro')}
					value={motionEffects.hoverEffect || 'none'}
					options={[
						{ label: __('None', 'woo-product-slider-pro'), value: 'none' },
						{ label: __('Scale', 'woo-product-slider-pro'), value: 'scale' },
						{ label: __('Lift', 'woo-product-slider-pro'), value: 'lift' },
						{ label: __('Shadow', 'woo-product-slider-pro'), value: 'shadow' },
						{ label: __('Glow', 'woo-product-slider-pro'), value: 'glow' },
					]}
					onChange={(value) => updateMotionEffects({ hoverEffect: value })}
				/>

				{motionEffects.hoverEffect && motionEffects.hoverEffect !== 'none' && (
					<RangeControl
						__next40pxDefaultSize
						label={__('Hover Transition (ms)', 'woo-product-slider-pro')}
						value={motionEffects.hoverTransition || 300}
						onChange={(value) => updateMotionEffects({ hoverTransition: value || 300 })}
						min={100}
						max={1000}
						step={50}
					/>
				)}
			</PanelBody>
		</>
	);
};

export default MotionEffectsTab;
