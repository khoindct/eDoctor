import React from "react";
import { Button, useTheme } from "@material-ui/core";
import {
  NotificationsNone as NotificationsIcon,
  ThumbUp as ThumbUpIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalOffer as TicketIcon,
  BusinessCenter as DeliveredIcon,
  SmsFailed as FeedbackIcon,
  DiscFull as DiscIcon,
  Email as MessageIcon,
  Report as ReportIcon,
  Error as DefenceIcon,
  AccountBox as CustomerIcon,
  Done as ShippedIcon,
  Publish as UploadIcon,
} from "@material-ui/icons";
import classnames from "classnames";
import tinycolor from "tinycolor2";

// styles
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers";

interface NotificationProp {
  variant?: any;
  type?: string;
  color?: any;
  className?: any;
  shadowless?: any;
  typographyVariant?: any;
  extraButton?: any;
  extraButtonClick?: any;
  message?: string;
}

const Notification: React.FC<NotificationProp> = ({ variant, ...props }) => {
  const classes = useStyles();
  const theme = useTheme();

  const typesIcons = {
    "e-commerce": <ShoppingCartIcon />,
    notification: <NotificationsIcon />,
    offer: <TicketIcon />,
    info: <ThumbUpIcon />,
    message: <MessageIcon />,
    feedback: <FeedbackIcon />,
    customer: <CustomerIcon />,
    shipped: <ShippedIcon />,
    delivered: <DeliveredIcon />,
    defence: <DefenceIcon />,
    report: <ReportIcon />,
    upload: <UploadIcon />,
    disc: <DiscIcon />,
  };

  const getIconByType = (type = "offer"): any => {
    return (typesIcons as any)[type];
  };

  const icon = getIconByType(props.type);

  const iconWithStyles = React.cloneElement(icon, {
    classes: {
      root: (classes as any).notificationIcon,
    },
    style: {
      color:
        variant !== "contained" &&
        (theme as any).palette[props.color] &&
        (theme as any).palette[props.color].main,
    },
  });

  return (
    <div
      className={classnames(classes.notificationContainer, props.className, {
        [classes.notificationContained]: variant === "contained",
        [classes.notificationContainedShadowless]: props.shadowless,
      })}
      style={{
        backgroundColor:
          variant === "contained" &&
          (theme as any).palette[props.color] &&
          (theme as any).palette[props.color].main,
      }}
    >
      <div
        className={classnames(classes.notificationIconContainer, {
          [classes.notificationIconContainerContained]: variant === "contained",
          [classes.notificationIconContainerRounded]: variant === "rounded",
        })}
        style={{
          backgroundColor:
            variant === "rounded" &&
            (theme as any).palette[props.color] &&
            tinycolor((theme as any).palette[props.color].main)
              .setAlpha(0.15)
              .toRgbString(),
        }}
      >
        {iconWithStyles}
      </div>
      <div className={classes.messageContainer}>
        <Typography
          className={classnames({
            [classes.containedTypography]: variant === "contained",
          })}
          variant={props.typographyVariant}
          size={variant !== "contained" && !props.typographyVariant && "md"}
        >
          {props.message}
        </Typography>
        {props.extraButton && props.extraButtonClick && (
          <Button
            onClick={props.extraButtonClick}
            disableRipple
            className={classes.extraButton}
          >
            {props.extraButton}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Notification;
