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

const createIcon = (SVGComponent: React.ComponentType<IconProps>, color: string) => {
  const Icon = (props: IconProps) => (
    <SVGComponent className={`text-[${color}]`} {...props} />
  );
  Icon.displayName = `Icon(${SVGComponent.displayName || SVGComponent.name || "Anonymous"})`;
  return Icon;
};

// Export all icons with their default colors.
export const InfoIcon = createIcon(InfoSVG, COLORS.slateGray);
export const DocumentIcon = createIcon(DocumentSVG, COLORS.slateGray);
export const CheckIcon = createIcon(CheckSVG, COLORS.slateGray);
export const SmallAddIcon = createIcon(SmallAddSVG, COLORS.pureBlack);
export const BigAddIcon = createIcon(BigAddSVG, COLORS.inkBlack);
export const MoreIcon = createIcon(MoreSVG, COLORS.steelGray);
export const FlagIcon = createIcon(FlagSVG, COLORS.cobaltBlue);
export const RenameIcon = createIcon(RenameSVG, COLORS.steelGray);
export const CopyIcon = createIcon(CopySVG, COLORS.steelGray);
export const DuplicateIcon = createIcon(DuplicateSVG, COLORS.steelGray);
export const DeleteIcon = createIcon(DeleteSVG, COLORS.coralRed);
