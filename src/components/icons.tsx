import React from "react";

// Import all SVG assets.
import BigAddSVG from "../assets/icons/big-add.svg";
import CheckSVG from "../assets/icons/circle-check.svg";
import CopySVG from "../assets/icons/clipboard.svg";
import DeleteSVG from "../assets/icons/trash-can.svg";
import DocumentSVG from "../assets/icons/document.svg";
import DuplicateSVG from "../assets/icons/square-behind-square.svg";
import FlagSVG from "../assets/icons/flag.svg";
import InfoSVG from "../assets/icons/circle-info.svg";
import MoreSVG from "../assets/icons/vertical-dot-grid.svg";
import RenameSVG from "../assets/icons/pencil-line.svg";
import SmallAddSVG from "../assets/icons/small-add.svg";

// Define the base icon props type.
type IconProps = React.SVGProps<SVGSVGElement>;

// Define color constants for consistent theming.
const COLORS = {
  slateGray: "#8C93A1",
  steelGray: "#9DA4B2",
  pureBlack: "#000000",
  inkBlack: "#1A1A1A",
  cobaltBlue: "#2F72E2",
  coralRed: "#EF494F",
} as const;

// Create a factory function to generate consistent icons.
const createIcon = (SVGComponent: React.FC<IconProps>, color: string) => {
  // Define a new Icon component that forwards its ref and applies the given color.
  const Icon = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
    <SVGComponent ref={ref} style={{ color }} {...props} />
  ));

  // Assign a displayName for easier identification in React DevTools.
  Icon.displayName = `Icon(${SVGComponent.displayName || 'Anonymous'})`;

  return Icon;
};

// Export all icons with their default colors.
export const InfoIcon = createIcon(InfoSVG as React.FC<IconProps>, COLORS.slateGray);
export const DocumentIcon = createIcon(DocumentSVG as React.FC<IconProps>, COLORS.slateGray);
export const CheckIcon = createIcon(CheckSVG as React.FC<IconProps>, COLORS.slateGray);
export const SmallAddIcon = createIcon(SmallAddSVG as React.FC<IconProps>, COLORS.pureBlack);
export const BigAddIcon = createIcon(BigAddSVG as React.FC<IconProps>, COLORS.inkBlack);
export const MoreIcon = createIcon(MoreSVG as React.FC<IconProps>, COLORS.steelGray);
export const FlagIcon = createIcon(FlagSVG as React.FC<IconProps>, COLORS.cobaltBlue);
export const RenameIcon = createIcon(RenameSVG as React.FC<IconProps>, COLORS.steelGray);
export const CopyIcon = createIcon(CopySVG as React.FC<IconProps>, COLORS.steelGray);
export const DuplicateIcon = createIcon(DuplicateSVG as React.FC<IconProps>, COLORS.steelGray);
export const DeleteIcon = createIcon(DeleteSVG as React.FC<IconProps>, COLORS.coralRed);
