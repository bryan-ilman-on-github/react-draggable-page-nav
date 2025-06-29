import React from "react";

import BigAddSVG from '../assets/icons/big-add.svg';
import CheckSVG from '../assets/icons/circle-check.svg';
import CopySVG from '../assets/icons/clipboard.svg';
import DeleteSVG from '../assets/icons/trash-can.svg';
import DocumentSVG from '../assets/icons/document.svg';
import DuplicateSVG from '../assets/icons/square-behind-square.svg';
import FlagSVG from '../assets/icons/flag.svg';
import InfoSVG from '../assets/icons/circle-info.svg';
import MoreSVG from '../assets/icons/vertical-dot-grid.svg';
import RenameSVG from '../assets/icons/pencil-line.svg';
import SmallAddSVG from '../assets/icons/small-add.svg';

type IconProps = React.SVGProps<SVGSVGElement>;

export const InfoIcon = (props: IconProps) => (
  <InfoSVG className="text-[#8C93A1]" {...props} />
);

export const DocumentIcon = (props: IconProps) => (
  <DocumentSVG className="text-[#8C93A1]" {...props} />
);

export const CheckIcon = (props: IconProps) => (
  <CheckSVG className="text-[#8C93A1]" {...props} />
);

export const SmallAddIcon = (props: IconProps) => (
  <SmallAddSVG className="text-[#000000]" {...props} />
);

export const BigAddIcon = (props: IconProps) => (
  <BigAddSVG className="text-[#1A1A1A]" {...props} />
);

export const MoreIcon = (props: IconProps) => (
  <MoreSVG className="text-[#9DA4B2]" {...props} />
);

export const FlagIcon = (props: IconProps) => (
  <FlagSVG className="text-[#2F72E2]" {...props} />
);

export const RenameIcon = (props: IconProps) => (
  <RenameSVG className="text-[#9DA4B2]" {...props} />
);

export const CopyIcon = (props: IconProps) => (
  <CopySVG className="text-[#9DA4B2]" {...props} />
);

export const DuplicateIcon = (props: IconProps) => (
  <DuplicateSVG className="text-[#9DA4B2]" {...props} />
);

export const DeleteIcon = (props: IconProps) => (
  <DeleteSVG className="text-[#EF494F]" {...props} />
);
