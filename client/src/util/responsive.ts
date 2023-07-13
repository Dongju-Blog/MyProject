const deviceSizes = {
  mobile: 412,
  tablet: 768,
  desktop: 1920,
};

const mediaQuery = {
  mobile: `(max-width: ${deviceSizes.mobile}px)`,
  tablet: `(min-width: ${deviceSizes.mobile + 1}px) and (max-width: ${deviceSizes.tablet}px)`,
  desktop: `(min-width: ${deviceSizes.mobile + 1}px) and (max-width: ${deviceSizes.desktop}px)`,
};


export default mediaQuery;