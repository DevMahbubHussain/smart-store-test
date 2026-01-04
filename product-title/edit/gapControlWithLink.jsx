/**
 * Gap Control with Linking Toggle
 *
 */

import { SPRangeControl } from '@woo-product-slider-pro/components';
import { LinkedIcon } from '../../../../icons/icons';
import Responsive from '@woo-product-slider-pro/components/responsive/responsive';

const GapControlWithLink = ({
	label,
	attributes,
	attributesKey,
	setAttributes,
	linkEnabled,
	onLinkToggle,
	min = 0,
	max = 100,
	units = ['px'],
	defaultValue,
}) => {
	return (
		<div className="spssp-component-mb">
			<div className="spssp-header-control">
				<div className="spssp-header-control-left">
					<span className="spssp-component-title">{label}</span>
					<Responsive />
				</div>
				<div className="spssp-header-control-right">
					<div
						className={`sp-link-btn${linkEnabled ? " active" : ""}`}
						onClick={onLinkToggle}
						style={{ cursor: 'pointer' }}
					>
						<span className="sp-link-side-icon">
							<LinkedIcon />
						</span>
					</div>
				</div>
			</div>
			<div className="gap-control-range-wrapper">
				<style>{`
					.gap-control-range-wrapper .spssp-range-control .spssp-header-control {
						display: none;
					}
				`}</style>
				<SPRangeControl
					attributes={attributes}
					attributesKey={attributesKey}
					setAttributes={() => {}}
					onValueChange={({ value, deviceType }) => {
						if (linkEnabled) {
							// If linked, set all devices to the same value
							setAttributes({
								device: {
									Desktop: value,
									Tablet: value,
									Mobile: value,
								},
								unit: attributes.unit,
							});
						} else {
							// If not linked, update only the current device
							setAttributes({
								device: {
									...attributes.device,
									[deviceType]: value,
								},
								unit: attributes.unit,
							});
						}
					}}
					onUnitChange={({ unit, deviceType }) => {
						setAttributes({
							device: attributes.device,
							unit: {
								...attributes.unit,
								[deviceType]: unit,
							},
						});
					}}
					label=""
					min={min}
					max={max}
					units={units}
					defaultValue={defaultValue}
					resetIcon={true}
				/>
			</div>
		</div>
	);
};

export default GapControlWithLink;
