import React from "react";
import {
  withStyles,
  Badge as BadgeBase,
  Typography as TypographyBase,
  Button as ButtonBase,
  useTheme,
  makeStyles,
} from "@material-ui/core";
import classnames from "classnames";

// styles
var useStyles = makeStyles((theme) => ({
  badge: {
    fontWeight: 600,
    height: 16,
    minWidth: 16,
  },
}));

const Badge: React.FC<any> = ({
  children,
  colorBrightness,
  color,
  ...props
}) => {
  var classes = useStyles();
  var theme = useTheme();
  var Styled = createStyled(
    {
      badge: {
        backgroundColor: getColor(color, theme, colorBrightness),
      },
    },
    null
  );

  return (
    <Styled>
      {(styledProps: any) => (
        <BadgeBase
          classes={{
            badge: classnames(classes.badge, styledProps.classes.badge),
          }}
          {...props}
        >
          {children}
        </BadgeBase>
      )}
    </Styled>
  );
};

const Typography: React.FC<any> = ({
  children,
  weight,
  size,
  colorBrightness,
  color,
  ...props
}) => {
  var theme = useTheme();

  return (
    <TypographyBase
      style={{
        color: getColor(color, theme, colorBrightness),
        fontWeight: getFontWeight(weight),
        fontSize: getFontSize(size, props.variant, theme),
      }}
      {...props}
    >
      {children}
    </TypographyBase>
  );
};

const Button: React.FC<any> = ({ children, color, className, ...props }) => {
  var theme = useTheme();

  var Styled = createStyled(
    {
      root: {
        color: getColor(color, theme),
      },
      contained: {
        backgroundColor: getColor(color, theme),
        boxShadow: (theme as any).customShadows.widget,
        color: `${color ? "white" : theme.palette.text.primary} !important`,
        "&:hover": {
          backgroundColor: getColor(color, theme, "light"),
          boxShadow: (theme as any).customShadows.widgetWide,
        },
        "&:active": {
          boxShadow: (theme as any).customShadows.widgetWide,
        },
      },
      outlined: {
        color: getColor(color, theme),
        borderColor: getColor(color, theme),
      },
      select: {
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
      },
    },
    null
  );

  return (
    <Styled>
      {({ classes }: any) => (
        <ButtonBase
          classes={{
            contained: classes.contained,
            root: classes.root,
            outlined: classes.outlined,
          }}
          {...props}
          className={classnames(
            {
              [classes.select]: props.select,
            },
            className
          )}
        >
          {children}
        </ButtonBase>
      )}
    </Styled>
  );
};

export { Badge, Typography, Button };

// ########################################################################

function getColor(color: any, theme: any, brigtness = "main") {
  if (color && theme.palette[color] && theme.palette[color][brigtness]) {
    return theme.palette[color][brigtness];
  }
}

function getFontWeight(style: any) {
  switch (style) {
    case "light":
      return 300;
    case "medium":
      return 500;
    case "bold":
      return 600;
    default:
      return 400;
  }
}

function getFontSize(size: any, variant = "", theme: any) {
  var multiplier;

  switch (size) {
    case "sm":
      multiplier = 0.8;
      break;
    case "md":
      multiplier = 1.5;
      break;
    case "xl":
      multiplier = 2;
      break;
    case "xxl":
      multiplier = 3;
      break;
    default:
      multiplier = 1;
      break;
  }

  var defaultSize =
    variant && theme.typography[variant]
      ? theme.typography[variant].fontSize
      : theme.typography.fontSize + "px";

  return `calc(${defaultSize} * ${multiplier})`;
}

function createStyled(styles: any, options: any) {
  const Styled = (props: any) => {
    const { children, ...other } = props;
    return children(other);
  };

  return withStyles(styles, options)(Styled);
}
